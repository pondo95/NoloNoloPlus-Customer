import React, { useEffect, useState } from "react";
import api from "../../scripts/api.js";
import { Row, Col, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import SpinnerLoad from "../../components/SpinnerLoad";


function Product() {
  const router = useRouter();
  const id = router.query.id
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const addToCartHandler = () => {
    router.push(`/auth/orders/${id}`)
  };

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
            <Col style={{ textAlign: "right" }}>
              <a href={`/auth/orders/${id}`}>
                <Button id="buy" variant="primary" onClick={addToCartHandler}>
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
