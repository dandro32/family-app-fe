import { List } from "@mui/material";
import { Task } from "./Task";

export interface List {
  _id: string;
  title: string;
  done: number;
  tasks: Task[];
}

export type NewList = Pick<List, "_id" | "title" | "done">;

export type CreateList = Pick<List, "title">;
