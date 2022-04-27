import axios, { AxiosError, AxiosInstance } from "axios";
import { RefreshTokenPost, TokenProps } from "../models/Auth";
import { CreateList, List } from "../models/List";
import { Credentials, User } from "../models/User";
import Auth from "./auth";

interface ResponseSuccesStatus {
  status: "OK";
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

class Api {
  protected readonly axios: AxiosInstance;

  public constructor() {
    this.axios = axios.create({
      baseURL: API_BASE,
      headers: {
        "Content-Type": "application/json",
        withCredentials: true,
      },
    });
  }

  private async getHeaders() {
    const token = Auth.getToken();

    return { headers: { Authorization: `Bearer ${token}` } };
  }

  private async handle401() {
    try {
      const token = Auth.getRefreshToken();

      if (token) {
        await Auth.acquireTokenSilently();
      } else {
        window.location.href = "/login";
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  private async handleError(err: AxiosError) {
    if (err?.message?.includes("401")) {
      return this.handle401();
    }

    console.log(err);
    throw err;
  }

  async register(body: Credentials): Promise<User> {
    try {
      const { data } = await axios.post(`${API_BASE}/users`, body);
      Auth.saveAuthTokens(data);

      return { username: data.username };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async login(body: Credentials): Promise<User> {
    try {
      const { data } = await axios.post(`${API_BASE}/login`, body);
      Auth.saveAuthTokens(data);

      return { username: data.username };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async loginSilently(): Promise<User> {
    try {
      const me = await Auth.acquireTokenSilently();

      return me;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async logout(username: string): Promise<void> {
    try {
      const headers = await this.getHeaders();

      await axios.delete(`${API_BASE}/logout/${username}`, headers);
      Auth.destroyTokens();
      window.location.href = "/login";
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getToken(body: RefreshTokenPost): Promise<TokenProps> {
    try {
      const { data } = await axios.post(`${API_BASE}/token`, body);
      Auth.saveAuthTokens(data);

      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      const headers = await this.getHeaders();
      const { data } = await axios.get(`${API_BASE}/token`, headers);

      return data;
    } catch (err) {
      this.handleError(err as AxiosError);

      throw err;
    }
  }

  async getLists(): Promise<List[]> {
    try {
      const headers = await this.getHeaders();
      const { data } = await axios.get(`${API_BASE}/lists`, headers);

      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async addList(body: CreateList) {
    const { data } = await axios.post(`${API_BASE}/lists`, body);
    return data;
  }
}

export default new Api();
