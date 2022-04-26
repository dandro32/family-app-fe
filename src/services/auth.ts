import Cookies from "js-cookie";
import Api from "./api";

interface TokenProps {
  accessToken: string;
  refreshToken?: string;
}

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
      Cookies.set(tokenNames.refreshToken, refreshToken);
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
