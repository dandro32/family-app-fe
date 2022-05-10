import React, { forwardRef, SyntheticEvent, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { observer } from "mobx-react-lite";
import { useStores } from "../../store";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notifications = observer(() => {
  const {
    notifications: { clearNotification, message, severity },
  } = useStores();

  useEffect(() => {
    let autoClear = setTimeout(() => clearNotification(), 5000);

    return () => {
      clearTimeout(autoClear);
    };
  }, []);

  const handleClose = (e?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    clearNotification();
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={Boolean(message)}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
});

export default Notifications;
