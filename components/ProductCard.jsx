//import Image from "next/image";
import Link from "next/link";
import { Card } from "react-bootstrap";
import styles from "../styles/ProductCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

/*

*/

/*
  <div className={styles.card}>
        <img className={styles.cardImg}src={props.thumbnail} alt="" />
        <div className={styles.cardBody}>
          <h2 className={styles.cardH2}>{this.props.title}</h2>
          <p className={styles.cardP}>
          {props.description}
          </p>
          <h5 className={styles.cardH5}>{props.id}</h5>
        </div>
      </div>
*/ 

function ProductCard(props) {
  console.log(props);
  return (
    <Card key={props.id} className={styles.card}>
      <img src={props.thumbnail} />
      <Card.Body >
        <Card.Header>Card Title</Card.Header>
        <Card.Text style={{height:"150px",overflowX : 'auto'}}>
          {props.description}
        </Card.Text>
      </Card.Body>
      <div className={styles.containerBuy}>
          <Link href={`/product/${props.id}`}>
              <FontAwesomeIcon icon={faShoppingCart} size="2x" />
          </Link>
        </div>
    </Card>      

  );
}



export default ProductCard;
