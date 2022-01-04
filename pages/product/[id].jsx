import React, { useEffect, useState } from "react";
import api from "../../scripts/api.js";
import { Row, Col, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import Image from "next/image";
import SpinnerLoad from "../../components/SpinnerLoad";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Product() {
  const router = useRouter();
  const id = router.query.id
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [fromDate, setFromDate] = useState(new Date());

  useEffect(() => {
    if (!router.isReady) return;
    const fetchProduct = async () => {
      const x = await api.products.getSingle(id);
      setProduct(x.data);
      console.log(x.data);
      setLoading(false);
    };
    fetchProduct();
  }, [router.isReady]);

  const addToCartHandler = (productId) => {};

  const renderProduct = () => {
    const image = api.toServerImageUrl(product.image);

    return (
      <Row className="item">
        <Col sm={6}>
          <img style={{ width: "100%" }} src={image} alt="immagine" />
        </Col>
        <Col className="info">
          <h2>{product.name}</h2>
          <br />
          <br />
          <p>{product.description}</p>
          <Row className="buttonRow">
            <Col>
            Start
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <br/>
            From
              <DatePicker
                selected={fromDate}
                onChange={(date) => setFromDate(date)}
              />
            </Col>
            <Col style={{ textAlign: "right" }}>
              <p>Price: 30$</p>
              <a href={`/auth/orders/${id}`}>
                <Button id="buy" variant="primary">
                  Buy Now
                </Button>
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };

  return loading ? (
    <SpinnerLoad />
  ) : (
    <div
      className="productPage"
      style={{ width: "100%", padding: "3rem 4rem" }}
    >
      {renderProduct()}
    </div>
  );
}

export default Product;
