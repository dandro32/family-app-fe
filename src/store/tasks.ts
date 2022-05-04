import { makeAutoObservable } from "mobx";
import { TASK_STATUS } from "../consts";
import { Task, NewTask } from "../models/Task";
import Api from "../services/api";

const initialTask: NewTask = {
  listId: "",
  title: "",
  username: "",
  done: 0,
};

class Tasks {
  items: Task[] = [];
  newTask: NewTask = initialTask;
  isLoading = false;
  isUploading = false;

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

  setNewTaskTitle = (value: string) => {
    this.newTask.title = value;
  };

  setNewTaskUser = (username: string) => {
    this.newTask.username = username;
  };

  setNewTaskDone = (checked: boolean) => {
    this.newTask.done = Number(checked);
  };

  addNewTask = async () => {
    try {
      this.isUploading = true;
      const newTask = await Api.addTask(this.newTask);
      this.items = [...this.items, newTask];

      this.isUploading = false;
    } catch (e) {
      this.isLoading = false;
    }
  };
}

export default Tasks;
