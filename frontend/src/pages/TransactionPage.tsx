
import { useEffect, useState } from "react";
import styles from "../css/transaction.module.css";
import moment from "moment";
import { getData } from "../api/api";
import { TransactionPageItem } from "../utils/models";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";




export default function TransactionPage() {
  const [transactionItems, setTransactionItems] = useState<any[]>([])





  async function getTransactionInfo() {
    const result = await getData(`api/credit/transaction`);

    if (result.success) {

      let mappedData = result.data.map((item: TransactionPageItem) => {
        return {
          transaction_id: item.transaction_id,
          date: moment(`${item.date}`).format("LLL"),
          package: item.package,
          type: item.type,
          credit: item.credit,
          class: item.class

        }
      })

      setTransactionItems(mappedData)
    }
  }

  useEffect(() => {
    getTransactionInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col">
            <h2 className={styles.pageTitle}>Transactions</h2>
            <div className={styles.packageTitle}>
              Credits you purchased and earned
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <DataTable value={transactionItems} paginator rows={20} rowsPerPageOptions={[20, 50, 100]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="transaction_id" header="Transaction id" sortable style={{ width: '25%' }}></Column>
                <Column field="date" header="Date & Time" sortable style={{ width: '25%' }}></Column>
                <Column field="class" header="Class" sortable style={{ width: '25%' }}></Column>
                <Column field="package" header="Package" sortable style={{ width: '10%' }}></Column>
                <Column field="type" header="Type" sortable style={{ width: '30%' }}></Column>
                <Column field="credit" header="Credits" sortable style={{ width: '25%' }}></Column>
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
