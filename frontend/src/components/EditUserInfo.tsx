import { useState } from "react";
import { Form } from "react-bootstrap"; //
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import loginStyles from "../css/Login.module.css";
import { IRootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { editUserInfo } from "../api/userInfo";
import { getBoxInfo } from "../redux/userInfo/thunks";

interface FormState {
  name: string;
  email: string;
  phone: string;
}
export default function EditUserInfo() {
  const dispatch = useDispatch();
  const { name, email, phone } = useSelector(
    (state: IRootState) => state.userInfo
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<FormState>({});
  const [error, setError] = useState("");

  const onSubmit = async (data: FormState) => {
    let result = await editUserInfo(data)
    //@ts-ignore
    if (result.success) {
      alert(result.msg)
      dispatch(getBoxInfo());
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
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={name}
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
                  defaultValue={phone}
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
                  defaultValue={email}
                  disabled
                  type="text"
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
                Submit
              </button>
            </div>
          </Form>
        </div>
      </div>

    </div>
  );
}
