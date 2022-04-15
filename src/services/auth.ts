import Cookies from "js-cookie";
import Api from "./api";

class Auth {
  async login() {}

  getToken(): string | undefined {
    const accessToken = Cookies.get("accessToken");

    return accessToken;
  }

  getRefreshToken(): string | undefined {
    const refreshToken = Cookies.get("refreshToken");

    return refreshToken;
  }

  async acquireTokenSilently() {
    try {
      const refreshToken = this.getRefreshToken();

      if (!refreshToken) {
        throw new Error("No refresh token");
      }

      await Api.getToken({ refreshToken });
    } catch (err) {
      throw err;
    }
  }
}

export default new Auth();
