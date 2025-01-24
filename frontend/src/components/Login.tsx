import { Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginThunk } from "../redux/auth/thunks";
import loginStyles from "../css/Login.module.css";
import LoginHooks from "./LoginHooks";
import { Link } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";

interface FormState {
  email: string;
  password: string;
}

export default function Login() {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors }, //
    handleSubmit, reset
  } = useForm<FormState>({
  });
  const [error, setError] = useState("")

  const onSubmit = async (data: FormState) => {
    let result = await dispatch(loginThunk(data.email, data.password));
    console.log({ result })
    //@ts-ignore
    if (result.success) {
      window.location.href = "/"
    } else {
      reset()
      //@ts-ignore
      setError(result.msg)
      setTimeout(() => { setError("") }, 2000)
    }

  };


  return (
    <div>
      <div className="col-sm-12 col-lg-12 container">
        <div></div>
        <Link to="/">
          <img
            src={require("../assets/logo.png")}
            alt="logo"
            className={loginStyles.logoTop}
          />
        </Link>
        <div className={loginStyles.registerTitle}>Login</div>

        <div className={`col-md-4 ${loginStyles.inputContainer}`}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                {...register("email", {
                  required: "This is required.",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "This input is email address only.",
                  },
                  maxLength: {
                    value: 50,
                    message: "This input exceed max length.",
                  },
                })}
              />
              <div className={loginStyles.error}>   <ErrorMessage errors={errors} name="email" /></div>

            </Form.Group>
            <br />

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
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
                <ErrorMessage errors={errors} name="password" /></div>
            </Form.Group>
            <div style={{ textAlign: "center" }}>
              <div className={`${loginStyles.error} d-flex justify-content-center`}>{error}</div>
              <button className={`btn ${loginStyles.btnRegister}`}>
                LOGIN
              </button>
              <br />

              <div className="divider">
                <div className={loginStyles.or}>OR</div>
              </div>
              <Container>
                <Row>
                  <div>
                    <LoginHooks />
                  </div>
                </Row>

              </Container>
            </div>
          </Form>
        </div>
        <div className={`row ${loginStyles.acRelatedBtn}`}>
          <div
            className={`col-lg-12 ${loginStyles.inputContainer} ${loginStyles.signinlink}`}
          >
            <a className={loginStyles.forgotbutton} href="/register">
              New to AYoga? Sign up
            </a>
            <br />
            <br />
          </div>
        </div>
      </div>

    </div>
  );
}
