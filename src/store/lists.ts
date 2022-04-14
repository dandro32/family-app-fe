import { makeAutoObservable } from "mobx";
import { List } from "../models/List";
import Api from "../services/api";

class Lists {
  lists: List[] = [];
  newList = {
    title: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  fetchLists = async () => {
    this.lists = await Api.getLists();
  };

  addList = async () => {
    await Api.addList(this.newList);
  };
}

export default Lists;
