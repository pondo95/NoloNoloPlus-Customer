import Image from "next/image";
import Link from "next/link";
import { Card, Button } from "react-bootstrap";
import styles from "../styles/ProductCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function ProductCard() {
  return (
    <Card style={{ width: "18rem" }}>
      <Image src="/img/pizza.png" alt="" width="300" height="300" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <div>
          <Link href="/cart">
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
