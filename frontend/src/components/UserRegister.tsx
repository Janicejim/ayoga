import { useState } from "react";
import { Form } from "react-bootstrap"; //
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import regStyles from "../css/Register.module.css";
import loginStyles from "../css/Login.module.css";
import { registerAccountThunk } from "../redux/registerAccount/thunk";
import { ErrorMessage } from "@hookform/error-message";

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPw: string;
  icon: string;
  phone: string;
}
export default function RegisterAccount() {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues, reset
  } = useForm<FormState>({});
  const [error, setError] = useState("");

  const onSubmit = async (data: FormState) => {
    const icon = data.icon[0];
    let result = await dispatch(
      registerAccountThunk(
        data.name,
        data.email,
        data.password,
        data.confirmPw,
        icon,
        data.phone
      )
    );
    //@ts-ignore
    if (result.success) {
      window.location.href = "/"
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
          <Link to="/">
            <img
              src={require("../assets/logo.png")}
              alt="logo"
              className={loginStyles.logoTop}
            />
          </Link>
          <br />
          <div className={loginStyles.registerTitle}>Create an account</div>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className={`col-md-5 ${loginStyles.inputContainer}`}>
              <Form.Group className={loginStyles.spaceBetween}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  // placeholder="Username"
                  {...register("name", {
                    required: "This is required",
                    maxLength: {
                      value: 30,
                      message: "This input exceed max length",
                    },
                    minLength: {
                      value: 2,
                      message: "Name must have at least 2 characters",
                    },
                  })}
                // onChange={handleChange}
                />
                <div className={loginStyles.error}>
                  {" "}
                  <ErrorMessage errors={errors} name="name" />
                </div>
              </Form.Group>

              <Form.Group className={loginStyles.spaceBetween}>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  {...register("phone", {
                    required: "This is required",
                    maxLength: {
                      value: 8,
                      message: "This input exceed max length",
                    },
                    minLength: {
                      value: 8,
                      message: "Phone in Hong Kong must have 8 number",
                    },
                  })}
                />
                <div className={loginStyles.error}>
                  <ErrorMessage errors={errors} name="phone" />
                </div>
              </Form.Group>

              <Form.Group className={loginStyles.spaceBetween}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  // placeholder="Email"
                  {...register("email", {
                    required: "This is required.",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "This input is email address only",
                    },
                    maxLength: {
                      value: 50,
                      message: "This input exceed max length",
                    },
                  })}
                />
                <div className={loginStyles.error}>
                  <ErrorMessage errors={errors} name="email" />
                </div>
              </Form.Group>

              <Form.Group className={loginStyles.spaceBetween}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  // placeholder="Password"
                  {...register("password", {
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
                  <ErrorMessage errors={errors} name="password" />
                </div>
              </Form.Group>
              <Form.Group className={loginStyles.spaceBetween}>
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                  type="password"
                  autoComplete="password"
                  {...register("confirmPw", {
                    required: "This is required",
                    maxLength: {
                      value: 30,
                      message: "This input exceed max length.",
                    },
                    minLength: {
                      value: 5,
                      message: "Password must have at least 5 characters.",
                    },
                    validate: (value) => value === getValues("password"),
                    // to-do message: "Password do not match."
                  })}
                />
                <div className={loginStyles.error}>
                  <ErrorMessage errors={errors} name="confirmPw" />
                </div>
              </Form.Group>

              <Form.Group className={loginStyles.spaceBetween}>
                <Form.Label>Upload your avatar (optional)</Form.Label>

                <Form.Control
                  type="file"
                  placeholder="avatar"
                  {...register("icon")}
                />
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
                REGISTER
              </button>
            </div>
          </Form>
        </div>
      </div>

    </div>
  );
}
