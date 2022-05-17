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
  editTask: (listId: string, body: Task) => Promise<void>;
  addNewTask: (listId: string, body: Task) => Promise<void>;
}

const TasksEditor: FC<TasksEditorProps> = observer(
  ({ listId, tasks = [], isLoading = false, addNewTask, editTask }) => {
    const {
      tasks: { editedTaskId },
    } = useStores();

    const renderTasks = tasks.map((item, i) => {
      return editedTaskId === item._id ? (
        <TaskForm
          key={item._id}
          item={item}
          listId={listId}
          addNewTask={addNewTask}
          editTask={editTask}
        />
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
            {!editedTaskId && (
              <TaskForm
                listId={listId}
                addNewTask={addNewTask}
                editTask={editTask}
              />
            )}
          </>
        )}
      </>
    );
  }
);

export default TasksEditor;
