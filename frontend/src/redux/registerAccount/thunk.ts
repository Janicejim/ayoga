import { Dispatch } from "redux";
import { fetchRegisterAccount } from "../../api/auth";
import { IRegisterAction } from "./actions";
import { CallHistoryMethodAction, push } from "connected-react-router";
import { IAuthAction, loadToken, loginSuccess } from "../auth/actions";

export function registerAccountThunk(
  name: string,
  email: string,
  password: string,
  confirmPw: string,
  icon: string,
  phone: string
) {
  return async (
    dispatch: Dispatch<IRegisterAction | CallHistoryMethodAction | IAuthAction>
  ) => {
    const res = await fetchRegisterAccount(
      name,
      email,
      password,
      confirmPw,
      icon,
      phone
    );

    const result = await res.json();
    if (result.success) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("name", result.name);
      localStorage.setItem("icon", result.icon);
      dispatch(loginSuccess(result.name, result.icon));
      dispatch(loadToken(result.token));
    }

    return result;
  };
}
