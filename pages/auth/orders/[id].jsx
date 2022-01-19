import styles from "../../../styles/Order.module.css";
import { Container, ListGroup, Button, Row, Col } from "react-bootstrap";
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
  const [loading2, setLoading2] = useState(false);
  const [price, setPrice] = useState(0);
  const [unit, setUnit] = useState([]);
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
      const tempUnit = await api.products.priceEstimation(id, {
        from: new Date().toJSON(),
        to: new Date().toJSON(),
      });
      setUnit(tempUnit.data);
      setPrice(tempUnit.data[0].finalPrice);
      setLoading(false);
      setLoading2(false);
    };
    fetchProduct();
  }, [router.isReady]);

  useEffect(async () => {
    const fetchData = async () => {
      const _user = await config.user();
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
    setDate([data]);
    const stDate = new Date();
    const eDate = new Date();
    stDate.setTime(data.startDate.getTime() + 60 * 60 * 1000);
    eDate.setTime(data.endDate.getTime() + 60 * 60 * 1000);
    setLoading2(true);
    const tempUnit = await api.products.priceEstimation(id, {
      from: stDate.toJSON(),
      //from: data.startDate.getTime() + (60*60*1000).toJSON(),
      to: eDate.toJSON(),
      //to: data.endDate.getTime() + (60*60*1000).toJSON()
    });
    setUnit(tempUnit.data);
    setPrice(tempUnit.data[0].finalPrice);
    setLoading2(false);
  };

  const handleConfirm = (unitId) => {
    //e.preventDefault();
    const stDate = new Date();
    const eDate = new Date();
    stDate.setTime(date[0].startDate.getTime() + 60 * 60 * 1000);
    eDate.setTime(date[0].endDate.getTime() + 60 * 60 * 1000);
    utils.setOnStorage(stDate.toJSON(), "s");
    utils.setOnStorage(eDate.toJSON(), "e");
    utils.setOnStorage(id, "p");

    router.push(`/auth/orders/summary/${unitId}`);
  };

  return loading ? (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <SpinnerLoad />
    </div>
  ) : (
    <div className={styles.container}>
      <Row>
        <Col md={4}>
          <div>
            <OrderCard product={product} />
          </div>
        </Col>
        <Col md={8}>
          <Row>
            <Col>
              <div style={{ marginTop: "10px" }}>
                <h1 style={{ display: "flex", justifyContent: "center" }}>
                  Verifica disponibilità selezionando la data
                </h1>
                <div
                  className={styles.row}
                  style={{ display: "flex", justifyContent: "center" }}
                >
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
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          {loading2 && unit.length !== 0 ? (
            <SpinnerLoad />
          ) : (
            unit.map((x, index) => (
              <ListGroup key={index} style={{ marginBottom: "1rem" }}>
                <ListGroup.Item>
                  <Row>
                    <Col>
                    <h3>Prezzo base: {x.basePrice}</h3>
                    </Col>
                    <Col>
                    <h3>Prezzo finale: {x.finalPrice}</h3>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Questa unità applica i seguenti sconti:</Col>
                  </Row>
                  {x.modifiersList.map((mod, index) => {
                    return (
                      <Row key={mod.modifierID} className={styles.row}>
                        <Col className={styles.col}>
                          <b>{index + 1}</b> - {mod.longExplanation}
                        </Col>
                      </Row>
                    );
                  })}
                  <Row className={styles.row}>
                    <Col style={{display: "flex", justifyContent:"right"}} className={styles.col}>
                      <Button
                      className={styles.btn}
                      variant="secondary"
                        onClick={() => {
                          handleConfirm(x.unitID);
                        }}
                      >
                        Seleziona
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            ))
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Order;
