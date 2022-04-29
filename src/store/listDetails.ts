import { makeAutoObservable } from "mobx";
import { List } from "../models/List";
import Api from "../services/api";

class ListDetails {
  item: List = {
    _id: "",
    title: "",
    done: 0,
    tasks: [],
  };
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
}

export default ListDetails;
