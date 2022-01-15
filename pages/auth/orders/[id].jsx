import styles from "../../../styles/Order.module.css";
import { Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import OrderCard from "../../../components/OrderCard";
import { useRouter } from "next/router";
import SpinnerLoad from "../../../components/SpinnerLoad";
import config from "../../../scripts/config";
import api from "../../../scripts/api";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import * as locales from "react-date-range/dist/locale";
import * as utils from "../../../scripts/utils";

function Order() {
  const [customer, setCustomer] = useState({});
  const router = useRouter();
  const id = router.query.id;
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(0);
  const [unit, setUnit] = useState();
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    if (!router.isReady) return;
    const fetchProduct = async () => {
      const x = await api.products.getSingle(id);
      setProduct(x.data);
      console.log(x.data);
      const tempUnit = await api.products.priceEstimation(id, {
        from: new Date().toJSON(),
        to: new Date().toJSON(),
      })
      setUnit(tempUnit);
      setPrice(tempUnit.data[0].finalPrice);
      setLoading(false);
    };
    fetchProduct();
    
  }, [router.isReady]);

  useEffect(async () => {
    const fetchData = async () => {
      console.log("qui");
      const _user = await config.user();
      console.log(_user);
      setCustomer(_user);
    };
    if (await utils.check()) {
      fetchData();
    } else {
      router.push("/login");
    }
  }, []);

  const handleOnChangeDate = async (item) => {
    const data = item.selection;
    console.log(data);
    setDate([data]);
    const tempUnit = await api.products.priceEstimation(id, {
      from: data.startDate.toJSON(),
      to: data.endDate.toJSON(),
    })
    setUnit(tempUnit);
    setPrice(tempUnit.data[0].finalPrice);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    let param = {
      startDate: date[0].startDate.toJSON(),
      endDate: date[0].endDate.toJSON(),
      prodId: id,
    };
    router.push(`/auth/orders/summary/${JSON.stringify(param)}`);
  };

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
                    <tbody>
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
                    </tbody>
                  </table>
                </div>
                <div className={styles.row}>
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => handleOnChangeDate(item)}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    ariaLabels={{
                      dateInput: {
                        selection: {
                          startDate: "start date input of selction ",
                          endDate: "end date input of selction ",
                        },
                      },
                      monthPicker: "month picker",
                      yearPicker: "year picker",
                      prevButton: "previous month button",
                      nextButton: "next month button",
                    }}
                    locale={locales["it"]}
                  />
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className={styles.right}>
                <div className={styles.wrapper}>
                  <h2 className={styles.title}>CART TOTAL</h2>
                  <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Subtotal:</b>A partire da:{price}
                  </div>
                  <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Discount:</b>$0.00
                  </div>
                  <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Total:</b>{price}
                  </div>
                  <button className={styles.button} onClick={handleConfirm}>
                    Conferma
                  </button>
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
