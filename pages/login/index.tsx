import React, { FC } from "react";
import { Typography, Link as MUILink } from "@mui/material";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import Router from "next/router";

import { Credentials } from "../../src/models/User";
import UserForm from "../../src/components/userForm";
import CentralPaper from "../../src/components/centralPaper";
import { useStores } from "../../src/store";

const Login: FC = observer(() => {
  const { auth } = useStores();

  const onSubmit = async (credentials: Credentials) => {
    await auth.login(credentials);
    Router.push("/");
  };

  return (
    <CentralPaper>
      <UserForm onSubmit={onSubmit} title="Login" />
      <Typography variant="subtitle1">
        No user? Try{" "}
        <Link href="/register" passHref>
          <MUILink>register.</MUILink>
        </Link>
      </Typography>
    </CentralPaper>
  );
});

export default Login;
