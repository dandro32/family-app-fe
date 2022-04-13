import { makeAutoObservable } from "mobx";

class Store {
  lists = [];
  user = {};

  constructor() {
    makeAutoObservable(this);
  }
}

export default Store;
