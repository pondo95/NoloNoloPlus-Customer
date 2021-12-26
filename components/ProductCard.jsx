//import Image from "next/image";
import Image from "react-bootstrap"
import Link from "next/link";
import { Card, Button } from "react-bootstrap";
import styles from "../styles/ProductCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function ProductCard(props) {
  console.log(props);
  return (
    <Card key={props.id} style={{ width: "18rem" }}>
      <img src={props.thumbnail} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          {props.description}
        </Card.Text>
        <div>
          <Link href={`/product/${props.id}`}>
            <div style={{ background: "black", width: "30%", height: "30%" }}>
              <FontAwesomeIcon icon={faShoppingCart} size="1x" />
            </div>
          </Link>
          <div>
            Acquista
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
