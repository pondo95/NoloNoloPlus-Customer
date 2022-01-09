import Carousel from "../components/Carousel";
import ProductList from "../components/ProductList";
import styles from "../styles/Home.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Carousel/>
      <ProductList/>
    </div>
  );
}
