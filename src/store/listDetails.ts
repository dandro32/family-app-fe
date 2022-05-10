import { makeAutoObservable } from "mobx";
import { List } from "../models/List";
import Api from "../services/api";
import { NotificationType } from "./notifications";

const initialData: List = {
  _id: "",
  title: "",
  done: 0,
  tasks: [],
};

class ListDetails {
  item: List = initialData;
  isLoading = false;
  notificationStore: any = "";

  constructor(notificationStore: any) {
    // TODO: handle any
    this.notificationStore = notificationStore;
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
      this.notificationStore.setNotification(
        "List was succesfully added",
        NotificationType.success
      );

      this.isLoading = false;
    } catch (e) {
      this.notificationStore.setNotification("Could not added list");
      this.isLoading = false;
    }
  };

  editList = async () => {
    try {
      this.isLoading = true;
      await Api.editList(this.item);
      this.notificationStore.setNotification(
        "List was succesfully edited",
        NotificationType.success
      );

      this.isLoading = false;
    } catch (e) {
      this.isLoading = false;
      this.notificationStore.setNotification("Could not edit list");
    }
  };

  getList = async () => {
    try {
      this.isLoading = true;
      const payload = await Api.getListById(this.item._id);

      this.item = payload;
      this.isLoading = false;
    } catch (e) {
      this.notificationStore.setNotification("Could not get proper list");
      this.isLoading = false;
    }
  };

  clearList = () => {
    this.item = initialData;
    this.isLoading = false;
  };
}

export default ListDetails;
