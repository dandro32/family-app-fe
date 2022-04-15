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

  fetchUsers = async () => {
    this.users = await Api.getUsers();
  };
}

export default Auth;
