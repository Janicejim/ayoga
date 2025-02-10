import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../redux/store";
import { useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { getPackageInfo } from "../redux/packages/thunks";
import styles from "../css/Package.module.css";
import { loadStripe } from "@stripe/stripe-js";
import { fetchStripe } from "../api/package";
export default function PackagesPage() {
  const dispatch = useDispatch();
  const { packageItems } = useSelector((state: IRootState) => state.packages);

  useEffect(() => {
    const result = async () => {
      dispatch(getPackageInfo());
    };
    result();
  }, [dispatch]);

  const makePayment = async (id: number) => {
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_API_KEY!);

    let res = await fetchStripe(id);
    let stripeSession = await res.json();
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
            {packageItems &&
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
