import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { RefreshTokenPost } from "../models/Auth";
import { CreateList, List } from "../models/List";
import { Credentials, UsernameResponse } from "../models/User";
import Auth from "./auth";

interface ResponseSuccesStatus {
  status: "OK";
}

const API_BASE = process.env.API_URL;

class Api {
  protected readonly axios: AxiosInstance;

  public constructor() {
    this.axios = axios.create({
      baseURL: API_BASE,
      headers: {
        "Content-Type": "application/json",
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

  async register(body: Credentials): Promise<ResponseSuccesStatus> {
    try {
      const { data } = await axios.post(`${API_BASE}/users`, body);

      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async login(body: Credentials): Promise<UsernameResponse> {
    try {
      const { data } = await axios.post(`${API_BASE}/login`, body);

      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getToken(body: RefreshTokenPost): Promise<ResponseSuccesStatus> {
    try {
      const { data } = await axios.post(`${API_BASE}/token`, body);

      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getUsers(): Promise<UsernameResponse[]> {
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
    const headers = await this.getHeaders();
    const { data } = await axios.get(`${API_BASE}/lists`, headers);

    return data;
  }

  async addList(body: CreateList) {
    const { data } = await axios.post(`${API_BASE}/lists`, body);
    return data;
  }
}

export default new Api();
