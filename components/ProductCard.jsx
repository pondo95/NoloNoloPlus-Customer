//import Image from "next/image";
import { Card } from "react-bootstrap";
import styles from "../styles/ProductCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";


function ProductCard(props) {
  console.log(props);
  return (
    <Card key={props.id} className={styles.card}>
      <img src={props.thumbnail} />
      <Card.Body >
        <Card.Header>Card Title</Card.Header>
        <Card.Text className={styles.cardText}>
          {props.description}
        </Card.Text>
      </Card.Body>
      <div className={styles.containerBuy}>
          <a href={`/product/${props.id}`}>
              <FontAwesomeIcon icon={faShoppingCart} size="2x" />
          </a>
        </div>
    </Card>      

  );
}



export default ProductCard;
