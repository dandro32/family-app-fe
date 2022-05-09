export interface Task {
  _id: string;
  listId: string;
  title: string;
  username: string;
  done: number;
}

export interface TaskItem extends Task {
  index: number;
}

export type NewTask = Omit<Task, "_id" | "listId">;
