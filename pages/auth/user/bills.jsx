import { useState } from "react";
import { useEffect } from "react";
import * as utils from "../../../scripts/utils";
import SpinnerLoad from "../../../components/SpinnerLoad";
import { useRouter } from "next/router";
import styles from "../../../styles/Bills.module.css"
import { Container, ListGroup, Button, Row, Col } from "react-bootstrap";

function Bills() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
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
    if (await utils.check()) {
      setLoading(false);
    } else {
      router.push("/login");
    }
  }, []);

  return loading ? (
    <SpinnerLoad />
  ) : (
    <Container style={{ marginTop: "2rem" }}>
      <ListGroup style={{ marginBottom: "1rem" }}>
        {item.map((bill) => (
          <ListGroup.Item>
            <Row className={styles.row}>
              <Col>{bill.name}</Col>
              <Col>
                <Button className="remove-btn" variant="danger" size="sm">
                  &times;
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}
export default Bills;
