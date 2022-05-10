import { List } from "@mui/material";
import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { useStores } from "../../store";
import TaskCard from "./taskCard";
import TaskForm from "./taskForm";
import { CircularProgress } from "@mui/material";

interface TasksEditorProps {
  listId: string;
}

const TasksEditor: FC<TasksEditorProps> = observer(({ listId }) => {
  const {
    tasks: { editedTaskId, items, isLoading, fetchTasks },
  } = useStores();

  useEffect(() => {
    const getTasks = async () => {
      await fetchTasks(listId);
    };

    if (listId) {
      getTasks();
    }
  }, [listId]);

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
});

export default TasksEditor;
