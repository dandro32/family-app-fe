import { makeAutoObservable } from "mobx";

export enum NotificationType {
  warning = "warning",
  error = "error",
  info = "info",
  success = "success",
}

class Notifications {
  message: string = "";
  severity: NotificationType = NotificationType.error;

  constructor() {
    makeAutoObservable(this);
  }

  setNotification = (message: string, severity = NotificationType.error) => {
    this.message = message;
    this.severity = severity;
  };

  clearNotification = () => {
    this.message = "";
    this.severity = NotificationType.error;
  };
}

export default Notifications;
