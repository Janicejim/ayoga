import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "../css/classDetails.module.css";
import { Button } from "react-bootstrap";
import {
  IoChevronBackSharp,
  IoCalendarClearOutline,
} from "react-icons/io5";
import { BsBookmark, BsBookmarkHeartFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import moment from "moment";
import { useHistory } from "react-router";
import { FiArrowUpCircle } from "react-icons/fi";
import { REACT_APP_UPLOAD_IMAGE } from "../utils/config";
import { Wrapper } from "@googlemaps/react-wrapper";
import { Map } from "../components/Map";
import { BookingModal } from "../components/BookingModal";
import { Link } from "react-router-dom";
import OtherClassItems from "../components/OtherClassItem";
import CreateComment from "../components/CreateComment";
import { getData, getDataNotLogin, postPatchOrDeleteWithQueryOnly } from "../api/api";
import { Rating } from "primereact/rating";
import commentStyle from "../css/comment.module.css"
import useGoogleMaps from "../hooks/useGoogleMaps";
import { ApiResponse } from "../utils/models";
const { REACT_APP_GOOGLE_MAP_API_KEY } = process.env;

const notificationTimeToCancel = 48;
export default function ClassDetailPage() {
  const [isCreator, setIsCreator] = useState<Boolean>(false)
  const [isComment, setIsComment] = useState<Boolean>(false)
  const [comment, setComment] = useState<string>("")
  const [star, setStar] = useState<number>(0)
  const [createdAt, setCreatedAt] = useState<string>("")
  const [isEnd, setIsEnd] = useState<Boolean>(true);
  const [lessonStatusMsg, setLessonStatusMsg] = useState<String>("");
  const [isBookmarked, setIsBookmarked] = useState<Boolean>(false);
  const [isJoiner, setIsJoiner] = useState<Boolean>(false);
  const [isAllowedToCancel, setIsAllowedToCancel] = useState<Boolean>(true);
  const [isModalShown, setIsModalShown] = useState<Boolean>(false);
  const [isConfirmationSuccess, setIsConfirmationSuccess] =
    useState<Boolean>(false);
  const [serverMessageWhenConfirming, setServerMessageWhenConfirming] =
    useState<String>("");
  const [data, setData] = useState<any[]>([])


  const closeModal = () => {
    setIsModalShown(false);

  };
  const changingIsModalShown = () => setIsModalShown(!isModalShown);


  // const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const classId = parseInt(id);

  let history = useHistory();
  const goToLastPage = () => {
    history.goBack();
  };



  async function getClassDetail(classId: number) {
    let result = await getDataNotLogin(`api/class/details/${classId}`)
    if (result.success) {
      setData(result.details)
    }
  }
  useEffect(() => {
    getClassDetail(classId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classId]);


  useEffect(() => {
    if (data.length > 0) {
      let now = moment(new Date());
      let end = moment(`${data[0].date}`);
      let duration = moment.duration(end.diff(now));
      let hours = duration.asHours();

      if (hours > notificationTimeToCancel) {

        setIsAllowedToCancel(true);
      } else if (hours < 0) {

      } else if (hours < notificationTimeToCancel) {
        setIsAllowedToCancel(false);
      }
    }

  }, [classId, data]);

  useEffect(() => {
    const checkingBookmarked = async () => {
      try {
        const result = await getData(`api/class/bookmark/${classId}`);
        setIsBookmarked(result.bookmarked);
      } catch (error) {
        console.log(error);
      }
    };
    checkingBookmarked();

  }, [classId]);

  useEffect(() => {

    const checkingClassBooked = async () => {
      try {
        const result = await getData(`api/class/booking/${classId}`);

        setIsJoiner(result.booked);
      } catch (error) {
        console.log(error);
      }
    };
    if (classId) {

      checkingClassBooked();
    }
  }, [classId]);


  useEffect(() => {
    checkClassStatusAndUserType()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const checkClassStatusAndUserType = async () => {
    try {
      const result = await getData(`api/class/status/${classId}`)
      if (!result.success) {
        return
      }


      if (result.isCreator) {
        setIsCreator(true)
      } else {
        setIsJoiner(result.joinerData.isJoiner)
        setIsEnd(result.isEnd)
        setIsComment(result.joinerData.haveComment)
        setStar(+result.joinerData.star)
        setComment(result.joinerData.comment)
        setCreatedAt(moment(`${result.joinerData.created_at}`).format("ddd, Do MMM YYYY"))
      }

      if (result.isEnd) {
        setLessonStatusMsg("This lesson has ended.");
      } else {
        setLessonStatusMsg("This lesson is starting soon");
      }

    } catch (error) {
      console.log(error);
    }
  }



  const changingBookmarkStatus = async () => {
    try {
      let result: ApiResponse
      if (isBookmarked) {
        result = await postPatchOrDeleteWithQueryOnly("DELETE", `api/class/bookmark/${classId}`)
      } else {
        result = await postPatchOrDeleteWithQueryOnly("POST", `api/class/bookmark/${classId}`)
      }

      if (result.type === "add" && result.success === true) {
        setIsBookmarked(true);
      } else if (result.type === "delete" && result.success === true) {
        setIsBookmarked(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const confirmingYourReservation = async () => {
    const result = await postPatchOrDeleteWithQueryOnly("POST", `api/class/reserve/${classId}`);
    setIsConfirmationSuccess(result["success"]);
    setServerMessageWhenConfirming(result["msg"]);
    if (result.success) {
      getClassDetail(classId)
      setIsJoiner(value => !value)

    }

  };

  const confirmingYourCancel = async () => {
    try {
      const result = await postPatchOrDeleteWithQueryOnly("PUT", `api/class/booking/${classId}`)
      setIsConfirmationSuccess(result["success"]);
      setServerMessageWhenConfirming(result["msg"]);
      if (result.success) {
        getClassDetail(classId)
        setIsJoiner(value => !value)

      }

    } catch (error) {
      console.log(error);
    }
  };

  const rolling = () => {
    window.scrollTo(0, 0);
  };
  rolling();


  const { loaded, error } = useGoogleMaps();
  if (!loaded || error) {
    return <div>{error ? 'Error loading google api' : 'Loading Google api...'}</div>;
  }



  return (
    <div>
      {data.length > 0 && (
        <div className="parent">
          {isModalShown && (
            <BookingModal
              closeModal={closeModal}
              confirmToBook={confirmingYourReservation}
              confirmationSuccess={isConfirmationSuccess}
              serverMessageWhenConfirming={serverMessageWhenConfirming}
              confirmToCancel={confirmingYourCancel}
              isToCancel={isJoiner}
              data={data[0]}
            />
          )}


          <div className={` container ${styles.infoBox}`}>
            <div className="row">
              <div className="col-lg-1"></div>
              {data[0].venue === "Loading" ? (
                "Loading"
              ) : (
                <img
                  className={`col-lg-6 ${styles.classPic}`}
                  src={`${REACT_APP_UPLOAD_IMAGE}/${data[0].image}`}
                  alt={data[0].image}
                />
              )}
              <div className="col-lg-1"></div>
              <div className={`col-lg-4 ${styles.infoOuterBox}`}>
                <div className={styles.infoContainer}>

                  <h3 className={styles.nameTopMarginInMd}>
                    {`${data[0].class_number}-${data[0].name}`}{" "}
                  </h3>
                  <h5>
                    {isBookmarked ? (
                      <BsBookmarkHeartFill
                        onClick={() => {
                          changingBookmarkStatus();
                        }}
                        className={styles.BsBookmarkBtn}
                      />
                    ) : (
                      <BsBookmark
                        onClick={() => {
                          changingBookmarkStatus();
                        }}
                        className={styles.BsBookmarkBtn}
                      />
                    )}
                  </h5>
                </div>
                <br />
                <h5 className={styles.dataText}>
                  {data[0].date !== "Loading" &&
                    moment(`${data[0].date}`).format("ddd, Do MMM YYYY") +
                    ", " +
                    data[0].start_time}
                  -{" "}
                  {data[0].end_time !== "Loading" &&
                    moment(`${data[0].date},${data[0].end_time}`).format("h:mm a") !==
                    "Invalid date"
                    ? moment(`${data[0].date},${data[0].end_time}`).format("h:mm a")
                    : data[0].end_time}
                </h5>
                <br />

                <h5 className={`text-secondary ${styles.linkText}`}>
                  Instructor:{" "}
                  <Link className={styles.linkText} to={`/teacher/${data[0].teacher_id}`}>
                    {data[0].teacher_name.charAt(0).toUpperCase() +
                      data[0].teacher_name.slice(1)}
                  </Link>
                </h5>

                <div className="text-muted">Introduction: {data[0].introduction}</div>
                <div className="text-muted">Type:{data[0].type}</div>
                <div className="text-muted">Language:{data[0].language}</div>
                <div className="text-muted">
                  Available Seats:{" "}
                  {data[0].available === "Loading"
                    ? "Loading"
                    : data[0].available + "/" + data[0].capacity}
                </div>
                <div className="text-muted">Credit cost: {data[0].credit}</div>

                <div className="text-center">
                  {isCreator ?
                    <Link to={`/class/student/${classId}`}>
                      <Button
                        className={styles.keyButton}
                      >
                        <IoCalendarClearOutline />
                        Student List
                      </Button> </Link> : isJoiner ?

                      <div>
                        {!isEnd && <div style={{ color: "red" }}>Teacher will connect you 2 days before class start by add you to Whatsapp group or by email, if not please contact our admin or check your mobile phone is correct or not!</div>}
                        {!isEnd && !isAllowedToCancel && (
                          <Button className={styles.cancelButton}>{lessonStatusMsg}</Button>
                        )}
                        {!isEnd && isAllowedToCancel && (
                          <Button
                            onClick={changingIsModalShown}
                            className={styles.cancelButton}
                          >
                            <ImCross />
                            Cancel Your Booking
                          </Button>
                        )}


                      </div> :



                      <div>
                        {isEnd ? <Button className={styles.cancelButton}>{lessonStatusMsg}</Button> : (
                          <Button
                            onClick={changingIsModalShown}
                            className={styles.keyButton}
                          >
                            <IoCalendarClearOutline />
                            BOOK NOW
                          </Button>
                        )}





                      </div>


                  }


                </div>
              </div>

            </div>
          </div>
          <div className="container">
            <div className="row">
              {isEnd && !isComment && isJoiner && <div><CreateComment onReload={checkClassStatusAndUserType
              } classId={classId} /></div>}
              {isEnd && isComment && isJoiner &&
                <div><h3 className={commentStyle.sectionTitle}>Your Rating:</h3>
                  <div className={commentStyle.feedbackContainer}>
                    <Rating unstyled={true} className={commentStyle.star} value={star} />
                    <div style={{ fontSize: "1.3rem", marginLeft: "1.5rem" }}>{comment}</div>
                    <div style={{ fontSize: "1rem", marginLeft: "1.2rem", marginRight: "1rem", color: "gray", textAlign: "right" }}>{createdAt}</div>
                  </div>
                </div>
              }
              {data[0].type === "offline" && !isEnd && (
                <>
                  <h5 className={styles.otherTitle}>Venue: {data[0].venue}</h5>
                  <div className={styles.headerElem}>
                    {data[0].venue_point.x !== "Loading" && <Wrapper apiKey={REACT_APP_GOOGLE_MAP_API_KEY!}>
                      <Map venue_point={data[0].venue_point} />
                    </Wrapper>}

                  </div>
                </>
              )}

              <h4>You may also interest:</h4>
              <OtherClassItems teacherId={data[0].teacher_id} excludeClassId={+id} />

              <hr />
              <div
                onClick={goToLastPage}
                className="text-muted d-flex align-items-center "
                id={styles.backButton}
              >
                <IoChevronBackSharp />
                Explore More Classes
              </div>
            </div>
          </div>
          <span className={styles.rollingUpBtnContainer}>
            <FiArrowUpCircle onClick={rolling} />
          </span>

        </div>
      )}

    </div>
  );
}
