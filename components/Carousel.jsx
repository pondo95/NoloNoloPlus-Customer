import styles from "../styles/Carousel.module.css";
import { Carousel } from "react-bootstrap";

function Carosello() {
  const images = [
    "../img/yacht.jpeg",
    "../img/auto.jpeg",
    "../img/orologi.jpeg",
    "../img/gioielli.jpeg",
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
        <Carousel.Caption>
          <h3>Vogliamo i tuoi soldi</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Carosello;
