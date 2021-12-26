import { useEffect } from "react";
import { useState } from "react";
import styles from "../styles/ProductList.module.css";
import ProductCard from "./ProductCard";
import api from "../scripts/api";
import Spinner from "./SpinnerLoad";
import Pagination from "./Pagination";

function ProductList() {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState();
  const [paginator, setPaginator] = useState();
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  useEffect(() => {
    const fetchData = async () => {
      const x = await api.localPagination.fromApi(api.products.get);
      setPaginator(x);
      const productData = paginator.at(1);
      await setCurrentPage(1)
      await setProducts(productData);
      await delay(2000);
      setLoading(false);
    };
    fetchData();
  }, []);

  const renderResult = () => {
    return products.map((product) => {
      const image = api.toServerImageUrl(product.image);
      console.log(product._id);
      return (
        <ProductCard
          id={product._id}
          thumbnail={image}
          description={product.description}
        />

      );
    });
  };

  const handlePageClick = (n) => {
    setProducts(paginator.at(n))
  }

  return (
  <div className={styles.container}>
      <h1 className={styles.title}>THE BEST NOLO IN TOWN</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
        in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit.
      </p>
    { loading ? (<Spinner />) : (
    <div className={styles.wrapper}>
      {renderResult()}
      <Pagination
                    total={paginator.totalPages}
                    itemsPerPage={5}
                    currentPage={currentPage}
                    handlePageClick={(page) => handlePageClick(page)}
      />)
    </div>
      )}
  </div>
  )
}
  


export default ProductList;
