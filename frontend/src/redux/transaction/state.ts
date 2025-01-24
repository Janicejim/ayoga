export interface TransactionInfoState {
  date: string;
  class: string;
  package: string;
  credit: number;
  type: string;
}

export interface ITransactionInfoState {
  transactionItems: TransactionInfoState[];
}
