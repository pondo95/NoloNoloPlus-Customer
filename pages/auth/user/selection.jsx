import InfoCard from "../../../components/InfoCard";
import styles from "../../../styles/Selection.module.css";
import { faUserCircle, faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import * as utils from "../../../scripts/utils";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import SpinnerLoad from "../../../components/SpinnerLoad";

function Selection() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(async () => {
    if (await utils.check()) {
      setLoading(false);
    } else {
      router.push("/login");
    }
  }, []);

  const selection = [
    {
      title: "Ordini",
      icon: faFileInvoice,
      path: "orderlist",
    },
    /*
    {
      title: "Fatture",
      icon: faFileInvoice,
      path: "bills",
    },*/
  ];

  const renderCard = () => {
    return selection.map((card, index) => {
      return (
        <InfoCard
          key={index}
          icon={card.icon}
          title={card.title}
          id={index}
          path={card.path}
        />
      );
    });
  };

  return loading ? (
    <SpinnerLoad />
  ) : (
    <div className={styles.wrapper}>{renderCard()}</div>
  );
}

export default Selection;
