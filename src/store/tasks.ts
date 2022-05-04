import { makeAutoObservable } from "mobx";
import { TASK_STATUS } from "../consts";
import { Task, NewTask } from "../models/Task";
import Api from "../services/api";

const initialTask: NewTask = {
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

  getTaskIndex = (taskId: string) => {
    return this.items.findIndex((task) => task._id === taskId);
  };

  addNewTask = async (listId: string) => {
    try {
      this.isUploading = true;
      const newTask = await Api.addTask(listId, this.newTask);
      this.items = [...this.items, newTask];
      this.newTask = initialTask;

      this.isUploading = false;
    } catch (e) {
      this.isLoading = false;
    }
  };

  editTask = async (listId: string, taskId: string) => {
    try {
      this.isUploading = true;
      await Api.editTask(taskId, this.newTask);
      this.isUploading = false;

      await this.fetchTasks(listId);
    } catch (e) {
      this.isUploading = false;
    }
  };

  deleteTask = async (taskId: string) => {
    try {
      this.isUploading = true;
      await Api.deleteTask(taskId);

      this.items = this.items.filter((task) => task._id !== taskId);
      this.isUploading = false;
    } catch (e) {
      this.isUploading = false;
    }
  };

  markTaskAsDone = async (taskId: string) => {
    try {
      await Api.markTaskAsDone(taskId);

      const taskIndex = this.getTaskIndex(taskId);

      if (taskIndex > -1) {
        this.items[taskIndex].done = TASK_STATUS.DONE;
      }
    } catch (e) {
      this.isLoading = false;
    }
  };
}

export default Tasks;
