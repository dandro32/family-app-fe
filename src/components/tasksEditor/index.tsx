import { List } from "@mui/material";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { useStores } from "../../store";
import TaskCard from "./taskCard";
import TaskForm from "./taskForm";
import { CircularProgress } from "@mui/material";
import { useFetchForDetails } from "../../shared/utils";
import { Task } from "../../models/Task";

interface TasksEditorProps {
  listId: string;
  fetchForDetails?: boolean;
}

const TasksEditor: FC<TasksEditorProps> = observer(
  ({ listId, fetchForDetails = true }) => {
    const {
      tasks: { editedTaskId },
      lists: { lists: listItems },
    } = useStores();
    // const [items, setItems] = useState<Task[]>([]);
    // const [isLoading, setIsLoading] = useState<boolean>(false);

    let isLoading = false;
    let items: Task[] = [];

    if (fetchForDetails) {
      // TODO: think something better if time
      const [data, loaderState] = useFetchForDetails(listId);

      items = data;
      isLoading = loaderState;
      // setItems(data);
      // setIsLoading(loaderState);
    } else {
      const list = listItems.find((item) => item._id === listId);

      if (list) {
        // setItems(list.tasks);
        items = list.tasks;
      }
    }

    const renderTasks = items.map((item, i) => {
      return editedTaskId === item._id ? (
        <TaskForm key={item._id} _id={item._id} listId={listId} />
      ) : (
        <TaskCard key={item._id} {...item} listId={listId} index={i} />
      );
    });

    return (
      <>
        {isLoading && (
          <>
            <CircularProgress size={45} />
          </>
        )}
        {!isLoading && (
          <>
            <List sx={{ mx: 5 }}>{renderTasks}</List>
            {!editedTaskId && <TaskForm listId={listId} />}
          </>
        )}
      </>
    );
  }
);

export default TasksEditor;
