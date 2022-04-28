import { makeAutoObservable } from "mobx";
import { NewList } from "../models/List";

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

  async setTitle(newTitle: string) {
    this.item.title = newTitle;
  }

  async setId(_id: string) {
    console.log(this.item);
    this.item._id = _id;
  }
}

export default ListDetails;
