import React from "react";
import { Typography, Link as MUILink } from "@mui/material";
import Link from "next/link";

import { User } from "../../src/models/User";
import UserForm from "../../src/components/userForm";
import CentralPaper from "../../src/components/centralPaper";

const Login = () => {
  const onSubmit = (credentials: User) => {
    console.log("handle register", credentials);
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
};

export default Login;
