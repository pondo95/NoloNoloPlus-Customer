import { useState } from "react";
import { useEffect } from "react";
import * as utils from "../../../scripts/utils";
import SpinnerLoad from "../../../components/SpinnerLoad";
import api from "../../../scripts/api";
import config from "../../../scripts/config";
import { useRouter } from "next/router";
import styles from "../../../styles/OrderList.module.css";
import { Container, ListGroup, Button, Row, Col } from "react-bootstrap";

function OrderList() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [user, setUser] = useState();
  const [rentals, setRentals] = useState();
  const item = [
    {
      id: 1,
      name: "Denis",
      email: "denis@denis.it",
    },
    {
      id: 2,
      name: "Matteo",
      email: "matteo@matteo.it",
    },
  ];

  useEffect(async () => {
    const fetchData = async () => {
      const _user = await config.user();
      setUser(_user);
      //const _rentals = await api.localPagination.fromApi(api.customers.getRentals(_user._id));
      const _rentals = await api.customers.getRentals(_user._id, {
        limit: 0,
        populate: true,
      });
      setRentals(_rentals.data.docs);
      console.log(_rentals);
      setLoading(false);
    };
    if (await utils.check()) {
      fetchData();
    } else {
      router.push("/login");
    }
  }, []);

  return loading ? (
    <SpinnerLoad />
  ) : (
    <Container className={styles.container}>
      {rentals.map((bill) => (
        <ListGroup key={bill._id} style={{ marginBottom: "1rem" }}>
          <ListGroup.Item>
            <Row>
              <Col>
                <h3>Prezzo:</h3>
              </Col>
              <Col>
                <h3>Stato:</h3>
              </Col>
              <Col>
                <h3>Inizio:</h3>
              </Col>
              <Col>
                <h3>Fine:</h3>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row className={styles.row}>
              <Col className={styles.col}>
                {bill.priceEstimation.finalPrice}€
              </Col>
              <Col className={styles.col}>{bill.state}</Col>
              <Col className={styles.col}>
                {bill.startDate.substring(0, 10)}
              </Col>
              <Col className={styles.col}>
                {bill.expectedEndDate.substring(0, 10)}
              </Col>
            </Row>
            <Row>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <h3>ID: {bill._id}</h3>
              </div>
              <div className={styles.rowButton}>
                <Button
                  className={styles.btn}
                  variant="secondary"
                  size="md"
                  onClick={() =>
                    router.push(`/auth/user/order/${bill._id}`)
                  }
                >
                  VIsualizza Ordine
                </Button>
                <Button
                  className={styles.btn}
                  variant="secondary"
                  size="md"
                  disabled={bill.state != "close"}
                >
                  Visualizza Fattura
                </Button>
              </div>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      ))}
    </Container>
  );
}
export default OrderList;
