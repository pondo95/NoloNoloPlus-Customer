// Table from react-bootstrap
import { Table } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import * as utils from "../../../scripts/utils";
import SpinnerLoad from "../../../components/SpinnerLoad";
import { useRouter } from "next/router";

function OrderList() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const item = [
    {
      id: 1,
      name: "Denis",
      email: "denis@denis.it",
    },
    {
      id: 2,
      name: "Matteo",
      email: "matteo@matteo.it",
    },
  ];
  useEffect(async () => {
    if (await utils.check()) {
      setLoading(false);
    } else {
      router.push("/login");
    }
  }, []);

  return loading ? (
    <SpinnerLoad />
  ) : (
    <Table bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {item.map((order) => {
          return (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.name}</td>
              <td>{order.email}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default OrderList;
