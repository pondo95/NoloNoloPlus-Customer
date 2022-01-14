import api from "./api";
import config from "./config";

export async function check() {
  try {
    const x = await config.loggedIn();
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

export async function createCustomer(customer)
{
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
    config.setToken(res.headers.authorization, remember);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
