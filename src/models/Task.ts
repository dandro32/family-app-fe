export interface Task {
  _id: string;
  listId: string;
  title: string;
  username: string;
  done: number;
}

export type NewTask = Omit<Task, "_id">;
