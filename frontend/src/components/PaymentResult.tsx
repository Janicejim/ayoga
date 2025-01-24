import { Button, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import styles from "../css/PaymentSuccess.module.css";
import { useEffect } from "react";
import { fetchAddCredit } from "../api/package";

export default function PaymentResult() {
  const { result, id } = useParams<any>();

  async function insertPaymentRecord() {
    if (id && result === 'success') {
      await fetchAddCredit(id, result);
    }
  }
  useEffect(() => {
    insertPaymentRecord();
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
        <Link to="/findClass">
          <Button className={styles.modalButton}>Book a Class</Button>
        </Link>
        <Link to="/transaction">
          <Button className={styles.modalButton}>View Transaction</Button>
        </Link>
        {/* <Button onClick={() => setShow(false)} className={styles.modalButton}>
          Continue Purchase
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
}
