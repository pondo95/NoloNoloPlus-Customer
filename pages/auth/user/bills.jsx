import { useState } from "react";
import { useEffect } from "react";
import * as utils from "../../../scripts/utils";
import SpinnerLoad from "../../../components/SpinnerLoad";
import { useRouter } from "next/router";

function Bills() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(async () => {
    if (await utils.check()) {
      setLoading(false);
    } else {
      router.push("/login");
    }
  }, []);

  return loading ? <SpinnerLoad /> : <p>Bills</p>;
}
export default Bills;
