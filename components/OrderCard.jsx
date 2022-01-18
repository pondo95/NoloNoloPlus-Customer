import { Card } from "react-bootstrap";
import styles from "../styles/OrderCard.module.css";
import api from "../scripts/api";

function OrderCard({ product }) {
  const renderProduct = () => {
    const image = api.toServerImageUrl(product.image);

    return (
      <Card key={product._id} className={styles.card}>
        <img className={styles.cardImg} src={image} alt={product.name}/>
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
    <div style={{ display: "flex", justifyContent: "center" }}>
      {renderProduct()}
    </div>
  );
}

export default OrderCard;
