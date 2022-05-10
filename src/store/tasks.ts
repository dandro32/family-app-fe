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
  auth: any; // TODO: handle any
  editedTaskId: string = "";

  constructor(authStore: any) {
    // TODO: handle any
    this.auth = authStore;
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

  setEditedTaskId = (_id: string = "") => {
    this.editedTaskId = _id;
  };

  getTaskIndex = (taskId: string) => {
    return this.items.findIndex((task) => task._id === taskId);
  };

  setTaskToEdition = (task: Task) => {
    this.setEditedTaskId(task._id);
    this.setNewTaskTitle(task.title);
    this.setNewTaskUser(task.username);
    this.setNewTaskDone(Boolean(task.done));
  };

  clearTask = () => {
    this.newTask = initialTask;
    this.editedTaskId = "";
  };

  addNewTask = async (listId: string) => {
    try {
      const username = this.newTask.username || this.auth.me.username;

      this.isUploading = true;
      const _id = await Api.addTask(listId, { ...this.newTask, username });
      this.items = [...this.items, { ...this.newTask, listId, _id }];

      this.newTask = initialTask;

      this.isUploading = false;
    } catch (e) {
      this.isLoading = false;
    }
  };

  editTask = async (listId: string, taskId: string) => {
    try {
      this.isUploading = true;
      await Api.editTask(taskId, { ...this.newTask, listId });
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

  markTaskAsDone = async (taskId: string, status: boolean) => {
    try {
      await Api.markTaskAsDone(taskId, status);

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
