import { makeAutoObservable } from "mobx";
import { List } from "../models/List";
import Api from "../services/api";

class Lists {
  lists: List[] = [];
  listsAreLoading = false;
  notificationStore: any;

  constructor(notificationStore: any) {
    this.notificationStore = notificationStore;
    makeAutoObservable(this);
  }

  fetchLists = async () => {
    try {
      this.listsAreLoading = true;
      this.lists = await Api.getLists();
      this.listsAreLoading = false;
    } catch (e) {
      this.notificationStore.setNotification(
        "Could not fetch list for this user"
      );
      this.listsAreLoading = false;
    }
  };
}

export default Lists;
