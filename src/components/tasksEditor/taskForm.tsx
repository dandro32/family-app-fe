import { FC, ChangeEvent, KeyboardEvent, useState } from "react";
import {
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
} from "@mui/material";
import { observer } from "mobx-react-lite";

import { TASK_STATUS } from "../../consts";
import styled from "@emotion/styled";
import { useStores } from "../../store";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const ENTER_KEYCODE = 13;

const TaskContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px;
`;
const TaskActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
`;

interface TaskFormProps {
  listId: string;
  _id?: string;
}

const TaskForm: FC<TaskFormProps> = observer(({ listId, _id = "" }) => {
  const {
    tasks: {
      addNewTask,
      clearTask,
      editTask,
      isUploading,
      newTask,
      setNewTaskDone,
      setNewTaskTitle,
      setNewTaskUser,
    },
    auth: { users, me },
  } = useStores();
  const [isError, setIsError] = useState<string>("");
  const taskUser = newTask.username || me.username;

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
    if (e.keyCode === ENTER_KEYCODE && !isUploading) {
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

    clearTask();
  };

  const onCancel = () => {
    clearTask();
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
        label={`${_id ? "Edit" : "Add"} task`}
        variant="standard"
        onChange={onTaskChange}
        onKeyDown={onKeyDown}
        value={newTask.title}
        error={Boolean(isError)}
        helperText={isError}
        multiline
        fullWidth
      />

      <TaskActions>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="user-selection">User</InputLabel>
          <Select
            id="user-selection"
            value={taskUser}
            label="User"
            onChange={changeUser}
            labelId="user-selection"
          >
            {renderUsers}
          </Select>
        </FormControl>
        <Tooltip title="Mark as done">
          <Checkbox
            checked={newTask.done === TASK_STATUS.DONE}
            onChange={markAsDone}
          />
        </Tooltip>
        {_id && (
          <Tooltip title="Cancel">
            <IconButton onClick={onCancel}>
              <CancelIcon color="primary" />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Save">
          <IconButton onClick={onSubmit} disabled={isDisabled}>
            <SaveIcon color="primary" />
          </IconButton>
        </Tooltip>
      </TaskActions>
    </TaskContent>
  );
});

export default TaskForm;
