import { makeAutoObservable } from "mobx";
import { NewList } from "../models/List";
import Api from "../services/api";

class ListDetails {
  item: NewList = {
    _id: "",
    title: "",
    done: 0,
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
}

export default ListDetails;
