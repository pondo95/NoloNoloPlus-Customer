import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import SpinnerLoad from "../../../../components/SpinnerLoad";
import api from "../../../../scripts/api";
import config from "../../../../scripts/config";
import * as utils from "../../../../scripts/utils";

function Summary() {
  const router = useRouter();
  const param = JSON.parse(router.query.param);
  const [customer, setCustomer] = useState();
  const [product, setProduct] = useState();
  const [unit, setUnit] = useState();
  const [loading, setLoading] = useState(true);
  console.log(param);

  useEffect(async () => {
    if (await utils.check()) {
      setLoading(false);
    } else {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    const fetchProduct = async () => {
      const x = await api.products.getSingle(param.prodId);
      setProduct(x.data);
      const tempUnit = await api.products.priceEstimation(param.prodId, {
        from: new Date().toJSON(),
        to: new Date().toJSON(),
      });
      console.log(tempUnit);
      const _user = await config.user();
      setCustomer(_user);
      setUnit(tempUnit);
      setLoading(false);
    };
    fetchProduct();
  }, [router.isReady]);

  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      const result = await api.rentals.post({
        customer: customer._id,
        unit: unit.data[0].unitID,
        priceEstimation: unit.data[0],
        startDate: param.startDate,
        prenotationDate: new Date().toJSON(),
        expectedEndDate: param.endDate,
        state: "pending"
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    
  };

  return loading ? (
    <SpinnerLoad />
  ) : (
    <button onClick={handleConfirm}>Conferma</button>
  );
}

export default Summary;
