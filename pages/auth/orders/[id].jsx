import styles from "../../../styles/Order.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Row, Col, Button } from "react-bootstrap";
import { useState } from "react";

function Order() {
  
  const [startDate, setStartDate] = useState(new Date());
  const [fromDate, setFromDate] = useState(new Date());

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <table className={styles.table}>
            <tr className={styles.trTitle}>
              <th>ID Prodotto</th>
              <th>Cliente</th>
              <th>Indirizzo</th>
              <th>Total</th>
            </tr>
            <tr className={styles.tr}>
              <td>
                <span className={styles.id}>129837819237</span>
              </td>
              <td>
                <span className={styles.name}>John Doe</span>
              </td>
              <td>
                <span className={styles.address}>Elton st. 212-33 LA</span>
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
              <br/>
            From
              <DatePicker
                selected={fromDate}
                onChange={(date) => setFromDate(date)}
              />
            </Col>
        </div>
      </div>
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
    </div>
  );
}

export default Order;
