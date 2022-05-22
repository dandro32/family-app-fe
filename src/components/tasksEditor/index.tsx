import { List } from "@mui/material";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { useStores } from "../../store";
import TaskCard from "./taskCard";
import TaskForm from "./taskForm";
import { CircularProgress } from "@mui/material";
import { Task } from "../../models/Task";
import { TASK_STATUS } from "../../consts";

interface TasksEditorProps {
  addNewTask: (listId: string, body: Task) => Promise<void>;
  disabled?: boolean;
  deleteTask: (listId: string, taskId: string) => Promise<void>;
  editTask: (listId: string, body: Task) => Promise<void>;
  isLoading?: boolean;
  listId: string;
  markTaskAsDone: (
    listId: string,
    taskId: string,
    status: boolean
  ) => Promise<void>;
  tasks: Task[];
}

const TasksEditor: FC<TasksEditorProps> = observer(
  ({
    addNewTask,
    deleteTask,
    disabled = false,
    editTask,
    isLoading = false,
    listId,
    markTaskAsDone,
    tasks = [],
  }) => {
    const {
      tasks: { editedTaskId },
    } = useStores();

    const handleMarkTaskAsDone = async (
      listId: string,
      taskId: string,
      status: boolean
    ) => {
      const undoneTasks = tasks
        .map((task) => task.done)
        .filter((task) => task !== TASK_STATUS.DONE);

      if (undoneTasks.length === 1 && status === true) {
        alert("Congratulations. List is done");
      }

      await markTaskAsDone(listId, taskId, status);
    };

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
        <TaskCard
          key={item._id}
          task={item}
          listId={listId}
          index={i}
          markTaskAsDone={handleMarkTaskAsDone}
          deleteTask={deleteTask}
          disabled={disabled}
        />
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
