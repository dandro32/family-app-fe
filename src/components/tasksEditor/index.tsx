import { List } from "@mui/material";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { useStores } from "../../store";
import TaskCard from "./taskCard";
import TaskForm from "./taskForm";
import { CircularProgress } from "@mui/material";
import { Task } from "../../models/Task";

interface TasksEditorProps {
  listId: string;
  tasks: Task[];
  isLoading?: boolean;
}

const TasksEditor: FC<TasksEditorProps> = observer(
  ({ listId, tasks = [], isLoading = false }) => {
    const {
      tasks: { editedTaskId },
    } = useStores();

    const renderTasks = tasks.map((item, i) => {
      return editedTaskId === item._id ? (
        <TaskForm key={item._id} item={item} listId={listId} />
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
