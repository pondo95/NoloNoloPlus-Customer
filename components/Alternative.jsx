import styles from "../styles/Alternative.module.css";
import {
  Container,
  ListGroup,
  Button,
  Row,
  Col,
  Accordion,
  Card,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SpinnerLoad from "../components/SpinnerLoad";
import api from "../scripts/api";
import * as utils from "../scripts/utils";

function Alternative({ prodId }) {
  const [altProd, setAltProd] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(async () => {
    const prod = await api.products.getSingle(prodId);
    setAltProd(prod.data);
    setLoading(false);
    console.log(prod.data);
  }, []);

  return loading ? (
    <SpinnerLoad />
  ) : (
    <Accordion key={altProd._id}>
      <Accordion.Item eventKey={altProd._id}>
        <Accordion.Header>{altProd.name}</Accordion.Header>
        <Accordion.Body>
          <Card>
            <Card.Body>
              <Row>
                <Col>
                  <Card.Img
                    style={{ width: "200px" }}
                    src={api.toServerImageUrl(altProd.image)}
                  />
                </Col>
                <Col>
                  <Row>
                    <Col>
                      <Card.Text style={{ paddingRight: "10px" }}>
                        Categoria: {altProd.category}
                      </Card.Text>
                      <Card.Text style={{ paddingRight: "10px" }}>
                        Sottocategoria: {altProd.subcategory}
                      </Card.Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button
                        className={styles.btn}
                        variant="secondary"
                        onClick={() => router.push(`/product/${altProd._id}`)}
                      >
                        Vai alla pagina
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default Alternative;
