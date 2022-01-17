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
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const mainRef = useRef(null);
  const [category, setCategory] = useState([]);
  const [filter, setFilter] = useState("Tutti");

  useEffect(() => {
    const fetchData = async () => {
      const x = await api.localPagination.fromApi(api.products.get);
      console.log(x);
      setPaginator(x);
      setCurrentPage(1);
      setProducts(x.at(1));
      setCategory(Array.from(new Set(x.getAllDocs().map((p) => p.category))));
      delay(2000);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      const results = filterProd();
      paginator.setFiltered(results);
      setPaginator(paginator);
      setCurrentPage(1);
      setProducts(paginator.at(1));
    }
  }, [searchText]);

  function filterProd() {
    let results = paginator
      .getAllDocs()
      .filter((prod) =>
        prod.name.toLowerCase().includes(searchText.toLowerCase())
      );
      if(filter!="Tutti")
    results = results.filter((prod) => {
      console.log(prod.category,filter);
      return prod.category==filter;
    });
    return results;
  }

  const handleChangeText = (e) => {
    e.preventDefault();
    console.log(products);
    setSearchText(e.target.value);
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
      <InputGroup className={styles.inputGroup}>
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
              <Dropdown.Item onClick={()=> setFilter("Tutti")}>
                    Tutti
                  </Dropdown.Item>
              {category.map((cat) => {
                return (
                  <Dropdown.Item key={cat}onClick={()=> setFilter(cat)}>
                    {cat}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
            <FormControl
              aria-label="Text input with dropdown button"
              type="text"
              value={searchText}
              onChange={handleChangeText}
              placeholder="Type here"
            />
          </InputGroup>
      {loading ? (
        <Spinner />
      ) : (
        <div>
        
          
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
        </div>
      )}
    </div>
  );
}

export default ProductList;
