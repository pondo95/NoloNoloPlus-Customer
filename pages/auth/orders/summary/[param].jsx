import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import SpinnerLoad from "../../../../components/SpinnerLoad";
import api from "../../../../scripts/api";
import * as utils from "../../../../scripts/utils";

function Summary() {
  const router = useRouter();
  const param = JSON.parse(router.query.param);
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
      const x = await api.products.getSingle(param.id);
      setProduct(x.data);
      const tempUnit = await api.products.priceEstimation(param.id, {
        from: new Date(),
        to: new Date(),
      });
      setUnit(tempUnit);
      setLoading(false);
    };
    fetchProduct();
  }, [router.isReady]);

  return loading ? <SpinnerLoad /> : <p>test</p>;
}

export default Summary;
