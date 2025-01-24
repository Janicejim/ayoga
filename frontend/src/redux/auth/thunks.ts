import { Dispatch } from "redux";
import {
  fetchLogin,
  fetchFacebookLogin,
  fetchGoogleLogin,
} from "../../api/auth";
import { IAuthAction, loginSuccess, loadToken, logout } from "./actions";
import { CallHistoryMethodAction, push } from "connected-react-router";
export function loginThunk(username: string, password: string) {
  return async (dispatch: Dispatch<IAuthAction | CallHistoryMethodAction>) => {
    const res = await fetchLogin(username, password);
    const result = await res.json();
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

export function loginFacebookThunk(accessToken: string) {
  return async (dispatch: Dispatch<IAuthAction | CallHistoryMethodAction>) => {
    const res = await fetchFacebookLogin(accessToken);
    const result = await res.json();

    if (res.ok) {
      // console.log(`fb login result`, result)
      localStorage.setItem("token", result.jwttoken);
      dispatch(loginSuccess(result.name, result.icon));
      // console.log(`fb token`, result.jwttoken)
      dispatch(loadToken(result.jwttoken));
      dispatch(push("/"));
    }
  };
}

export function loginGoogleThunk(googleAccessToken: string) {
  return async (dispatch: Dispatch<IAuthAction | CallHistoryMethodAction>) => {
    const res = await fetchGoogleLogin(googleAccessToken);
    // console.log(`res on thunk`, res);
    const result = await res.json();

    if (res.ok) {
      // console.log(`google login result`, result)
      localStorage.setItem("token", result.jwttoken);
      dispatch(loginSuccess(result.name, result.icon));
      dispatch(loadToken(result.jwttoken));
      // console.log(`google jwt`, result.jwttoken)
      dispatch(push("/"));
    }
  };
}
