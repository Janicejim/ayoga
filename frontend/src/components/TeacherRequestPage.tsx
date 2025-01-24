import { useEffect, useState } from "react";
import userInfoStyle from "../css/UserInfos.module.css";
import { Modal } from "react-bootstrap";
import moment from "moment";
import { ReplyTeacherRequestApi, fetchTeacherRequest } from "../api/admin";
import { InputText } from "primereact/inputtext";
import { showMsgAlert } from "../utils/alert";
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
    let result = await fetchTeacherRequest();
    if (result.success) {
      setRequests(result.data);
    }
  }

  async function replyTeacherRequest(id: number, status: string) {
    let result = await ReplyTeacherRequestApi(id, status, remark);
    if (result.success) {
      showMsgAlert("success", result.msg);
      await getTeacherRequest();
    }
  }

  useEffect(() => {
    getTeacherRequest();
  }, []);

  return (
    <div>
      {requests.length > 0 &&
        requests.map((request) => {
          return (
            <div
              className="col"
              key={request.id}
              style={{ border: "1px solid lightgrey" }}
            >
              <div className={`card h-100 ${userInfoStyle.productCard}`}>
                <div>
                  <img
                    src={`${process.env.REACT_APP_API_SERVER}/${request.photo}`}
                    className={`card-img-top`}
                    alt="hahaha"
                    style={{ height: "16rem" }}
                  />
                </div>
                <div className="card-body">
                  <h5 className={userInfoStyle.cardTitle}>{request.name}</h5>

                  <p className={userInfoStyle.cardText}>
                    ID Photo:
                    <a
                      href={`${process.env.REACT_APP_API_SERVER}/${request.id_photo}`}
                    >
                      Link
                    </a>
                  </p>

                  <p className={userInfoStyle.cardText}>
                    Newest Qualification Name: {request.newest_qualification}
                  </p>
                  <p className={userInfoStyle.cardText}>
                    Cert Photo:
                    <a
                      href={`${process.env.REACT_APP_API_SERVER}/${request.cert}`}
                    >
                      Link
                    </a>
                  </p>

                  <p className={userInfoStyle.cardText}>Introduction:</p>
                  {request.introduction}
                  <p className={userInfoStyle.cardText}>
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
          );
        })}
    </div>
  );
}
export default TeacherRequestPage;
