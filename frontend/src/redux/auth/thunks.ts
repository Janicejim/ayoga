import { Dispatch } from "redux";
import { IAuthAction, loginSuccess, loadToken, logout } from "./actions";
import { CallHistoryMethodAction } from "connected-react-router";
import { postOrPatchTextForm } from "../../api/api";
export function loginThunk(username: string, password: string) {
  return async (dispatch: Dispatch<IAuthAction | CallHistoryMethodAction>) => {
    const result = await postOrPatchTextForm("POST", "api/auth/login", { email: username, password })
    if (result.success) {
      localStorage.setItem("token", result.token);
      dispatch(loginSuccess(result.name, result.icon));
      dispatch(loadToken(result.token));
      return { success: true }
    } else {
      return { success: false, msg: result.msg }
    }
  };
}

export function logoutThunk() {
  return async (dispatch: Dispatch<IAuthAction | CallHistoryMethodAction>) => {
    localStorage.removeItem("token");
    dispatch(logout());
  };
}
