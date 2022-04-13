import axios from "axios";
import { List } from "../models/List";

const API_BASE = process.env.API_URL;

class Api {
  async getLists(): Promise<List[]> {
    const { data } = await axios.get(`${API_BASE}/lists`);

    return data;
  }

  async addList(title: string) {
    const { data } = await axios.post(`${API_BASE}/lists`, { title });
    return data;
  }
}

export default new Api();
