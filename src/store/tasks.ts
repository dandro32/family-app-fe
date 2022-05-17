import { makeAutoObservable } from "mobx";
import { Task, TaskEdit } from "../models/Task";
import Api from "../services/api";

class Tasks {
  items: Task[] = [];
  isLoading = false;
  isUploading = false;
  authStore: any; // TODO: handle any
  notificationStore: any;
  editedTaskId: string = "";

  constructor(authStore: any, notificationStore: any) {
    // TODO: handle any
    this.authStore = authStore;
    this.notificationStore = notificationStore;
    makeAutoObservable(this);
  }

  fetchTasks = async (listId: string) => {
    try {
      this.isLoading = true;
      this.items = await Api.getTasks(listId);
      this.isLoading = false;
    } catch (e) {
      this.isLoading = false;
      this.notificationStore.setNotification(
        "Could not fetch tasks for this list"
      );
    }
  };

  setEditedTaskId = (_id: string = "") => {
    this.editedTaskId = _id;
  };

  getTaskIndex = (taskId: string) => {
    return this.items.findIndex((task) => task._id === taskId);
  };

  clearTask = () => {
    this.editedTaskId = "";
  };

  addNewTask = async (listId: string, body: Task) => {
    try {
      const username = body.username || this.authStore.me.username;
      const updatedBody = { ...body, username };

      this.isUploading = true;
      const _id = await Api.addTask(listId, updatedBody);
      this.items = [...this.items, { ...updatedBody, listId, _id }];

      this.isUploading = false;
    } catch (e) {
      this.isLoading = false;
      this.notificationStore.setNotification("Could not add new task");
    }
  };

  editTask = async (listId: string, task: Task) => {
    try {
      this.isUploading = true;
      const { _id, ...body } = task;

      await Api.editTask(_id, { ...body, listId });
      this.isUploading = false;

      await this.fetchTasks(listId);
    } catch (e) {
      this.notificationStore.setNotification("Could not edit this task");
      this.isUploading = false;
    }
  };

  deleteTask = async (_: string, taskId: string) => {
    try {
      this.isUploading = true;
      await Api.deleteTask(taskId);

      this.items = this.items.filter((task) => task._id !== taskId);
      this.isUploading = false;
    } catch (e) {
      this.notificationStore.setNotification("Could not delete this task");
      this.isUploading = false;
    }
  };

  markTaskAsDone = async (_: string, taskId: string, status: boolean) => {
    try {
      await Api.markTaskAsDone(taskId, status);

      const taskIndex = this.getTaskIndex(taskId);

      if (taskIndex > -1) {
        this.items[taskIndex].done = Number(status);
      }
    } catch (e) {
      this.notificationStore.setNotification(
        "Could not mark this task as done/undone"
      );
      this.isLoading = false;
    }
  };
}

export default Tasks;
