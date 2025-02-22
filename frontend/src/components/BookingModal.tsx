import moment from "moment";
import { Modal, Button } from "react-bootstrap";
import styles from "../css/classDetails.module.css";
import { ImCancelCircle } from "react-icons/im";
import { useState } from "react";
import { REACT_APP_UPLOAD_IMAGE } from "../utils/config";
import { ClassDetails } from "../utils/models";

interface Props {
  closeModal: () => void;
  confirmToBook: () => void;
  confirmToCancel: () => void;
  confirmationSuccess: Boolean;
  serverMessageWhenConfirming: String;
  isToCancel: Boolean;
  data: ClassDetails
}

export function BookingModal(props: Props) {
  const {
    image,
    name, date,
    start_time,
    teacher_name,
    capacity,
    credit,
    available,
    venue,
  } = props.data

  const [confirmDone, setConfirmDone] = useState<Boolean>(false);

  const confirmActions = () => {
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
                {venue &&
                  (
                    <img
                      src={`${REACT_APP_UPLOAD_IMAGE}/${image}`}
                      width="250"
                      alt={image}
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
              <h3 className={styles.modalNameTopMargin}>{name}</h3>
              <h4 className={styles.dataText}>
                {date &&
                  moment(`${date}`).format("ddd, Do MMM YYYY") +
                  ", " +
                  start_time}
                start_time
              </h4>
              <h4 className="">
                Instructor:{" "}
                {teacher_name.charAt(0).toUpperCase() +
                  teacher_name.slice(1)}
              </h4>
              {props.isToCancel ? (
                <h5>Credit to be refunded: {credit}</h5>
              ) : (
                <h4>Credit: {credit}</h4>
              )}
              <div className="text-muted">
                Available Seats:{" "}
                {available && available + "/" + capacity}
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
