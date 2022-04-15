import Cookies from "js-cookie";
import Api from "./api";

class Auth {
  async login() {}

  async getToken() {
    const accessToken = Cookies.get("accessToken");

    return accessToken;
  }

  async acquireTokenSilently() {
    const refreshToken = Cookies.get("refreshToken");

    if (!refreshToken) {
      return;
    }

    try {
      await Api.getToken({ refreshToken });
    } catch (e) {
      console.log("acquireTokenSilently Error:", e);
    }
  }
}

export default new Auth();
