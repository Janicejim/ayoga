import { Dispatch } from "redux";
import { gotUserInfo, IUserInfoAction } from "./actions";
import { getData } from "../../api/api";

export function getBoxInfo() {
  return async (dispatch: Dispatch<IUserInfoAction>) => {
    const result = await getData(`api/user/profile`);
    if (result.success) {
      dispatch(gotUserInfo(result.data));
    }
  };
}
