import moment from "moment";
import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import styles from "../../css/classDetails.module.css";
import { ImCancelCircle } from "react-icons/im";
import { useState } from "react";

interface Props {
  closeModal: () => void;
  confirmToBook: () => void;
  confirmToCancel: () => void;
  confirmationSuccess: Boolean;
  serverMessageWhenConfirming: String;
  isToCancel: Boolean;
}

export function BookingModal(props: Props) {
  const {

    classImage,
    className,
    classDate,
    classStartTime,
    instructorName,
    totalCapacity,
    credit,
    availableSeat,
    venue,
  } = useSelector((state: IRootState) => state.classDetails);

  const [confirmDone, setConfirmDone] = useState<Boolean>(false);

  const confirmActions = () => {
    // console.log("confirmActions called");
    props.confirmToBook();
    setConfirmDone(!confirmDone);
  };

  const confirmActionToCancel = () => {
    props.confirmToCancel();
    setConfirmDone(!confirmDone);
  };

  return (
    <Modal show={true}>
      {!confirmDone && (
        <div className={styles.modalContainer}>
          <div>
            <ImCancelCircle
              onClick={props.closeModal}
              className={styles.modalCloseBtn}
            />
          </div>
          <div className="d-flex justify-content-center flex-wrap pt-3">
            <div className={styles.classInfoPic}>
              <div className="classImage">
                {venue === "Loading" ? (
                  "Loading"
                ) : (
                  <img
                    src={`${process.env.REACT_APP_API_SERVER}/${classImage}`}
                    width="250"
                    alt={classImage}
                  />
                )}
              </div>
            </div>
            {props.isToCancel ? (
              <div className="mt-3">
                Are you going to cancel your following lesson?
              </div>
            ) : (
              <div className="mt-3">
                Please confirm the details of your desired lesson:
              </div>
            )}

            <div className="">
              <hr />
              <h3 className={styles.modalNameTopMargin}>{className}</h3>
              <h4 className={styles.dataText}>
                {classDate !== "Loading" &&
                  moment(`${classDate}`).format("ddd, Do MMM YYYY") +
                  ", " +
                  classStartTime}
                start_time
              </h4>
              <h4 className="">
                Instructor:{" "}
                {instructorName.charAt(0).toUpperCase() +
                  instructorName.slice(1)}
              </h4>
              {props.isToCancel ? (
                <h5>Credit to be refunded: {credit}</h5>
              ) : (
                <h4>Credit: {credit}</h4>
              )}
              <div className="text-muted">
                Available Seats:{" "}
                {availableSeat === "Loading"
                  ? "Loading"
                  : availableSeat + "/" + totalCapacity}
              </div>
              <hr />
            </div>
          </div>

          {props.isToCancel ? (
            <Button
              onClick={confirmActionToCancel}
              className={styles.modalCancelButton}
            >
              Confirm to cancel
            </Button>
          ) : (
            <>
              <Button
                onClick={confirmActions}
                className={styles.modalConfirmBtn}
              >
                Confirmed
              </Button>
              <div>
                You can cancel the booking{" "}
                <h5>at least 2 days before the lesson starts.</h5>
              </div>
            </>
          )}
        </div>
      )}

      {confirmDone && (
        <div className={styles.modalContainer}>
          <h5>
            Confirmation {props.confirmationSuccess ? "Completed" : "Fail"}
          </h5>
          <div>{props.serverMessageWhenConfirming}</div>
          <div>
            <ImCancelCircle
              onClick={() => {
                props.closeModal();
              }}
              className={styles.modalCloseBtn}
            />
          </div>
          <Button
            onClick={() => {
              props.closeModal();
            }}
            className={styles.modalConfirmBtn}
          >
            Done
          </Button>
        </div>
      )}
    </Modal>
  );
}
