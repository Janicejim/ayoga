import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import styles from "../css/findClasses.module.css";
import Class from "../components/Class";
import { getData, getDataNotLogin } from "../api/api";
import { ClassItem } from "../utils/models";

type FormState = {
  dateOfClass: string;
  timeFrom: string;
  instructor: string;
  classVenue: string;
  classTitle: string;
  type: string;
  yogaType: string;
  language: string;
  credit: number;
};


interface YogaType {
  id: number;
  name: string;
}
export default function FindClassPage() {
  const { register, handleSubmit, watch, reset } = useForm<FormState>({
    defaultValues: {
      dateOfClass: "",
      timeFrom: "",
      instructor: "",
      classVenue: "",
      classTitle: "",
      type: "all",
      yogaType: "all",
      language: "all",
      credit: 0,
    },
  });

  const [allClassFetchResults, setAllClassFetchResults] = useState<
    ClassItem[]
  >([]);

  const [yogaType, setYogaType] = useState<YogaType[] | []>([]);

  async function getClasses() {
    const allClassesResult = await getData(`api/class`)
    setAllClassFetchResults(allClassesResult.data);
  }
  async function getYogaType() {
    const yogaTypeData = await getDataNotLogin(`api/class/yoga/type`);
    setYogaType(yogaTypeData.data);
  }

  useEffect(() => {
    getClasses();
    getYogaType();
  }, []);

  useEffect(() => {
    let sub = watch((data) => {
      // console.log("update form data:", data);
    });
    return () => sub.unsubscribe();
  }, [watch]);

  async function clear() {
    reset({ dateOfClass: "", timeFrom: "", instructor: "", classVenue: "" });
    getClasses();
  }

  async function submit(data: FormState) {
    const allClassesResult = await getData(`api/class?date=${data.dateOfClass}&start_time=${data.timeFrom}&instructor=${data.instructor}&venue=${data.classVenue}&title=${data.classTitle}&type=${data.type}&yogaType=${data.yogaType}&credit=${data.credit}&language=${data.language}`)

    setAllClassFetchResults(allClassesResult.data);
  }

  return (
    <>
      <div className="container">
        <Form onSubmit={handleSubmit(submit)}>
          <h1 className={styles.bigTitle}>Find Classes</h1>

          <Row>
            <Form.Group className="col-md-4">
              <Form.Label>Date</Form.Label>
              <Form.Control
                placeholder="Date picker"
                type="date"
                {...register("dateOfClass")}
              />
            </Form.Group>
            <Form.Group className={`${styles.catForm} col-md-4 `}>
              <Form.Label>Time From</Form.Label>
              <Form.Control
                placeholder="Classes start at"
                type="time"
                {...register("timeFrom")}
                className="d-inline"
              />
            </Form.Group>
            <Form.Group className="col-md-4">
              <Form.Label>Instructor</Form.Label>
              <Form.Control
                placeholder="Input keyword"
                type="text"
                {...register("instructor")}
                className="d-inline"
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="col-md-6">
              <Form.Label>Venue</Form.Label>
              <Form.Control
                placeholder="Input keyword"
                type="text"
                {...register("classVenue")}
              />

            </Form.Group>


            <Form.Group className="col-md-6">
              <Form.Label>Title</Form.Label>
              <Form.Control
                placeholder="Title"
                type="text"
                {...register("classTitle")}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="col-md-3">
              <Form.Label>Class Mode</Form.Label>
              <Form.Control as="select" size="lg" {...register("type")}>
                <option value="all">All</option>
                <option value="offline">Offline</option>
                <option value="online">Online</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="col-md-3">
              <Form.Label>Language</Form.Label>
              <Form.Control as="select" size="lg" {...register("language")}>
                <option value="all">All</option>
                <option value="English">English</option>
                <option value="Cantonese">Cantonese</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="col-md-3">
              <Form.Label>Credit Less Than</Form.Label>
              <Form.Control type="number" {...register("credit")} />
            </Form.Group>
            <Form.Group className="col-md-3">
              <Form.Label>Yoga Type</Form.Label>
              <Form.Control as="select" size="lg" {...register("yogaType")}>
                <option value="all">
                  All
                </option>
                {yogaType.length > 0 &&
                  yogaType.map((type) => (
                    <option key={type.id} value={type.name}>
                      {type.name}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
          </Row>

          <div className={styles.catBtn}>
            <Button
              variant="primary"
              type="submit"
              className={styles.catalogButton}
            >
              Search
            </Button>
            <Button
              variant="primary"
              type="reset"
              onClick={() => {
                clear();
              }}
              className={styles.catalogButton}
            >
              Clear
            </Button>
          </div>
          <br />
          <hr />
        </Form>
      </div>
      <div className="container">
        <br />
        <br />

        <div className="d-flex flex-wrap">
          {allClassFetchResults.length > 0 ?
            allClassFetchResults.map((eachClass) => (
              <motion.div
                key={eachClass.id}
                layout
                className="col-md-4 position-relative"
              >
                <AnimatePresence>
                  <Class
                    {...eachClass}
                    key={eachClass.id}
                  />
                </AnimatePresence>
              </motion.div>
            )) : <div>No result</div>}
        </div>
      </div>
    </>
  );
}
