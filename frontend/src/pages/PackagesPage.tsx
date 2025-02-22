import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

import styles from "../css/package.module.css";
import { loadStripe } from "@stripe/stripe-js";
import { getData, postPatchOrDeleteWithQueryOnly } from "../api/api";
export default function PackagesPage() {

  const [packageItems, setPackageItems] = useState<any[]>([])

  async function getPackageInfo() {
    const result = await getData(`api/credit/package`);
    if (result.success) {
      setPackageItems(result.data)
    }
  }
  useEffect(() => {
    getPackageInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const makePayment = async (id: number) => {
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_API_KEY!);

    let stripeSession = await postPatchOrDeleteWithQueryOnly("POST", `api/credit/stripe?package_id=${id}`);
    let result = await stripe!.redirectToCheckout({
      sessionId: stripeSession.session_id,
    });
    if (result.error) {
      console.log("stripe error:", result.error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col">
            <h2 className={styles.pageTitle}>Package For Buy Credit</h2>
          </div>
        </div>
      </div>
      <div>
        <Container>
          <Row>
            {packageItems.length > 0 &&
              packageItems.map((item, itemIndex) => {
                return (
                  <Col key={itemIndex}>
                    <Card className={styles.myCard}>
                      <Card.Body>
                        <Card.Title className={styles.cardTitle}>
                          {item.name}
                        </Card.Title>
                        <Card.Text className={styles.cardText}>
                          {item.credit} credits
                        </Card.Text>
                        <Card.Text className={styles.cardPrice}>
                          HK $ {item.credit}
                        </Card.Text>
                        <div className={styles.buttonContainer}>
                          <Button
                            onClick={() => {
                              makePayment(item.id);
                            }}
                            className={styles.cardButton}
                          >
                            Buy Now
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </Container>
      </div>
    </div>
  );
}
