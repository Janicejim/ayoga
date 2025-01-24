import { Dispatch } from "redux";
import { gotUserInfo, IUserInfoAction } from "./actions";
import { fetchGetUserInfo } from "../../api/userInfo";

export function getBoxInfo() {
  return async (dispatch: Dispatch<IUserInfoAction>) => {
    const res = await fetchGetUserInfo();
    // console.log(res);
    const result: any = await res.json();
    // console.log(result);
    if (result.success) {
      dispatch(gotUserInfo(result.data));
    }
  };
}
