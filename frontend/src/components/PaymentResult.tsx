import { Button, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import styles from "../css/payment.module.css";
import { useEffect } from "react";
import { postPatchOrDeleteWithQueryOnly } from "../api/api";

export default function PaymentResult() {
  const { result, id } = useParams<any>();

  async function insertPaymentRecord() {
    if (id && result === 'success') {
      if (result === "cancel") {
        return;
      }
      await postPatchOrDeleteWithQueryOnly("POST", `api/credit/record?package_id=${id}`)
    }
  }
  useEffect(() => {
    insertPaymentRecord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal show={true} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header className={styles.modalTitle}>
        {result === "success" ? (
          <Modal.Title>Congratulation</Modal.Title>
        ) : (
          <Modal.Title>Cancel</Modal.Title>
        )}
      </Modal.Header>

      <Modal.Body className={styles.modalTitle}>
        {result === "success" ? (
          <p>Payment Success</p>
        ) : (
          <p>Your Payment has been canceled</p>
        )}
      </Modal.Body>

      <Modal.Footer className={styles.modalFooter}>
        <Link to="/class/find">
          <Button className={styles.modalButton}>Book a Class</Button>
        </Link>
        <Link to="/transaction">
          <Button className={styles.modalButton}>View Transaction</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
}
