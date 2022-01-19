import api from "./api";
import config from "./config";

export async function check() {
  try {
    const x = await config.loggedInCustomer();
    return x;
  } catch (error) {
    console.log(error);
  }
}

export async function priceEstimation(productId, startDate, endDate) {
  return api.products.priceEstimation(productId, {
    from: startDate,
    to: endDate,
  });
}

export async function createCustomer(customer) {
  try {
    const res = await api.customers.post(customer);
    console.log(res);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function login(user, pass, remember) {
  try {
    const credentials = {
      email: user,
      password: pass,
    };
    const res = await api.customers.login(credentials);
    config.setTokenCustomer(res.headers.authorization, remember);
    console.log("qui");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function setOnStorage(item, type) {
  if (type == "s") {
    sessionStorage.setItem("startDate", item);
  } else if (type == "e") {
    sessionStorage.setItem("endDate", item);
  } else if (type == "p") {
    sessionStorage.setItem("prodId", item);
  } else {
    console.log("parametri sbagliati");
  }
}

export function getOnStorage(type) {
  if (type == "s") {
    return sessionStorage.getItem("startDate");
  } else if (type == "e") {
    return sessionStorage.getItem("endDate");
  } else if (type == "p") {
    return sessionStorage.getItem("prodId");
  } else {
    return null;
  }
}

export function convertDate(data){
  let date = new Date(data);
  return date.toLocaleDateString();
}
