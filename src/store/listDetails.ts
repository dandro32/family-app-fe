import { makeAutoObservable } from "mobx";
import { List } from "../models/List";
import Api from "../services/api";
import listsStore from "./lists";

const lists = new listsStore();

const initialData: List = {
  _id: "",
  title: "",
  done: 0,
  tasks: [],
};

class ListDetails {
  item: List = initialData;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setTitle = (newTitle: string) => {
    this.item.title = newTitle;
  };

  setId = (_id: string) => {
    this.item._id = _id;
  };

  addNewList = async () => {
    try {
      this.isLoading = true;
      const _id = await Api.addList({ title: this.item.title });
      this.setId(_id);

      await lists.fetchLists();
      this.isLoading = false;
    } catch (e) {
      this.isLoading = false;
    }
  };

  getList = async () => {
    try {
      this.isLoading = true;
      const payload = await Api.getListById(this.item._id);

      this.item = payload;
      this.isLoading = false;
    } catch (e) {
      this.isLoading = false;
    }
  };

  clearList = () => {
    this.item = initialData;
    this.isLoading = false;
  };
}

export default ListDetails;
