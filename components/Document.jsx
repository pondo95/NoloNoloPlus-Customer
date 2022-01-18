function Document({ rental, type }) {
  return (
    <section className="bg-white p-10 mt-10 rounded-lg shadow">
      <article className="flex flex-col items-end justify-end px-5 lg:px-0 text-center">
        <h1>{type}:</h1>
        <h1 className="uppercase font-bold text-4xl mt-10">
          {rental.customer.firstname} {rental.customer.lastname}
        </h1>
        <p>
          {rental.customer.address.city}-{rental.customer.address.streetAddress}
        </p>
        <p>
          {rental.customer.address.zipcode}-{rental.customer.address.country}
        </p>
      </article>
      <article className="flex flex-col items-end px-5 justify-between lg:px-0 mt-10">
        <p>Invoice Number: {rental._id}</p>
        <p>Invoice Date: {rental.prenotationDate}</p>
      </article>
      <section className="mt-10 px-5 lg:px-0">
        <table style={{ width: "100%" }}>
          <tbody>
            <tr className="text-left bg-gray-200 p-2 rounded shadow">
              <th style={{ width: "50%" }}>Item Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Amount</th>
            </tr>
            <tr>
              <td>Jack</td>
              <td>{rental.priceEstimation.daysCount}</td>
              <td>{rental.priceEstimation.pricePerDay}</td>
              <td>{rental.priceEstimation.finalPrice}</td>
            </tr>
          </tbody>
        </table>

        <article className="flex items-end justify-end px-5 mt-10">
          <h3 className="font-bold flex items-center">
            Total:{" "}
            <span className="text-4xl ml-5">
              {rental.priceEstimation.finalPrice}
            </span>
          </h3>
        </article>
      </section>
      <div className="p-5 md:w-9/12 md:px-0">
        <h3 className="text-lg">Additional notes:</h3>
        <p>Note</p>
      </div>
      <footer className="px-5 mt-10 lg:px-0 border-t border-gray-300 pt-5 pb-10">
        <ul className="flex items-center justify-center flex-wrap">
          <li className="font-bold mx-2">
            {rental.employee.firstname}:{" "}
            <span className="font-light">address</span>
          </li>
          <li className="font-bold mx-2">
            Email:{" "}
            <span className="font-light">
              {rental.employee.loginInfo.email}
            </span>
          </li>
          <li className="font-bold mx-2">
            Website: <span className="font-light">details</span>
          </li>
          <li className="font-bold mx-2">
            Bank: <span className="font-light">details</span>
          </li>
          <li className="font-bold mx-2">
            Account Number: <span className="font-light">details</span>
          </li>
          <li className="font-bold mx-2">
            Account Holder:{" "}
            <span className="font-light">{rental.employee.lastname}</span>
          </li>
        </ul>
      </footer>
    </section>
  );
}

export default Document;
