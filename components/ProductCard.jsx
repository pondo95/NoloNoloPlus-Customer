//import Image from "next/image";
import { Card } from "react-bootstrap";
import Link from "next/link";
import { Button } from "react-bootstrap";
import styles from "../styles/ProductCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

function ProductCard(props) {
  //console.log(props);
  const router = useRouter();

  const handlePurchase = ()=>{
    router.push(`/product/${props.id}`);
  }

  return (
    <Card key={props.id} className={styles.card}>
      <img className={styles.cardImg} src={props.thumbnail} alt={props.name} />
      <Card.Body>
        <Card.Header>{props.name}</Card.Header>
        <Card.Text className={styles.cardText}>{props.description}</Card.Text>
      </Card.Body>
      <Button className={styles.containerBuy} variant="secondary" onClick={handlePurchase}>
          <FontAwesomeIcon style={{marginTop: '6px'}}icon={faShoppingCart} size="2x" />
          <p style={{paddingLeft: '30px', marginTop: '10px'}}>Procedi con il Noleggio</p>
      </Button>
    </Card>
  );
}

export default ProductCard;
