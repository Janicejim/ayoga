import { useEffect, useState } from "react";
import styles from "../css/class.module.css";
import { Modal } from "react-bootstrap";
import moment from "moment";
import { InputText } from "primereact/inputtext";
import { showMsgAlert } from "../utils/alert";
import { REACT_APP_UPLOAD_IMAGE } from "../utils/config";
import { getData, postOrPatchTextForm } from "../api/api";
import { AnimatePresence, motion } from "framer-motion";

interface TeacherRequest {
  id: number;
  name: string;
  photo: string;
  introduction: string;
  newest_qualification: string;
  id_photo: string;
  request_date: string;
  cert: string;
}

function TeacherRequestPage() {
  const [requests, setRequests] = useState<TeacherRequest[]>([]);
  const [isReject, setIsReject] = useState<boolean>(false);
  const [remark, setRemark] = useState<string>("");

  async function getTeacherRequest() {
    let result = await getData("api/admin/teacher/request");
    if (result.success) {
      setRequests(result.data);
    }
  }

  async function replyTeacherRequest(id: number, status: string) {
    let result = await postOrPatchTextForm("POST", `api/admin/reply/request?requestId=${id}`, { status, remark })
    if (result.success) {
      showMsgAlert("success", result.msg);
      await getTeacherRequest();
    }
  }

  useEffect(() => {
    getTeacherRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex flex-wrap row" >
      {requests.length > 0 ?
        requests.map((request) => {
          return (

            <motion.div
              key={request.id}
              layout
              className="col-xs-12 col-md-4 col-sm-6"
            >
              <AnimatePresence>
                <div
                  key={request.id}
                >
                  <div className={`card h-100 ${styles.productCard}`}>
                    <div className={styles.imgContainer}>
                      <img
                        src={`${REACT_APP_UPLOAD_IMAGE}/${request.photo}`}
                        className={`card-img-top`}
                        alt="hahaha"
                        style={{ height: "16rem" }}
                      />
                    </div>
                    <div className="card-body">
                      <h5 className={styles.cardTitle}>{request.name}</h5>

                      <p className={styles.cardText}>
                        ID Photo:
                        <a
                          href={`${REACT_APP_UPLOAD_IMAGE}/${request.id_photo}`}
                        >
                          Link
                        </a>
                      </p>

                      <p className={styles.cardText}>
                        Newest Qualification Name: {request.newest_qualification}
                      </p>
                      <p className={styles.cardText}>
                        Cert Photo:
                        <a
                          href={`${REACT_APP_UPLOAD_IMAGE}/${request.cert}`}
                        >
                          Link
                        </a>
                      </p>

                      <p className={styles.cardText}>Introduction:</p>
                      {request.introduction}
                      <p className={styles.cardText}>
                        Request Date:{" "}
                        {moment(`${request.request_date}`).format(
                          "ddd, Do MMM YYYY"
                        )}
                      </p>
                      <div className="d-flex justify-content-center">
                        <div style={{ textAlign: "center" }}>
                          <button
                            onClick={() =>
                              replyTeacherRequest(request.id, "accept")
                            }
                            className="btn-success"
                          >
                            Accept
                          </button>
                        </div>
                        <div style={{ textAlign: "center", marginLeft: "1rem" }}>
                          <button
                            className="btn-warning"
                            onClick={() => setIsReject(true)}
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Modal show={isReject}>
                    <div className="container" style={{ marginTop: "1rem" }}>
                      <div>Reject Reason:</div>
                      <InputText
                        value={remark}
                        style={{ width: "100%", marginBottom: "1rem" }}
                        onChange={(e) => setRemark(e.target.value)}
                      ></InputText>
                      <div className="d-flex justify-content-center">
                        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                          <button
                            onClick={() =>
                              replyTeacherRequest(request.id, "reject")
                            }
                            className="btn-success"
                          >
                            Submit
                          </button>
                        </div>
                        <div style={{ textAlign: "center", marginLeft: "1rem" }}>
                          <button
                            className="btn-warning"
                            onClick={() => setIsReject(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>
              </AnimatePresence>
            </motion.div>
          );
        }) : <div>No Request</div>}
    </div>
  );
}
export default TeacherRequestPage;
