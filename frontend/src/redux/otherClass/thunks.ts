import { Dispatch } from "redux";
import { fetchGetOtherClassInfo } from "../../api/otherClass";
import { gotOtherClassInfo, IOtherClassAction } from "./actions";

export function getOtherClassInfo(teacher_id: number) {
  return async (dispatch: Dispatch<IOtherClassAction>) => {
    const res = await fetchGetOtherClassInfo(teacher_id);
    // console.log(res);
    const result: any = await res.json();
    // console.log(result);
    if (result.success) {
      dispatch(gotOtherClassInfo(result.data));
    }
  };
}
