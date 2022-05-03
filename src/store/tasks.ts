import { makeAutoObservable } from "mobx";
import { Task, NewTask } from "../models/Task";
import Api from "../services/api";

class Tasks {
  items: Task[] = [];
  newTask: NewTask = {
    listId: "",
    title: "",
    username: "",
    done: 0,
  };
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchTasks = async (listId: string) => {
    try {
      this.isLoading = true;
      this.items = await Api.getTasks(listId);
      this.isLoading = false;
    } catch (e) {
      this.isLoading = false;
    }
  };
}

export default Tasks;
