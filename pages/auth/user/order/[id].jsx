import { useState, useEffect } from "react";
import SpinnerLoad from "../../../../components/SpinnerLoad";
import config from "../../../../scripts/config";
import api from "../../../../scripts/api";
import { useRouter } from "next/router";
import * as utils from "../../../../scripts/utils";

function Order() {
  const router = useRouter();
  const orderId = router.query.id;
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [rental, setRental] = useState();

  useEffect(() => {
    if (!router.isReady) return;
    const fetchData = async () => {
      const _user = await config.user();
      setUser(_user);
      //const _rentals = await api.localPagination.fromApi(api.customers.getRentals(_user._id));
      const _rentals = await api.customers.getRentals(_user._id, {
        limit: 0,
        populate: true,
      });
      console.log(orderId);
      setRental(
        _rentals.data.docs.filter((doc) => {
          return doc._id == orderId;
        })
      );
      console.log(_rentals);
      setLoading(false);
    };
    fetchData();
  }, [router.isReady]);

  useEffect(async () => {
    if (await utils.check()) {
      return;
    } else {
      router.push("/login");
    }
  }, []);

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
            Dettagli dell&#39;ordine
          </h1>
          <p>Ordine: {rental[0]._id}</p>
        </article>
        <article className="flex flex-col items-end justify-end px-5 lg:px-0 text-center">
          <h1 className="uppercase font-bold text-4xl mt-10">
            {rental[0].customer.firstname} {rental[0].customer.lastname}
          </h1>
          <p>
            {rental[0].customer.address.city}-{rental[0].customer.address.streetAddress}
          </p>
          <p>
            {rental[0].customer.address.zipcode}-{rental[0].customer.address.country}
          </p>
        </article>
        <article className="flex flex-col items-end px-5 justify-between lg:px-0 mt-10">
          <p> Data: {utils.convertDate(rental[0].prenotationDate)}</p>
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
                <td>{rental[0].unit.name}</td>
                <td>{rental[0].priceEstimation.daysCount}</td>
                <td>{rental[0].priceEstimation.basePrice}</td>
                <td>{rental[0].priceEstimation.finalPrice}</td>
              </tr>
              <tr>
                <td>
                  <p></p>
                </td>
              </tr>
              <tr className="text-center">
                <td>Data inizio Noleggio: {utils.convertDate(rental[0].startDate)}</td>
              </tr>
              <tr className="text-center">
                <td>Data fine Noleggio: {utils.convertDate(rental[0].expectedEndDate)}</td>
              </tr>
              <tr>
                <td>
                  <p></p>
                </td>
              </tr>
              {rental[0].priceEstimation.modifiersList.map((mod,index) => {
                console.log(mod);
                return (
                  <tr key={mod.modifierID} className="text-center">
                    <td>
                    <b>{index+1}</b> - {mod.longExplanation}
                    </td>
                    <td>{mod.daysCount}</td>
                  </tr>
                );
              })}
              <tr>
                <td>
                  <p></p>
                </td>
              </tr>
            </tbody>
          </table>
          <article className="flex justify-center mt-10">
            <h3 className="font-bold flex items-right">
              Total: <span className="text-4xl ml-5">{rental[0].priceEstimation.finalPrice}</span>
            </h3>
          </article>
        </section>
        <div className="p-5 md:w-9/12 md:px-0">
          <h3 className="text-lg">Additional notes:</h3>
        </div>
      </section>
    </div>
  );
}

export default Order;
