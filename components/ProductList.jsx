import { useState, useRef, useEffect } from "react";
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
  const mainRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const x = await api.localPagination.fromApi(api.products.get);
      setPaginator(x);
      setCurrentPage(1);
      setProducts(x.at(1));
      delay(2000);
      setLoading(false);
    };
    fetchData();
  }, []);

  const renderResult = () => {
    return products.map((product) => {
      const image = api.toServerImageUrl(product.image);
      return (
        <ProductCard
          key={product._id}
          id={product._id}
          thumbnail={image}
          description={product.description}
        />
      );
    });
  };

  const handlePageClick = (n) => {
    handleCurrentPage(n);
    setProducts(paginator.at(n));
    mainRef.current.focus();
  };

  const handleCurrentPage = (n) => {
    setCurrentPage(n);
  };

  return (
    <div autoFocus className={styles.container}>
      <h1 ref={mainRef} tabIndex="-1" className={styles.title}>THE BEST NOLO IN TOWN</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
        in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit.
      </p>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className={styles.wrapper}>{renderResult()}</div>
          <div>
            <Pagination
              total={paginator.totalPages}
              itemsPerPage={5}
              currentPage={currentPage}
              handleCurrentPage={(page) => handleCurrentPage(page)}
              handlePageClick={(page) => handlePageClick(page)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
