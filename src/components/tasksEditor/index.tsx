import { List } from "@mui/material";
import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { useStores } from "../../store";
import TaskCard from "./taskCard";
import TaskForm from "./taskForm";

interface TasksEditorProps {
  listId: string;
}

const TasksEditor: FC<TasksEditorProps> = observer(({ listId }) => {
  const {
    tasks: { items, isLoading, fetchTasks },
  } = useStores();

  useEffect(() => {
    const getTasks = async () => {
      await fetchTasks(listId);
    };

    if (listId) {
      getTasks();
    }
  }, [listId]);

  const renderTasks = items.map((item, i) => (
    <TaskCard key={item._id} {...item} listId={listId} index={i} />
  ));

  return (
    <>
      <List sx={{ mx: 5 }}>{renderTasks}</List>
      <TaskForm listId={listId} />
    </>
  );
});

export default TasksEditor;
