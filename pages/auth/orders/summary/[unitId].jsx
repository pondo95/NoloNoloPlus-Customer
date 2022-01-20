import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "../../../../styles/Summary.module.css"
import SpinnerLoad from "../../../../components/SpinnerLoad";
import api from "../../../../scripts/api";
import config from "../../../../scripts/config";
import * as utils from "../../../../scripts/utils";
import { Button } from "react-bootstrap";

function Summary() {
  const router = useRouter();
  const unitId = router.query.unitId;
  const [customer, setCustomer] = useState();
  const [unit, setUnit] = useState();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState();
  let startDate = utils.getOnStorage("s");
  let endDate = utils.getOnStorage("e");
  let prodId = utils.getOnStorage("p");
  let today = new Date().toLocaleDateString();

  useEffect(async () => {
    if (await utils.check()) {
      return;
    } else {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    const fetchProduct = async () => {
      const prod = await api.products.getSingle(prodId);
      setProduct(prod.data);
      const tempUnit = await api.products.priceEstimation(prodId, {
        from: startDate,
        to: endDate,
      });
      const _user = await config.user();
      setCustomer(_user);
      setUnit(
        tempUnit.data.filter((doc) => {
          return doc.unitID == unitId;
        })
      );
      setLoading(false);
    };
    fetchProduct();
  }, [router.isReady]);

  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      const result = await api.rentals.post({
        customer: customer._id,
        unit: unit[0].unitID,
        priceEstimation: unit[0],
        startDate: startDate,
        prenotationDate: new Date().toJSON(),
        expectedEndDate: endDate,
        state: "pending",
      });
      alert("Ordine Creato")
      router.push(`/auth/user/orderlist`)
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <div style={{display: "flex", justifyContent: "center"}}>
      <SpinnerLoad />
    </div>
  ) : (
    <div>
      <section
        className="bg-white p-10 mt-10 rounded-lg shadow"
        style={{ maxWidth: "1000px", margin: "auto" }}
      >
        <article className="flex flex-col items-end justify-end px-5 lg:px-0 text-center">
          <h1 className="uppercase font-bold text-4xl mt-10">
            {customer.firstname} {customer.lastname}
          </h1>
          <p>
            {customer.address.city}-{customer.address.streetAddress}
          </p>
          <p>
            {customer.address.zipcode}-{customer.address.country}
          </p>
        </article>
        <article className="flex flex-col items-end px-5 justify-between lg:px-0 mt-10">
          <p> Data: {today}</p>
        </article>
        <section className="mt-10 px-5 lg:px-0">
          <table style={{ width: "100%" }}>
            <tbody>
              <tr className="text-left bg-gray-200 p-2 rounded shadow">
                <th style={{ width: "45%" }}>Prodotto</th>
                <th>Giorni</th>
                <th>Prezzo base</th>
                <th>Prezzo finale</th>
              </tr>
              <tr className="text-center">
                <td>{product.name}</td>
                <td>{unit[0].daysCount}</td>
                <td>{unit[0].basePrice}</td>
                <td>{unit[0].finalPrice}</td>
              </tr>
              <tr><td><p></p></td></tr>
              <tr className="text-center">
                <td>Data inizio Noleggio: {utils.convertDate(startDate)}</td>
              </tr>
              <tr className="text-center"> 
                <td>Data fine Noleggio: {utils.convertDate(endDate)}</td>
              </tr>
              <tr><td><p></p></td></tr>
              {unit[0].modifiersList.map((mod) => {
                return (
                  <tr key={mod.modifierID} className="text-center">
                    <td>
                      {mod.modifierID} - {mod.longExplanation}
                    </td>
                    <td>{mod.daysCount}</td>
                  </tr>
                );
              })}
              <tr><td><p></p></td></tr>
            </tbody>
          </table>
          <article className="flex justify-center mt-10">
            <h3 className="font-bold flex items-right">
              Total: <span className="text-4xl ml-5">{unit[0].finalPrice}</span>
            </h3>
          </article>
        </section>
        <div className="p-5 md:w-9/12 md:px-0">
          <h3 className="text-lg">Additional notes:</h3>
        </div>
        <section className="mt-10 px-5 lg:px-0">
          <Button className={styles.btn} variant="secondary"onClick={handleConfirm}>Conferma</Button>
        </section>
        <br />
      </section>
    </div>
  );
}

export default Summary;
