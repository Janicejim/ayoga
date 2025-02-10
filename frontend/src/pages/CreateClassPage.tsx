import { useForm } from "react-hook-form";
import { Container, Form, Row } from "react-bootstrap";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { ErrorMessage } from "@hookform/error-message";
import loginStyles from "../css/Login.module.css";
import { useEffect, useState } from "react";
import { fetchYogaType } from "../api/class";
import { fetchCreateClass } from "../api/class";
import { useHistory } from "react-router-dom";

interface FormState {
  classTitle: string;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  credit: number;
  image: string;
  language: string;
  type: string;
  introduction: string;
  venue: string;
  venue_point: string;
  yoga_type: string;
}
export default function CreateClassPage() {
  const [yogaTypes, setYogaTypes] = useState<any[]>([]);
  const [isOffline, setIsOffline] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm<FormState>({
    defaultValues: {},
  });

  const [venue, setVenue] = useState("");
  const [coordinates_lat, setCoordinates_lat] = useState(0);
  const [coordinates_lng, setCoordinates_lng] = useState(0);
  const [backendMsg, setBackendMsg] = useState<string>("");

  const history = useHistory();
  useEffect(() => {
    watch((data) => {

      if (data.type === "online") {
        setIsOffline(false);
      } else if (data.type === "offline") {
        setIsOffline(true);
      }
    });
  }, [watch, getValues]);


  const onSubmit = async (data: FormState) => {

    const file = data.image[0];

    let res = await fetchCreateClass(
      data.classTitle,
      data.date,
      data.startTime,
      data.endTime,
      data.capacity,
      data.credit,
      file,
      data.language,
      data.yoga_type,
      data.type,
      venue,
      coordinates_lat,
      coordinates_lng,
      data.introduction
    );
    let result = await res.json();
    if (result.success) {
      history.push("/userInfo");
    } else {
      setBackendMsg(result.msg);
    }
  };

  // console.log(coordinates);

  const handleChange = (address: any) => {
    setVenue(address);
  };

  const handleSelect = async (address: any) => {
    setVenue(address);
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    setCoordinates_lat(latLng.lat);
    setCoordinates_lng(latLng.lng);
  };

  //date
  let disableDates = () => {
    let today, dd, mm, yyyy;
    today = new Date();
    dd = today.getDate();
    mm = today.getMonth() + 1;
    yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };
  // console.log("min_date", disableDates());

  async function getYogaType() {
    let res = await fetchYogaType();
    let result = await res.json();
    setYogaTypes(result.data);
  }
  useEffect(() => {
    getYogaType();
  }, []);

  return (
    <div>
      <div className={loginStyles.registerTitle}>Create a class</div>
      <div className={`col-md-6 ${loginStyles.inputContainer}`}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <Row>
              <Form.Group className={`col-md-6 ${loginStyles.spaceBetween}`}>
                <Form.Label>Class Title</Form.Label>
                <Form.Control
                  size="lg"
                  type="text"
                  {...register("classTitle", {
                    required: "This is required",
                    maxLength: {
                      value: 60,
                      message: "This input exceed max length.",
                    },
                    minLength: {
                      value: 3,
                      message: "Class name must have at least 3 characters.",
                    },
                  })}
                />
                <div className={loginStyles.error}>
                  <ErrorMessage errors={errors} name="classTitle" />
                </div>
              </Form.Group>
              <Form.Group className={`col-md-6 ${loginStyles.spaceBetween}`}>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  size="lg"
                  type="date"
                  placeholder="Date"
                  {...register("date", {
                    required: "This is required",
                    min: disableDates(),
                  })}
                />
                <div className={loginStyles.error}>
                  <ErrorMessage errors={errors} name="date" />
                </div>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group className={`col-md-6 ${loginStyles.spaceBetween}`}>
                <Form.Label>Start time</Form.Label>
                <Form.Control
                  size="lg"
                  type="time"
                  {...register("startTime", { required: "This is required" })}
                />
                <div className={loginStyles.error}>
                  <ErrorMessage errors={errors} name="startTime" />
                </div>
              </Form.Group>
              <Form.Group className={`col-md-6 ${loginStyles.spaceBetween}`}>
                <Form.Label>End time</Form.Label>
                <Form.Control
                  size="lg"
                  type="time"
                  {...register("endTime", { required: "This is required" })}
                />
                <div className={loginStyles.error}>
                  <ErrorMessage errors={errors} name="endTime" />
                </div>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group className={`col-md-6 ${loginStyles.spaceBetween}`}>
                <Form.Label>Class Capacity</Form.Label>
                <Form.Control
                  size="lg"
                  type="number"
                  placeholder="Input 1 ~ 20"
                  {...register("capacity", {
                    required: "This is required",
                    max: {
                      value: 20,
                      message: "Please enter between 1 - 20",
                    },
                    min: {
                      value: 1,
                      message: "Please enter between 1 - 20",
                    },
                  })}
                />
                <div className={loginStyles.error}>
                  {" "}
                  <ErrorMessage errors={errors} name="capacity" />
                </div>
              </Form.Group>
              <div className={`col-md-6 ${loginStyles.spaceBetween}`}>
                <Form.Label>Credit(s) required</Form.Label>
                <Form.Control
                  size="lg"
                  type="number"
                  {...register("credit", {
                    required: "This is required",
                  })}
                />
                <div className={loginStyles.error}>
                  {" "}
                  <ErrorMessage errors={errors} name="credit" />
                </div>
              </div>
            </Row>
            <Row>
              <Form.Group className={`col-md-6 ${loginStyles.spaceBetween}`}>
                <Form.Label>Upload class image</Form.Label>
                <Form.Control
                  size="lg"
                  type="file"
                  {...register("image", { required: "This is required" })}
                />
                <div className={loginStyles.error}>
                  {" "}
                  <ErrorMessage errors={errors} name="image" />
                </div>
              </Form.Group>

              <Form.Group className={`col-md-6 ${loginStyles.spaceBetween}`}>
                <Form.Label>Class language</Form.Label>
                <Form.Control
                  as="select"
                  size="lg"
                  {...register("language", { required: "This is required" })}
                >
                  <option value="English">English</option>
                  <option value="Cantonese">Cantonese</option>
                </Form.Control>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className={`col-md-6 ${loginStyles.spaceBetween}`}>
                <Form.Label>Yoga Type</Form.Label>
                <Form.Control
                  as="select"
                  size="lg"
                  {...register("yoga_type", { required: "This is required" })}
                >
                  {yogaTypes.length > 0 &&
                    yogaTypes.map((type) => (
                      <option value={type.id}>{type.name}</option>
                    ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className={`col-md-6 ${loginStyles.spaceBetween}`}>
                <Form.Label>Class Type</Form.Label>
                <Form.Control
                  as="select"
                  size="lg"
                  {...register("type", { required: "This is required" })}
                >
                  <option value="offline">Offline</option>
                  <option value="online">Online</option>
                </Form.Control>
              </Form.Group>
            </Row>
            {isOffline && (
              <Row>
                <Form.Group className={`col-md-12 ${loginStyles.spaceBetween}`}>
                  <Form.Label>Venue</Form.Label>

                  <PlacesAutocomplete
                    value={venue}
                    onSelect={handleSelect}
                    onChange={handleChange}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading,
                    }) => (
                      <div>
                        <input
                          className="form-control form-control-lg"
                          {...getInputProps({
                            placeholder: "Search places...",
                          })}
                        />
                        <div>
                          {loading ? <div>...loading</div> : null}

                          {suggestions.map((suggestion, index) => {
                            const style = {
                              backgroundColor: suggestion.active
                                ? "#41b6e6"
                                : "#fff",
                            };

                            return (
                              <div key={index}>
                                <div
                                  {...getSuggestionItemProps(suggestion, {
                                    style,
                                  })}
                                >
                                  {suggestion.description}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>
                  <div className={loginStyles.error}>
                    {" "}
                    <ErrorMessage errors={errors} name="venue" />
                  </div>
                </Form.Group>
              </Row>
            )}
            <Row>
              <Form.Group className={`col-md-12 ${loginStyles.spaceBetween}`}>
                <Form.Label>introduction of class</Form.Label>
                <br></br>
                <textarea
                  style={{ width: "100%", height: "20rem" }}
                  {...register("introduction", {
                    required: "This is required",
                    minLength: {
                      value: 3,
                      message:
                        "Class introduction must have at least 3 characters.",
                    },
                  })}
                ></textarea>
                <div className={loginStyles.error}>
                  <ErrorMessage errors={errors} name="introduction" />
                </div>
              </Form.Group>
            </Row>

            <br />
            <div style={{ textAlign: "center" }}>
              <br />
              <div className={loginStyles.error}>P.S. In order to communicate with your students regarding the class schedule, please create a WhatsApp group or send an email by yourself two days before the class starts.If other students complain that they do not know the schedule due to they do not inside the group, we will refund the price </div>
              <br />
              <button
                // onClick={onClick}
                type="submit"
                className={`btn ${loginStyles.btnRegister}`}
              >
                Submit
              </button>
            </div>
          </Container>
        </Form>
        <div>{backendMsg}</div>
      </div>
    </div>
  );
}
