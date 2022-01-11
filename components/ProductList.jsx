import { useState, useRef, useEffect } from "react";
import styles from "../styles/ProductList.module.css";
import "../styles/ProductList.module.css";
import ProductCard from "./ProductCard";
import InputGroup from "react-bootstrap/InputGroup";
import { DropdownButton, FormControl, Button } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import api from "../scripts/api";
import Spinner from "./SpinnerLoad";
import Pagination from "./Pagination";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState();
  const [paginator, setPaginator] = useState();
  const [searchText, setSearchText] = useState("");
  const [allProduct, setAllProduct] = useState([]);
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const mainRef = useRef(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [oldAllProduct, setOldAllProduct] = useState([]);
  const [filter, setFilter] = useState("Name");

  useEffect(() => {
    const fetchData = async () => {
      const x = await api.localPagination.fromApi(api.products.get);
      console.log(x);
      setOldAllProduct(x.nonFilteredDocs);
      console.log(oldAllProduct);
      setPaginator(x);
      setCurrentPage(1);
      setProducts(x.at(1));
      setAllProduct(x.nonFilteredDocs);
      delay(2000);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(searchText);
    if (searchText != "") {
      setIsEmpty(false);
      const results = allProduct.filter((prod) =>
        prod.name.toLowerCase().includes(searchText)
      );
      setAllProduct(results);
    } else {
      setIsEmpty(true);
      console.log(oldAllProduct);
      setAllProduct(oldAllProduct);
    }
  }, [searchText]);

  const handleChangeText = (e) => {
    e.preventDefault();
    console.log(products);
    setSearchText(e.target.value);
    setAllProduct(oldAllProduct);
  };

  const renderResult = () => {
    return products.map((product) => {
      const image = api.toServerImageUrl(product.image);
      return (
        <ProductCard
          key={product._id}
          id={product._id}
          name={product.name}
          thumbnail={image}
          description={product.description}
        />
      );
    });
  };

  const renderFilteredResult = () => {
    return allProduct.map((product) => {
      const image = api.toServerImageUrl(product.image);
      return (
        <ProductCard
          key={product._id}
          id={product._id}
          name={product.name}
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
      <h1 ref={mainRef} tabIndex="-1" className={styles.title}>
        THE BEST NOLO IN TOWN
      </h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
        in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit.
      </p>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <InputGroup className="mb-3">
            <style type="text/css">
            {`
              .btn-custom {
                background-color: #222;
                color: white;
              }
              .btn:focus {
                outline: none;
                box-shadow: none;
              }
              .btn:hover {
                color: white;
              }
              .textarea:focus{
                outline: none;
                box-shadow: none;
              }
            `}
            </style>
            <DropdownButton
              variant="custom"
              title={filter}
              id="input-group-dropdown-1"
            >
              <Dropdown.Item onClick={() => setFilter("Name")}>
                Name
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter("Category")}>
                Category
              </Dropdown.Item>
            </DropdownButton>
            <FormControl
              aria-label="Text input with dropdown button"
              type="text"
              value={searchText}
              onChange={handleChangeText}
              placeholder="Type here"
            />
          </InputGroup>

          {!isEmpty ? (
            <div className={styles.wrapper}>{renderFilteredResult()}</div>
          ) : (
            <div>
              <div className={styles.wrapper}>{renderResult()}</div>
              <Pagination
                total={paginator.totalPages}
                itemsPerPage={5}
                currentPage={currentPage}
                handleCurrentPage={(page) => handleCurrentPage(page)}
                handlePageClick={(page) => handlePageClick(page)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductList;
