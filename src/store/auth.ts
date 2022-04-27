import { makeAutoObservable } from "mobx";
import { Credentials, User } from "../models/User";
import Api from "../services/api";

class Auth {
  me: User = {
    username: "",
  };
  users: User[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  register = async (credentials: Credentials) => {
    this.me = await Api.register(credentials);
  };

  login = async (credentials: Credentials) => {
    this.me = await Api.login(credentials);
  };

  loginSilently = async () => {
    console.log(1111);
    const { username } = await Api.loginSilently();
    console.log(222, username);
    this.me.username = username;
    console.log(3333, this.me);
  };

  logout = async () => {
    await Api.logout(this.me.username);
    this.me.username = "";
  };

  fetchUsers = async () => {
    this.users = await Api.getUsers();
  };
}

export default Auth;
