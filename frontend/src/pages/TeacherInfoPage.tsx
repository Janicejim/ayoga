import { useEffect, useState } from "react";
import { useParams } from "react-router";
import OtherClassItems from "../components/OtherClassItem";
import Comments from "../components/Comments";
import { Row } from "react-bootstrap";
import { REACT_APP_UPLOAD_IMAGE } from "../utils/config";
import { getDataNotLogin } from "../api/api";

function TeacherInfoPage() {
  const [teacherInfo, setTeacherInfo] = useState<any>({});
  const [studentComment, setStudentComment] = useState<any[]>([]);
  const { id } = useParams<{ id: string }>();

  async function getTeacherInfoAndComment() {
    let result = await getDataNotLogin(`api/teacher/info?teacher_id=${+id}`)
    setTeacherInfo(result.data.teacherInfo[0]);
    setStudentComment(result.data.comments);
  }

  useEffect(() => {
    getTeacherInfoAndComment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <Row>
        <div className="col-md-6 col-s-12 ">
          <img style={{ width: "20rem", height: "25rem" }}
            src={`${REACT_APP_UPLOAD_IMAGE}/${teacherInfo.photo}`}
            alt="teacher personal pic"
          ></img>

        </div>
        <div className="col-md-6 col-s-12">
          <h5 style={{ marginTop: "1rem" }}>Name:{teacherInfo.name}</h5>
          <h5 style={{ marginTop: "1rem" }}>Score:{teacherInfo.score}</h5>
          <h5 style={{ marginTop: "1rem" }}>Introduction</h5>
          <div>{teacherInfo.introduction}</div>
          <div style={{ marginTop: "1rem" }}>
            <h5>Newest Yoga Qualification:{teacherInfo.newest_qualification}</h5>
          </div>
        </div>

      </Row>

      {studentComment.length > 0 && <div> <div style={{ marginTop: "1rem" }}><h5>Student Feedback</h5>
      </div> <Comments data={studentComment} />
      </div>}
      <h5 style={{ marginTop: "2rem" }}>Active Class</h5>
      <OtherClassItems teacherId={+id} />
    </div>
  );
}
export default TeacherInfoPage;
