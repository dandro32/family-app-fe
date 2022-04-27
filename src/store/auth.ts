import { makeAutoObservable } from "mobx";
import { Credentials, User } from "../models/User";
import Api from "../services/api";

class Auth {
  me: User = {
    username: "",
  };
  isLogged: boolean = false;
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
    const { username } = await Api.loginSilently();
    this.me.username = username;
    this.isLogged = true;
  };

  logout = async () => {
    await Api.logout(this.me.username);
    this.me.username = "";
    this.isLogged = false;
  };

  fetchUsers = async () => {
    this.users = await Api.getUsers();
  };
}

export default Auth;
