import { Dispatch } from "redux";
import { fetchGetTransactionInfo } from "../../api/transaction";
import { gotTransactionInfo, ITransactionAction } from "./actions";

export function getTransactionInfo() {
  return async (dispatch: Dispatch<ITransactionAction>) => {
    const res = await fetchGetTransactionInfo();
    // console.log(res);
    const result: any = await res.json();
    // console.log(result);
    if (result.success) {
      dispatch(gotTransactionInfo(result.data));
    }
  };
}
