import React, { useEffect, useState } from "react";
import api from "../../scripts/api.js";
import { Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import Image from "next/image";
import SpinnerLoad from "../../components/SpinnerLoad";

function Product() {
  const router = useRouter();
  const {id} = useRouter().query;
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;
    const fetchProduct = async () => {
      const x = await api.products.getSingle(router.query.id);
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
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>{product.name}</h1>
        </div>

        <br />
        <Row gutter={[16, 16]}>
          <Col lg={12} xs={24}>
            <img src={image} />
          </Col>
          <Col lg={12} xs={24}></Col>
        </Row>
      </div>
    );
  };

  return loading ? (
    <SpinnerLoad />
  ) : (
    <div className="productPage" style={{ width: "100%", padding: "3rem 4rem" }}>
      {renderProduct()}
    </div>
  );
}

export default Product;
