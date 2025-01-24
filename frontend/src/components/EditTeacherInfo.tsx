import { useEffect, useState } from "react";
import { Form } from "react-bootstrap"; //
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import loginStyles from "../css/Login.module.css";
import { editTeacherInfo, fetchTeacherInfo } from "../api/teacher";


interface FormState {
  introduction: string;
  newest_qualification: string;

}
export default function EditTeacherInfo() {

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<FormState>({});
  const [error, setError] = useState("");
  const [introduction, setIntroduction] = useState("")
  const [newest_qualification, setNewestQualification] = useState("")

  const getTeacherInfo = async () => {
    let result = await fetchTeacherInfo()
    setIntroduction(result.data[0].introduction)
    setNewestQualification(result.data[0].newest_qualification)
  }

  useEffect(() => { getTeacherInfo() }, [])


  const onSubmit = async (data: FormState) => {
    // console.log({ data })
    let result = await editTeacherInfo(data)


    //@ts-ignore
    if (result.success) {
      alert("success")
    } else {
      reset()
      //@ts-ignore
      setError(result.msg.toUpperCase());
      setTimeout(() => { setError("") }, 2000)

    }
  };

  return (
    <div className="row">

      <div>
        <div className="col-sm-12 col-lg-12 container">

          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className={`col-md-5 ${loginStyles.inputContainer}`}>
              {introduction && <Form.Group className={loginStyles.spaceBetween}>
                <Form.Label>introduction</Form.Label>
                <br />
                <textarea style={{ width: "100%", height: "20rem" }}

                  defaultValue={introduction}
                  {...register("introduction", {
                    required: "This is required",
                    minLength: {
                      value: 2,
                      message: "Name must have at least 2 characters",
                    },
                  })}

                />
                <div className={loginStyles.error}>

                  <ErrorMessage errors={errors} name="introduction" />
                </div>
              </Form.Group>}


              {newest_qualification && <Form.Group className={loginStyles.spaceBetween}>
                <Form.Label>newest_qualification</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={newest_qualification}
                  {...register("newest_qualification", {
                    required: "This is required"
                  })}
                />
                <div className={loginStyles.error}>
                  <ErrorMessage errors={errors} name="newest_qualification" />
                </div>
              </Form.Group>}




            </div>
            <div
              className={`${loginStyles.error} d-flex justify-content-center`}
            >
              {error}
            </div>

            <div style={{ textAlign: "center" }}>
              <button
                type="submit"
                className={`btn ${loginStyles.btnRegister}`}
              >
                Submit
              </button>
            </div>
          </Form>
        </div>
      </div>

    </div>
  );
}
