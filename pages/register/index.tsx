import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import Router from "next/router";

import { Credentials } from "../../src/models/User";
import UserForm from "../../src/components/userForm";
import CentralPaper from "../../src/components/centralPaper";
import { useStores } from "../../src/store";

const RegisterUser: FC = observer(() => {
  const { auth } = useStores();

  const onSubmit = async (credentials: Credentials) => {
    await auth.register(credentials);
    Router.push("/");
  };

  return (
    <CentralPaper>
      <UserForm onSubmit={onSubmit} title="Register user" />
    </CentralPaper>
  );
});

export default RegisterUser;
