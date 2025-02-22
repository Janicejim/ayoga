import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import loginStyles from "../css/login.module.css";
import { Container, Row, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { showMsgAlert } from "../utils/alert";
import { updateCredit } from "../redux/userInfo/actions";
import { DropDown } from "../components/DropDown";
import { getData, postOrPatchTextForm } from "../api/api";
import { Bank } from "../utils/models";

interface FormState {
  withdrawalAmount: number;
  fps_no: string;
  full_name: string;
  bank_id: number;
}

function WithdrawalCreditPage() {
  const [allCredit, setAllCredit] = useState<number>(0);
  const [heldCredit, setHeldCredit] = useState<number>(0);
  const [unHoldCredit, setUnHoldCredit] = useState<number>(0);
  const [withdrawMaxCredit, setWithdrawMaxCredit] = useState<number>(0);
  const { user } = useSelector((state: IRootState) => state.auth);
  const [banks, setBanks] = useState<Bank[]>([])
  const [selectedBankId, setSelectedBankId] = useState<number>(0)
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormState>({
    defaultValues: {},
  });

  async function getCredit() {
    let result = await getData(`api/user/credit`);
    if (user.role === "user") {
      setAllCredit(result.data.allCredit);
      setWithdrawMaxCredit(result.data.allCredit);
    } else if (user.role === "teacher") {
      setAllCredit(result.data.allCredit);
      setHeldCredit(result.data.heldCredit);
      setUnHoldCredit(result.data.unHoldCredit);
      setWithdrawMaxCredit(result.data.unHoldCredit);
    }
    dispatch(updateCredit(result.data.allCredit));
  }

  async function getBanks() {
    let result = await getData(`api/credit/banks`)
    if (result.success) {
      setBanks(result.data)
    }

  }

  useEffect(() => {
    getCredit();
    getBanks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: FormState) => {
    if (!selectedBankId) {
      showMsgAlert("error", "please select bank");
      return
    }
    data["bank_id"] = selectedBankId
    let result = await postOrPatchTextForm("POST", `api/user/withdrawal`, data);
    reset();

    if (result.success) {
      showMsgAlert("success", result.msg);
      getCredit();
    } else {
      showMsgAlert("error", result.msg);
    }
  };

  return (
    <div>
      <div className={loginStyles.registerTitle}>
        Withdrawal Credit To Money
      </div>

      <div className="d-flex justify-content-center ">
        Total Credit: {allCredit}
      </div>
      {user.role === "teacher" && (
        <div>
          <div className="d-flex justify-content-center ">
            {" "}
            Held Credit:{heldCredit} (class not finish)
          </div>
          <div className="d-flex justify-content-center ">
            {" "}
            Credit Can Withdrawal :{unHoldCredit}
          </div>
        </div>
      )}

      <div
        className={`${loginStyles.inputContainer} d-flex justify-content-center`}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <Row>
              <Form.Group className={`${loginStyles.spaceBetween}`}>
                <Form.Label>Credit Withdrawal Amount:</Form.Label>
                <Form.Control
                  size="lg"
                  type="number"
                  {...register("withdrawalAmount", {
                    required: "This is required",
                    max: {
                      value: withdrawMaxCredit,
                      message: `The amount need <= ${withdrawMaxCredit}`,
                    },
                    min: {
                      value: 1,
                      message: "Please enter amount >0",
                    },
                  })}
                />
                <div className={loginStyles.error}>
                  <ErrorMessage errors={errors} name="withdrawalAmount" />
                </div>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className={` ${loginStyles.spaceBetween}`}>
                <Form.Label>FPS Number:</Form.Label>
                <Form.Control
                  size="lg"
                  type="text"
                  {...register("fps_no", {
                    required: "This is required",
                    minLength: {
                      value: 3,
                      message: "Must have at least 8 characters.",
                    },
                  })}
                />
                <div className={loginStyles.error}>
                  <ErrorMessage errors={errors} name="fps_no" />
                </div>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className={` ${loginStyles.spaceBetween}`}>
                <Form.Label>Bank Name:</Form.Label>
                <DropDown type="bank" data={banks} onChangeCurrentItem={(value: Bank) => setSelectedBankId(value.id)} />


              </Form.Group>
            </Row>
            <Row>
              <Form.Group className={` ${loginStyles.spaceBetween}`}>
                <Form.Label>Your Full Name:</Form.Label>

                <Form.Control
                  size="lg"
                  type="text"
                  {...register("full_name", {
                    required: "This is required",
                    minLength: {
                      value: 3,
                      message: "Must have at least 4 characters.",
                    },
                  })}
                />
                <div className={loginStyles.error}>
                  <ErrorMessage errors={errors} name="full_name" />
                </div>
              </Form.Group>
            </Row>
            <div style={{ textAlign: "center" }}>
              <br />
              <button
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
export default WithdrawalCreditPage;
