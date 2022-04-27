import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { TokenProps } from "../models/Auth";
import { User } from "../models/User";

import Api from "./api";

const tokenNames: Record<string, string> = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
};

class Auth {
  async login() {}

  saveAuthTokens({ accessToken, refreshToken = "" }: TokenProps): void {
    if (accessToken) {
      Cookies.set(tokenNames.accessToken, accessToken);
    }

    if (refreshToken) {
      Cookies.set(tokenNames.refreshToken, refreshToken, { expires: 365 });
    }
  }

  destroyTokens(): void {
    Cookies.remove(tokenNames.accessToken);
    Cookies.remove(tokenNames.refreshToken);
  }

  getToken(): string | undefined {
    const accessToken = Cookies.get(tokenNames.accessToken);

    return accessToken;
  }

  getRefreshToken(): string | undefined {
    const refreshToken = Cookies.get(tokenNames.refreshToken);

    return refreshToken;
  }

  async acquireTokenSilently(): Promise<User> {
    try {
      const refreshToken = this.getRefreshToken();

      if (!refreshToken) {
        throw new Error("No refresh token");
      }

      const decodedToken: User = jwt_decode(refreshToken);

      if (!decodedToken?.username) {
        throw new Error("Invalid refresh token");
      }

      const data = await Api.getToken({ refreshToken });
      this.saveAuthTokens(data);

      return { username: decodedToken.username };
    } catch (err) {
      console.log(err);
      // window.location.href = "/login";
      throw err;
    }
  }
}

export default new Auth();
