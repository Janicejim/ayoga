import { TransactionInfoState } from "./state";

export function gotTransactionInfo(data: TransactionInfoState[]) {
  return {
    type: "@@TransactionInfo/GOT_TRANSACTION_INFO" as const,
    data,
  };
}

export type ITransactionAction = ReturnType<typeof gotTransactionInfo>;
