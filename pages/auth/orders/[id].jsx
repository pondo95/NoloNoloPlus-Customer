import styles from "../../../styles/Order.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import OrderCard from "../../../components/OrderCard";
import { useRouter } from "next/router";
import SpinnerLoad from "../../../components/SpinnerLoad";
import config from "../../../scripts/config";
import api from "../../../scripts/api";

function Order() {
  const [startDate, setStartDate] = useState(new Date());
  const [fromDate, setFromDate] = useState(new Date());
  const [customer, setCustomer] = useState({});
  const router = useRouter();
  const id = router.query.id;
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;
    const fetchProduct = async () => {
      const x = await api.products.getSingle(id);
      setProduct(x.data);
      console.log(x.data);
      setLoading(false);
    };
    fetchProduct();
  }, [router.isReady]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("qui");
      const _user = await config.user();
      console.log(_user);
      setCustomer(_user);
    };
    fetchData();
  }, []);

  return loading ? (
    <SpinnerLoad />
  ) : (
    <div className={styles.container}>
      <Row xs={1} md={2}>
        <Col md={4}>
          <div className={styles.left}>
            <OrderCard product={product} />
          </div>
        </Col>
        <Col md={8}>
          <Row>
            <Col md={8}>
              <div className={styles.center}>
                <div>
                  <table className={styles.table}>
                    <tr className={styles.trTitle}>
                      <th>ID Prodotto</th>
                      <th>Cliente</th>
                      <th>Indirizzo</th>
                      <th>Total</th>
                    </tr>
                    <tr className={styles.tr}>
                      <td>
                        <span className={styles.id}>{product._id}</span>
                      </td>
                      <td>
                        <span className={styles.name}>
                          {customer.firstname}
                        </span>
                      </td>
                      <td>
                        <span className={styles.address}>
                          Elton st. 212-33 LA
                        </span>
                      </td>
                      <td>
                        <span className={styles.total}>$79.80</span>
                      </td>
                    </tr>
                  </table>
                </div>
                <div className={styles.row}>
                  <Col>
                    Start
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                    <br />
                    From
                    <DatePicker
                      selected={fromDate}
                      onChange={(date) => setFromDate(date)}
                    />
                  </Col>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className={styles.right}>
                <div className={styles.wrapper}>
                  <h2 className={styles.title}>CART TOTAL</h2>
                  <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Subtotal:</b>$79.60
                  </div>
                  <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Discount:</b>$0.00
                  </div>
                  <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Total:</b>$79.60
                  </div>
                  <button className={styles.button}>Conferma</button>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Order;
