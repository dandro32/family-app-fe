import { List } from "@mui/material";
import { Task } from "./Task";

export interface List {
  _id: string;
  title: string;
  done: number;
  tasks: Task[];
}

export type CreateList = Pick<List, "title">;
