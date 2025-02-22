import { IAuthState } from "./state";
import { IAuthAction } from "./actions";
import jwt from "jwt-decode";
import { JWTPayload } from "./state";
function loadToken() {
  const token = localStorage.getItem("token");
  if (token) {
    const payload: JWTPayload = jwt(token);
    return payload;
  }
  return;
}

const initialState: IAuthState = {
  isAuthenticate: localStorage.getItem("token") != null,
  isTeacherMode: loadToken()?.role === "teacher",
  name: localStorage.getItem("name") || "",
  icon: localStorage.getItem("icon") || "",
  user: {
    userId: loadToken()?.userId,
    email: loadToken()?.email,
    role: loadToken()?.role,
  },
};

export const authReducers = (
  state: IAuthState = initialState,
  action: IAuthAction
): IAuthState => {
  switch (action.type) {
    case "@@Auth/LOGIN":
      return {
        ...state,
        isAuthenticate: true,
        name: action.name,
        icon: action.icon,
      };
    case "@@Auth/LOAD_TOKEN":
      const payload: JWTPayload = jwt(action.token);
      const { userId, email, role } = payload;
      return {
        ...state,
        user: {
          userId: userId,
          email: email,
          role: role,
        },
      };
    case "@@Auth/LOGOUT":
      localStorage.removeItem("token");
      return {
        isAuthenticate: false,
        isTeacherMode: false,
        name: "",
        icon: "",
        user: {
          userId: undefined,
          email: undefined,
          role: undefined,
        },
      };
    case "@@Auth/SWITCH_ROLE_MODE":
      return { ...state, isTeacherMode: !state.isTeacherMode };

    default:
      return state;
  }
};
