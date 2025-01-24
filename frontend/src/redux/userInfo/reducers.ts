import { IUserInfoAction } from "./actions";
import { IUserInfoBoxState } from "./state";

const initialState: IUserInfoBoxState = {
  name: "",
  icon: "",
  credit: 0,
  role: "user",
  email: "",
  phone: ""
};

export const userInfoReducers = (
  state: IUserInfoBoxState = initialState,
  action: IUserInfoAction
): IUserInfoBoxState => {
  switch (action.type) {
    case "@@UserInfo/GOT_USER_INFO":
      const newUserInfo: IUserInfoBoxState = { ...action.data };

      return {
        ...state,
        name: newUserInfo.name,
        icon: newUserInfo.icon,
        credit: newUserInfo.credit,
        role: newUserInfo.role,
        email: newUserInfo.email,
        phone: newUserInfo.phone
      };
    case "@@UserInfo/UPDATE_CREDIT":
      const newCredit: number = action.credit;
      return {
        ...state,
        credit: newCredit,
      };

    default:
      return state;
  }
};
