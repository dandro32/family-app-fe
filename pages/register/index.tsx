import React from "react";
import { User } from "../../src/models/User";
import UserForm from "../../src/components/userForm";
import CentralPaper from "../../src/components/centralPaper";

const RegisterUser = () => {
  const onSubmit = (credentials: User) => {
    console.log("handle login", credentials);
  };

  return (
    <CentralPaper>
      <UserForm onSubmit={onSubmit} title="Register user" />
    </CentralPaper>
  );
};

export default RegisterUser;
