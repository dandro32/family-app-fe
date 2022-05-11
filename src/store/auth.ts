import { makeAutoObservable } from "mobx";
import { Credentials, User } from "../models/User";
import Api from "../services/api";

class Auth {
  me: User = {
    username: "",
  };
  isLogged: boolean = false;
  users: User[] = [];
  notificationStore: any;

  constructor(notificationStore: any) {
    this.notificationStore = notificationStore;
    makeAutoObservable(this);
  }

  register = async (credentials: Credentials) => {
    try {
      this.me = await Api.register(credentials);
    } catch (e) {
      this.notificationStore.setNotification("Could not register");
    }
  };

  login = async (credentials: Credentials) => {
    try {
      this.me = await Api.login(credentials);
    } catch (e) {
      this.notificationStore.setNotification("Could not login");
    }
  };

  loginSilently = async () => {
    const { username } = await Api.loginSilently();
    this.me.username = username;
    this.isLogged = true;
  };

  logout = async () => {
    try {
      await Api.logout(this.me.username);
      this.me.username = "";
      this.isLogged = false;
    } catch (e) {
      this.notificationStore.setNotification("Could not logout");
    }
  };

  fetchUsers = async () => {
    try {
      this.users = await Api.getUsers();
    } catch (e) {
      this.notificationStore.setNotification("Could not fetch users");
    }
  };
}

export default Auth;
