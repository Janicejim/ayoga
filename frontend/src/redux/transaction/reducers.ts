import { ITransactionAction } from "./actions";
import { ITransactionInfoState, TransactionInfoState } from "./state";

const initialState: ITransactionInfoState = {
  transactionItems: [
    // {
    //   date: "2022-02-02",
    //   class: "yoga class",
    //   package: "",
    //   credit: -1,
    //   type: "spent",
    // },
    // {
    //   date: "2022-02-02",
    //   class: "",
    //   package: "active",
    //   credit: 10,
    //   type: "purchased",
    // },
    // {
    //   date: "2022-02-02",
    //   class: "yoga class",
    //   package: "",
    //   credit: 1,
    //   type: "earned",
    // },
    // {
    //   date: "2022-02-02",
    //   class: "yoga class",
    //   package: "",
    //   credit: 1,
    //   type: "refund",
    // },
  ],
};

export const transactionReducers = (
  state: ITransactionInfoState = initialState,
  action: ITransactionAction
): ITransactionInfoState => {
  switch (action.type) {
    case "@@TransactionInfo/GOT_TRANSACTION_INFO":
      // console.log("action data", action.data);
      const newTransaction: TransactionInfoState[] = [...action.data];
      return {
        ...state,
        transactionItems: newTransaction,
      };
    default:
      return state;
  }
};
