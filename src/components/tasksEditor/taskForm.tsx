import { FC, ChangeEvent, KeyboardEvent, useState } from "react";
import {
  TextField,
  Select,
  SelectChangeEvent,
  MenuItem,
  Checkbox,
  Button,
} from "@mui/material";
import { observer } from "mobx-react-lite";

import { TASK_STATUS } from "../../consts";
import { Task } from "../../models/Task";
import styled from "@emotion/styled";
import { useStores } from "../../store";

const ENTER_KEYCODE = 13;

const TaskContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface TaskFormProps {
  listId: string;
  _id?: string;
}

const TaskForm: FC<TaskFormProps> = observer(({ listId, _id = "" }) => {
  const {
    tasks: {
      addNewTask,
      editTask,
      isUploading,
      newTask,
      setNewTaskDone,
      setNewTaskTitle,
      setNewTaskUser,
    },
    auth: { users },
  } = useStores();
  const [isError, setIsError] = useState<string>("");

  const onTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value as string);
  };

  const changeUser = (event: SelectChangeEvent) => {
    setNewTaskUser(event.target.value as string);
  };

  const markAsDone = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskDone(event.target.checked);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === ENTER_KEYCODE) {
      onSubmit();
    }
  };

  const onSubmit = async () => {
    if (!newTask.title) {
      setIsError("Task cannot be empty");

      return;
    }

    setIsError("");

    if (_id) {
      await editTask(listId, _id);
    } else {
      await addNewTask(listId);
    }
  };

  const renderUsers = (users || []).map(({ username }) => (
    <MenuItem key={`select-user-${username}`} value={username}>
      {username}
    </MenuItem>
  ));

  const isDisabled = Boolean(isError) || isUploading;

  return (
    <TaskContent>
      <TextField
        id="title"
        label="Add task title"
        variant="standard"
        onChange={onTaskChange}
        onKeyDown={onKeyDown}
        value={newTask.title}
        error={Boolean(isError)}
        helperText={isError}
      />
      <Select
        id="user-selection"
        value={newTask.username}
        label="User"
        onChange={changeUser}
      >
        {renderUsers}
      </Select>
      <Checkbox
        checked={newTask.done === TASK_STATUS.DONE}
        onChange={markAsDone}
      />
      <Button onClick={onSubmit} disabled={isDisabled}>
        Submit Task
      </Button>
    </TaskContent>
  );
});

export default TaskForm;
