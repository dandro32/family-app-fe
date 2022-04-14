import axios, { AxiosInstance } from "axios";
import { CreateList, List } from "../models/List";
import Auth from "./auth";

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

  async getHeaders() {
    const token = await Auth.getToken();

    return { headers: { Authorization: `Bearer ${token}` } };
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
