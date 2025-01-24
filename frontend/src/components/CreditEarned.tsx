import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../redux/store";
import { useEffect } from "react";
import creditsStyles from "../css/CreditEarned.module.css";
import { Table } from "react-bootstrap";
// import { getTransactionInfo } from "../redux/transaction/thunks";
import { classGetOtherClassInfo } from "../redux/class/thunks";

export default function CreditEarned() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: IRootState) => state.auth);
  const { otherClassItems } = useSelector(
    (state: IRootState) => state.classOtherClass
  );

  useEffect(() => {
    const otherClasses = async () => {
      if (user.userId === undefined) return;
      dispatch(classGetOtherClassInfo(user.userId));
    };
    otherClasses();
  }, [dispatch, user.userId]);

  //  console.log("otherClassItems: ",otherClassItems)
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col">
            <h2 className={creditsStyles.pageTitle}>Credit Earned:</h2>
            <div className={creditsStyles.packageTitle}></div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            <Table className={creditsStyles.myTable} responsive="md">
              <thead>
                <tr>
                  <th className={creditsStyles.tableTitle}>
                    Date of the class
                  </th>
                  <th className={creditsStyles.tableTitle}>Class</th>
                  {/* <th className={styles.tableTitle}>Package</th> */}
                  <th className={creditsStyles.tableTitle}>
                    Number of Attendees
                  </th>
                  <th className={creditsStyles.tableTitle}>Incoming Credits</th>
                </tr>
              </thead>
              <tbody>
                {otherClassItems &&
                  otherClassItems.map((item, itemIndex) => {
                    if (item.capacity > 0) {
                      return (
                        <tr key={itemIndex}>
                          <td className={creditsStyles.tableItem}>
                            {item.date}
                          </td>
                          <td className={creditsStyles.tableItem}>
                            {item.name}
                          </td>
                          <td className={creditsStyles.tableItem}>
                            {item.capacity}
                          </td>
                          <td className={creditsStyles.tableItem}>
                            {item.credit * item.capacity}
                          </td>
                        </tr>
                      );
                    }
                    return <></>;
                  })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
