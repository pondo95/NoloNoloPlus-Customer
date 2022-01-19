import styles from "../styles/Carousel.module.css";
import { Carousel } from "react-bootstrap";
import api from "../scripts/api";

function Carosello() {
  const images = [
    api.toServerImageUrl("/image/product/yacht.jpeg"),
    api.toServerImageUrl("/image/product/auto.jpeg"),
    api.toServerImageUrl("/image/product/gioielli.jpeg"),
    api.toServerImageUrl("/image/product/orologi.jpeg"),
  ];

  return (
    <Carousel fade >
        {images.map((img, i) => (
          <Carousel.Item key={i}>
        <img
          className={`d-block w-100 ${styles.imageCarousel}`}
          src={img}
          alt="Immagine Carosello"
          />
      </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Carosello;
