import { makeAutoObservable } from "mobx";
import { List } from "../models/List";
import Api from "../services/api";

class Lists {
  lists: List[] = [];
  listsAreLoading = false;
  listIsUploading = false;
  newList = {
    title: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  fetchLists = async () => {
    try {
      console.log("here");
      this.listsAreLoading = true;
      this.lists = await Api.getLists();
      this.listsAreLoading = false;
    } catch (e) {
      this.listsAreLoading = false;
    }
  };

  addList = async () => {
    try {
      this.listIsUploading = true;
      await Api.addList(this.newList);
      this.listIsUploading = true;
    } catch (e) {
      this.listIsUploading = false;
    }
  };
}

export default Lists;
