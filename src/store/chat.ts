import { makeAutoObservable } from "mobx";
import { ChatMessage } from "../models/Chat";
import { List } from "../models/List";
import { Task } from "../models/Task";
import Api from "../services/api";

class ChatStore {
  items: ChatMessage[] = [];
  notificationStore: any;
  isLoading = false;

  constructor(notificationStore: any) {
    this.notificationStore = notificationStore;
    makeAutoObservable(this);
  }

  fetchChatHistory = async () => {
    try {
      this.isLoading = true;
      this.items = await Api.fetchChat();
      this.isLoading = false;
    } catch (e) {
      this.notificationStore.setNotification("Could not fetch chat history");
      this.isLoading = false;
    }
  };
}

export default ChatStore;
