import { Dispatch } from "redux";
import { addCredit, gotPackagesInfo, IPackageAction } from "./actions";
import { fetchAddCredit, fetchGetPackageInfo } from "../../api/package";

export function getPackageInfo() {
  return async (dispatch: Dispatch<IPackageAction>) => {
    const res = await fetchGetPackageInfo();
    // console.log(res);
    const result: any = await res.json();
    // console.log(result);
    if (result.success) {
      dispatch(gotPackagesInfo(result.data));
    }
  };
}

export function addUserCredit(package_id: number, status: string) {
  return async (dispatch: Dispatch<IPackageAction>) => {
    const res = await fetchAddCredit(package_id, status);
    //@ts-ignore
    let result = await res.json();
    if (result.success) {
      dispatch(addCredit());
    }
  };
}
