import React, { FC, ReactNode, useEffect, useState } from "react";
import { NextPage } from "next";

import { useStores } from "../store";
import PageLoader from "../components/pageLoader";
import { observer, useObserver } from "mobx-react-lite";
import { Task } from "../models/Task";

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
    const {
      auth: { isLogged, loginSilently },
    } = useStores();

    useEffect(() => {
      const authorize = async () => {
        await loginSilently();
      };

      if (!isLogged) {
        authorize();
      }
    }, [isLogged]);

    if (!isLogged) {
      return <PageLoader size={70} />;
    }

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return observer(Auth as FC);
};
