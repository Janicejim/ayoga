import { useState } from "react";
import { Form } from "react-bootstrap"; //
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import loginStyles from "../css/Login.module.css";
import { changePassword } from "../api/userInfo";


interface FormState {
  old_password: string;
  new_password: string;
  confirm_password: string;
}
export default function ChangePassword() {

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues
  } = useForm<FormState>({});
  const [error, setError] = useState("");

  const onSubmit = async (data: FormState) => {
    console.log({ data })
    let result = await changePassword(data)


    //@ts-ignore
    if (result.success) {
      alert(result.msg)
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
              <Form.Group className={loginStyles.spaceBetween}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"

                  {...register("old_password", {
                    required: "This is required"
                  })}

                />
                <div className={loginStyles.error}>
                  {" "}
                  <ErrorMessage errors={errors} name="old_password" />
                </div>
              </Form.Group>

              <Form.Group className={loginStyles.spaceBetween}>
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"

                  {...register("new_password", {
                    required: "This is required",
                    maxLength: {
                      value: 30,
                      message: "This input exceed max length",
                    },
                    minLength: {
                      value: 5,
                      message: "Password must have at least 5 characters",
                    },
                  })}
                />
                <div className={loginStyles.error}>
                  <ErrorMessage errors={errors} name="new_password" />
                </div>
              </Form.Group>

              <Form.Group className={loginStyles.spaceBetween}>
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                  type="password"
                  autoComplete="password"
                  {...register("confirm_password", {
                    required: "This is required",
                    maxLength: {
                      value: 30,
                      message: "This input exceed max length.",
                    },
                    minLength: {
                      value: 5,
                      message: "Password must have at least 5 characters.",
                    },
                    validate: (value) => value === getValues("new_password") || "password not match"

                  })}
                />
                <div className={loginStyles.error}>
                  <ErrorMessage errors={errors} name="confirm_password" />
                </div>
              </Form.Group>


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
