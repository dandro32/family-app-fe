import React, { FC, ReactNode, useState } from "react";
import { CircularProgress } from "@mui/material";
import { NextPage } from "next";

import Api from "../services/api";
import { useStores } from "../store";

interface BooleanHandler {
  (): void;
}

export const useBoolean = (
  initialValue: boolean
): [boolean, BooleanHandler, BooleanHandler, BooleanHandler] => {
  const [state, setState] = useState(initialValue);

  const handleSetFalse = () => {
    setState(false);
  };

  const handleSetTrue = () => {
    setState(true);
  };

  const handleToggle = () => {
    setState(!state);
  };

  return [state, handleSetTrue, handleSetFalse, handleToggle];
};

export const withAuth = (Component: NextPage) => {
  const Auth = (props: any): ReactNode => {
    const { auth } = useStores();

    if (!auth.me.username) {
      Api.loginSilently();

      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "100vh",
          }}
        >
          <CircularProgress size={70} />
        </div>
      );
    }

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};
