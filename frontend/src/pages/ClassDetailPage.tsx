import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getClassDetailThunk } from "../redux/class/thunks";
import { IRootState } from "../redux/store";
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

// Official Google Map Package
import { Wrapper } from "@googlemaps/react-wrapper";
import { Map } from "../components/SimpleGoogleMap";
import {
  fetchChangeClassBookmark,
  fetchIsClassBookmarked,
  fetchClassAlreadyBookedByUser,
  fetchToCancel,
  fetchToReserveSeat,
  fetchClassStatusAndUserType,
} from "../api/class";
import { BookingModal } from "../components/BookingModal";
import { Link } from "react-router-dom";
import OtherClassItems from "../components/OtherClassItem";
import CreateComment from "../components/CreateComment";
const { REACT_APP_GOOGLE_MAP_API_KEY } = process.env;

const notificationTimeToCancel = 48;
export default function ClassDetailPage() {
  const [isCreator, setIsCreator] = useState<Boolean>(false)
  const [isComment, setIsComment] = useState<Boolean>(false)
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
  const { instructorId } = useSelector(
    (state: IRootState) => state.classDetails
  );

  const closeModal = () => {
    setIsModalShown(false);

  };
  const changingIsModalShown = () => setIsModalShown(!isModalShown);


  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const classId = parseInt(id);

  const { otherClassItems } = useSelector(
    (state: IRootState) => state.classOtherClass
  );

  let history = useHistory();
  const goToLastPage = () => {
    history.goBack();
  };

  const {
    classImage,
    className,
    classDate,
    classStartTime,
    classEndTime,
    instructorName,
    totalCapacity,
    credit,
    availableSeat,
    venue,
    type,
    language,
    classNumber,
    introduction,
    venue_point
  } = useSelector((state: IRootState) => state.classDetails);

  useEffect(() => {
    dispatch(getClassDetailThunk(classId));
  }, [classId, dispatch]);

  useEffect(() => {
    let now = moment(new Date()); //todays date
    let end = moment(`${classDate}`); // another date
    let duration = moment.duration(end.diff(now));
    let hours = duration.asHours();

    if (hours > notificationTimeToCancel) {
      // setIsEnd(true);
      setIsAllowedToCancel(true);
    } else if (hours < 0) {
      // setIsEnd(false);
      // setLessonStatusMsg("This lesson has ended.");
    } else if (hours < notificationTimeToCancel) {
      // setIsEnd(true);
      setIsAllowedToCancel(false);
      // setLessonStatusMsg("This lesson is starting soon");
    }
  }, [classDate, classStartTime, classId]);

  useEffect(() => {
    const checkingBookmarked = async () => {
      try {
        const res = await fetchIsClassBookmarked(classId);
        const result = await res.json();
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
        const res = await fetchClassAlreadyBookedByUser(classId);
        const result = await res.json();
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
      const res = await fetchClassStatusAndUserType(classId)
      const result = await res.json()
      if (!result.success) {
        return
      }


      if (result.isCreator) {
        setIsCreator(true)
      } else {
        setIsJoiner(result.joinerData.isJoiner)
        setIsEnd(result.isEnd)
        setIsComment(result.joinerData.haveComment)
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
      const res = await fetchChangeClassBookmark(classId, isBookmarked);
      const result = await res.json();
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
    const res = await fetchToReserveSeat(classId);
    const result = await res.json();
    setIsConfirmationSuccess(result["success"]);
    setServerMessageWhenConfirming(result["msg"]);
    if (result.success) {
      dispatch(getClassDetailThunk(classId));
      setIsJoiner(value => !value)

    }

  };

  const confirmingYourCancel = async () => {
    try {
      const res = await fetchToCancel(classId);
      const result = await res.json();
      setIsConfirmationSuccess(result["success"]);
      setServerMessageWhenConfirming(result["msg"]);
      if (result.success) {
        dispatch(getClassDetailThunk(classId));
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
  return (
    <div className="parent">

      {isModalShown && (
        <BookingModal
          closeModal={closeModal}
          confirmToBook={confirmingYourReservation}
          confirmationSuccess={isConfirmationSuccess}
          serverMessageWhenConfirming={serverMessageWhenConfirming}
          confirmToCancel={confirmingYourCancel}
          isToCancel={isJoiner}
        />
      )}


      <div className={` container ${styles.infoBox}`}>
        <div className="row">
          <div className="col-lg-1"></div>
          {venue === "Loading" ? (
            "Loading"
          ) : (
            <img
              className={`col-lg-6 ${styles.classPic}`}
              src={`${process.env.REACT_APP_UPLOAD_IMAGE}/${classImage}`}
              alt={classImage}
            />
          )}
          <div className="col-lg-1"></div>
          <div className={`col-lg-4 ${styles.infoOuterBox}`}>
            {/* px-5 */}
            <div className={styles.infoContainer}>
              {/* d-flex align-items-center justify-content-between */}
              <h3 className={styles.nameTopMarginInMd}>
                {`${classNumber}-${className}`}{" "}
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
              {classDate !== "Loading" &&
                moment(`${classDate}`).format("ddd, Do MMM YYYY") +
                ", " +
                classStartTime}
              -{" "}
              {classEndTime !== "Loading" &&
                moment(`${classDate},${classEndTime}`).format("h:mm a") !==
                "Invalid date"
                ? moment(`${classDate},${classEndTime}`).format("h:mm a")
                : classEndTime}
            </h5>
            <br />

            <h5 className={`text-secondary ${styles.linkText}`}>
              Instructor:{" "}
              <Link className={styles.linkText} to={`/teacher/${instructorId}`}>
                {instructorName.charAt(0).toUpperCase() +
                  instructorName.slice(1)}
              </Link>
            </h5>

            <div className="text-muted">Introduction: {introduction}</div>
            <div className="text-muted">Type:{type}</div>
            <div className="text-muted">Language:{language}</div>
            <div className="text-muted">
              Available Seats:{" "}
              {availableSeat === "Loading"
                ? "Loading"
                : availableSeat + "/" + totalCapacity}
            </div>
            <div className="text-muted">Credit cost: {credit}</div>

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
          {isEnd && !isComment && isJoiner && <div><CreateComment classId={classId} /></div>}
          {isEnd && isComment && isJoiner && <div>your comment:</div>}
          {type === "offline" && !isEnd && (
            <>
              <h5 className={styles.otherTitle}>Venue: {venue}</h5>
              <div className={styles.headerElem}>
                {venue_point.x !== "Loading" && <Wrapper apiKey={REACT_APP_GOOGLE_MAP_API_KEY!}>
                  <Map venue_point={venue_point} />
                </Wrapper>}

              </div>
            </>
          )}

          <div className="">
            {otherClassItems.length > 0 && (
              <div className={styles.otherTitle}>
                You may also try these from this instructor
              </div>
            )}
            <OtherClassItems teacherId={instructorId} excludeClassId={+id} />
          </div>
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
        {/* <Button onClick={rolling}>roll up</Button> */}
        <FiArrowUpCircle onClick={rolling} />
      </span>
    </div>
  );
}
