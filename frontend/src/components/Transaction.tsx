import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../redux/store";
import { useEffect } from "react";
import styles from "../css/Transaction.module.css";
import { Table } from "react-bootstrap";
import { getTransactionInfo } from "../redux/transaction/thunks";
import moment from "moment";

export default function Transaction() {
  const dispatch = useDispatch();
  const { transactionItems } = useSelector(
    (state: IRootState) => state.transaction
  );
  // console.log("transactionItems", transactionItems);
  useEffect(() => {
    const result = async () => {
      dispatch(getTransactionInfo());
    };
    result();
  }, [dispatch]);

  // local time zone
  function convertToLocalDate(timeString: any) {
    let date = new Date(timeString).toLocaleDateString();
    // CODE REVIEW: use moment/date-fns!!!
    if (date.includes("/")) {
      date = date.split("/").reverse().join("-");
    }
    return date;
  }

  function convertToLocalTime(timeString: any) {
    let date = new Date(timeString).toLocaleTimeString();
    if (date.includes("/")) {
      date = date.split("/").reverse().join("-");
    }
    // let time = new Date(timeString).toLocaleTimeString();
    return date;
  }

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
            <Table className={styles.myTable} responsive="md">
              <thead>
                <tr>
                  <th className={styles.tableTitle}>Date & Time</th>
                  <th className={styles.tableTitle}>Class</th>
                  <th className={styles.tableTitle}>Package</th>
                  <th className={styles.tableTitle}>Type</th>
                  <th className={styles.tableTitle}>Credits</th>
                </tr>
              </thead>
              <tbody>
                {transactionItems &&
                  transactionItems.map((item, itemIndex) => {
                    return (
                      <tr key={itemIndex}>
                        <td className={styles.tableItem}>
                          {/* {convertToLocalDate(item.date)} */}
                          {moment(`${item.date}`).format("LLL")}
                        </td>
                        <td className={styles.tableItem}>{item.class}</td>
                        <td className={styles.tableItem}>{item.package}</td>
                        <td className={styles.tableItem}>{item.type}</td>
                        <td className={styles.tableItem}>{item.credit}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
