import { makeAutoObservable } from "mobx";
import { List } from "../models/List";
import Api from "../services/api";

class Lists {
  lists: List[] = [];
  listsAreLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchLists = async () => {
    try {
      this.listsAreLoading = true;
      this.lists = await Api.getLists();
      this.listsAreLoading = false;
    } catch (e) {
      this.listsAreLoading = false;
    }
  };
}

export default Lists;
