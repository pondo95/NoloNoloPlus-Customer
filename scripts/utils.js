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

export async function login(user, pass) {
  try {
    const credentials = {
      email: user,
      password: pass,
    };
    const res = await api.customers.login(credentials);
    config.setToken(res.headers.authorization, this.remember);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
