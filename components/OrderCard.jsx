import { Card } from "react-bootstrap";
import styles from "../styles/OrderCard.module.css";
import api from "../scripts/api";

function OrderCard({ product }) {
  const renderProduct = () => {
    const image = api.toServerImageUrl(product.image);

    return (
      <Card key={product._id} className={styles.card}>
        <img className={styles.cardImg} src={image} />
        <Card.Body>
          <Card.Header>{product.name}</Card.Header>
          <Card.Text className={styles.cardText}>
            {product.description}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div
      className="productPage"
      style={{ width: "100%", padding: "3rem 4rem" }}
    >
      {renderProduct()}
    </div>
  );
}

export default OrderCard;
