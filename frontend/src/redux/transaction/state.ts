export interface TransactionInfoState {
  date: string;
  class: string;
  package: string;
  credit: number;
  type: string;
  transaction_id: string
}

export interface ITransactionInfoState {
  transactionItems: TransactionInfoState[];
}
