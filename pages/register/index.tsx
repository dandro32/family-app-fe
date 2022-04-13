import React from "react";
import { User } from "../../src/models/User";
import UserForm from "../../src/components/userForm";

const RegisterUser = () => {
  const onSubmit = (credentials: User) => {
    console.log("handle login", credentials);
  };

  return <UserForm onSubmit={onSubmit} title="Register user" />;
};

export default RegisterUser;
