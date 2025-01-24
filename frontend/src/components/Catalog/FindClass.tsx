import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { fetchAllClasses, fetchYogaType } from "../../api/catalogSearch";

// import { useDispatch } from 'react-redux';
import styles from "../../css/CatalogOfClasses.module.css";
import { Class } from "./Class";

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
export interface ClassesRes {
  id: number;
  image: string;
  venue: string;
  name: string;
  capacity: number;
  credit: number;
  date: string;
  start_time: string;
  end_time: string;
  instructor: string;
  language: string;
  type: string;
  class_number: string;
  yoga_type: string;
}

interface YogaType {
  id: number;
  name: string;
}
export function FindClass() {
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
    ClassesRes[]
  >([]);

  const [yogaType, setYogaType] = useState<YogaType[] | []>([]);

  async function getClasses() {
    const response = await fetchAllClasses();
    const allClassesResult = await response.json();
    setAllClassFetchResults(allClassesResult.data);
  }
  async function getYogaType() {
    const response = await fetchYogaType();
    const yogaTypeData = await response.json();
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
    const response = await fetchAllClasses(
      data.dateOfClass,
      data.timeFrom,
      data.instructor,
      data.classVenue,
      data.classTitle,
      data.type,
      data.yogaType,
      data.credit,
      data.language
    );
    const allClassesResult = await response.json();

    setAllClassFetchResults(allClassesResult.data);
  }

  return (
    <>
      <div className="container">
        <Form onSubmit={handleSubmit(submit)}>
          <h1 className={styles.bigTitle}>Find Classes</h1>
          <div
            className="d-flex justify-content-between flex-wrap"
            id={styles.formFormat}
          >
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                placeholder="Date picker"
                type="date"
                {...register("dateOfClass")}
              />
            </Form.Group>
            <Form.Group className={styles.catForm}>
              <Form.Label>Time From</Form.Label>
              <Form.Control
                placeholder="Classes start at"
                type="time"
                {...register("timeFrom")}
                className="d-inline"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Instructor</Form.Label>
              <Form.Control
                placeholder="Input keyword"
                type="text"
                {...register("instructor")}
                className="d-inline"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Venue</Form.Label>
              <Form.Control
                placeholder="Input keyword"
                type="text"
                {...register("classVenue")}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                placeholder="Title"
                type="text"
                {...register("classTitle")}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Class Mode</Form.Label>
              <Form.Control as="select" size="lg" {...register("type")}>
                <option value="all">All</option>
                <option value="offline">Offline</option>
                <option value="online">Online</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Language</Form.Label>
              <Form.Control as="select" size="lg" {...register("language")}>
                <option value="all">All</option>
                <option value="English">English</option>
                <option value="Cantonese">Cantonese</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Credit Less Than</Form.Label>
              <Form.Control type="number" {...register("credit")} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Yoga Type</Form.Label>
              <Form.Control as="select" size="lg" {...register("yogaType")}>
                <option value="all" selected>
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
          </div>
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
          {allClassFetchResults.length > 0 &&
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
            ))}
        </div>
      </div>
    </>
  );
}
