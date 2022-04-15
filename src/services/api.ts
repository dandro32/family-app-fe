import axios, { AxiosInstance } from "axios";
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
    const token = await Auth.getToken();

    return { headers: { Authorization: `Bearer ${token}` } };
  }

  private async handleError() {}

  async register(body: Credentials): Promise<ResponseSuccesStatus> {
    const { data } = await axios.post(`${API_BASE}/users`, body);

    return data;
  }

  async login(body: Credentials): Promise<UsernameResponse> {
    const { data } = await axios.post(`${API_BASE}/login`, body);

    return data;
  }

  async getToken(body: RefreshTokenPost): Promise<ResponseSuccesStatus> {
    const { data } = await axios.post(`${API_BASE}/token`, body);

    return data;
  }

  async getUsers(): Promise<UsernameResponse[]> {
    const headers = await this.getHeaders();
    const { data } = await axios.get(`${API_BASE}/token`, headers);

    return data;
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
