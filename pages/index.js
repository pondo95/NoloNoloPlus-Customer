import Carousel from "../components/Carousel";
import ProductList from "../components/ProductList";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <div>
      <Carousel/>
      <ProductList/>
    </div>
  );
}
