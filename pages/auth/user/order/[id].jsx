import Document from "../../../../components/Document";
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
      setRental(_rentals.data.docs.filter((doc)=>{
        return doc._id == orderId
      })
      );
      console.log(_rentals);
      setLoading(false);
    };
    fetchData();
  }, [router.isReady]);
  
  useEffect(async () => {
    
    if (await utils.check()) {
      return
    } else {
      router.push("/login");
    }
  }, []);

  return loading ? (
    <SpinnerLoad />
  ) : (
    <Document rental={rental[0]} type={"Ordine"} />
  );
}

export default Order;
