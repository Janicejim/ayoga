import { useForm } from "react-hook-form";
import { Container, Form, Row } from "react-bootstrap";
import { ErrorMessage } from "@hookform/error-message";
import loginStyles from "../css/Login.module.css";
import { fetchApplyTeacherRole } from "../api/teacher";
import { showMsgAlert } from "../utils/alert";

interface FormState {
  sex: string;
  newest_qualification: string;
  photo: string;
  id_photo: string;
  cert: string;
  introduction: string;
}

function ApplyTeacherPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormState>({
    defaultValues: {},
  });

  const onSubmit = async (data: FormState) => {
    let photo = data.photo[0];
    let id_photo = data.id_photo[0];
    let cert = data.cert[0];
    let result = await fetchApplyTeacherRole(
      data.sex,
      data.newest_qualification,
      photo,
      id_photo,
      cert,
      data.introduction
    );
    if (result.success) {
      reset();
      showMsgAlert("success", result.msg);
    } else {
      showMsgAlert("error", result.msg);
    }
  };

  return (
    <div>
      <div className={loginStyles.registerTitle}>Apply Teacher Role</div>
      <div className="d-flex justify-content-center ">
        Below Information will use to show in teacher info page,please provide
        photo that can show your real face and supportings for your yoga teacher
        qualification
      </div>
      <br></br>
      <div className={`col-md-6 ${loginStyles.inputContainer}`}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <Row>
              <Form.Group className={`col-md-6 ${loginStyles.spaceBetween}`}>
                <Form.Label>Sex</Form.Label>
                <Form.Control
                  as="select"
                  size="lg"
                  {...register("sex", {
                    required: "This is required",
                    validate: (value) =>
                      value !== "" || "Please select an option",
                  })}
                >
                  <option value="">-- Select --</option>
                  <option value="F">F</option>
                  <option value="M">M</option>
                  <ErrorMessage errors={errors} name="sex" />
                </Form.Control>
              </Form.Group>
              <Form.Group className={`col-md-6 ${loginStyles.spaceBetween}`}>
                <Form.Label>Upload Personal Photo</Form.Label>
                <Form.Control
                  size="lg"
                  type="file"
                  {...register("photo", { required: "This is required" })}
                />
                <div className={loginStyles.error}>
                  {" "}
                  <ErrorMessage errors={errors} name="photo" />
                </div>
              </Form.Group>
              <Form.Group className={`col-md-6 ${loginStyles.spaceBetween}`}>
                <Form.Label>Upload Your ID card</Form.Label>
                <div style={{ fontSize: "0.7rem" }}>
                  The ID record will only use to confirm the qualification of
                  cert
                </div>
                <Form.Control
                  size="lg"
                  type="file"
                  {...register("id_photo", { required: "This is required" })}
                />
                <div className={loginStyles.error}>
                  {" "}
                  <ErrorMessage errors={errors} name="id_photo" />
                </div>
              </Form.Group>

              <Form.Group className={`col-md-6 ${loginStyles.spaceBetween}`}>
                <Form.Label>Your Newest Qualification Name</Form.Label>
                <div style={{ fontSize: "0.7rem" }}>
                  We only accept the cert from Yoga Alliance,Yoga Alliance USA
                </div>
                <Form.Control
                  size="lg"
                  type="text"
                  {...register("newest_qualification", {
                    minLength: {
                      value: 3,
                      message: "Class name must have at least 10 characters.",
                    },
                  })}
                />
                <div className={loginStyles.error}>
                  <ErrorMessage errors={errors} name="newest_qualification" />
                </div>
              </Form.Group>
            </Row>
            <Row>

              <Form.Group className={`col-md-12 ${loginStyles.spaceBetween}`}>
                <Form.Label> Supporting Of Qualification</Form.Label>
                <Form.Control
                  size="lg"
                  type="file"
                  {...register("cert", { required: "This is required" })}
                />
                <div className={loginStyles.error}>
                  {" "}
                  <ErrorMessage errors={errors} name="cert" />
                </div>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className={`col-md-12 ${loginStyles.spaceBetween}`}>
                <Form.Label>About You</Form.Label>
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
            <div style={{ textAlign: "center" }}>
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
      </div>
    </div>
  );
}
export default ApplyTeacherPage;
