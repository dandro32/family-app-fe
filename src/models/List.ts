import { Task } from "./Task";

export interface List {
  _id: string;
  title: string;
  done: number;
  tasks: Task[];
}
