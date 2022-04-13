import React from "react";
import { User } from "../../src/models/User";
import UserForm from "../../src/components/userForm";

const Login = () => {
  const onSubmit = (credentials: User) => {
    console.log("handle login", credentials);
  };

  return <UserForm onSubmit={onSubmit} />;
};

export default Login;
