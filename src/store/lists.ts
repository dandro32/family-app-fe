import { makeAutoObservable } from "mobx";
import { List } from "../models/List";
import { Task } from "../models/Task";
import Api from "../services/api";

class Lists {
  lists: List[] = [];
  listsAreLoading = false;
  notificationStore: any;
  listAreChainging: string[] = [];
  authStore: any; // TODO: handle any

  constructor(authStore: any, notificationStore: any) {
    this.authStore = authStore;
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

  loading = (listId: string) => {
    this.listAreChainging = [...this.listAreChainging, listId];
  };

  notLoading = (listId: string) => {
    this.listAreChainging = [...this.listAreChainging, listId];
  };

  getTasksFromLists = (listId: string): Task[] => {
    const list = this.lists.find((item) => item._id === listId);

    if (!list) {
      throw new Error("List does not exist in store");
    }

    return list.tasks;
  };

  setTaskToLists = (listId: string, tasks: Task[]): void => {
    const index = this.lists.findIndex((item) => item._id === listId);

    if (index === -1) {
      throw new Error("List does not exist in store");
    }

    this.lists[index].tasks = tasks;
  };

  addNewTaskInList = async (listId: string, body: Task) => {
    try {
      this.loading(listId);
      const username = body.username || this.authStore.me.username;
      const updatedBody = { ...body, username };

      const _id = await Api.addTask(listId, updatedBody);

      const tasks = this.getTasksFromLists(listId);
      this.setTaskToLists(listId, [...tasks, { ...updatedBody, _id }]);
      this.notLoading(listId);
    } catch (e) {
      this.notLoading(listId);
      this.notificationStore.setNotification("Could not add new task");
    }
  };

  editTaskInList = async (listId: string, task: Task) => {
    try {
      this.loading(listId);
      const { _id, ...body } = task;
      const tasks = this.getTasksFromLists(listId);

      await Api.editTask(_id, { ...body, listId });

      const updatedTasks = tasks.map((item) =>
        item._id === _id ? task : item
      );

      this.setTaskToLists(listId, updatedTasks);
      this.notLoading(listId);
    } catch (e) {
      this.notificationStore.setNotification("Could not edit this task");
    }
  };

  deleteTaskInList = async (listId: string, taskId: string) => {
    try {
      await Api.deleteTask(taskId);

      const tasks = this.getTasksFromLists(listId);
      const filteredTasks = tasks.filter((task) => task._id !== taskId);
      this.setTaskToLists(listId, filteredTasks);
    } catch (e) {
      this.notificationStore.setNotification("Could not delete this task");
    }
  };

  markTaskAsDone = async (listId: string, taskId: string, status: boolean) => {
    try {
      await Api.markTaskAsDone(taskId, status);

      const tasks = this.getTasksFromLists(listId);
      const taskIndex = tasks.findIndex((task) => task._id === taskId);

      if (taskIndex > -1) {
        tasks[taskIndex].done = Number(status);

        this.setTaskToLists(listId, tasks);
      }
    } catch (e) {
      this.notificationStore.setNotification(
        "Could not mark this task as done/undone"
      );
    }
  };
}

export default Lists;
