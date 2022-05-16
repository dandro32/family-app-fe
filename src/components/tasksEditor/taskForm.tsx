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
import { Task } from "../../models/Task";

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
  item?: Task;
}

const initialTask: Task = {
  _id: "",
  listId: "",
  title: "",
  username: "",
  done: 0,
};

const TaskForm: FC<TaskFormProps> = observer(
  ({ listId, item = initialTask }) => {
    const {
      tasks: { addNewTask, clearTask, editTask, isUploading },
      auth: { users, me },
    } = useStores();
    const [isError, setIsError] = useState<string>("");
    const [taskForm, setTaskForm] = useState<Task>(item);

    const setTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      setTaskForm((prevState) => ({ ...prevState, title: value }));
    };

    const changeUser = (e: SelectChangeEvent) => {
      const { value } = e.target;

      console.log(123, value);

      setTaskForm((prevState) => ({ ...prevState, username: value }));
    };

    const markAsDone = (e: ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.target;

      setTaskForm((prevState) => ({ ...prevState, done: Number(checked) }));
    };

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === ENTER_KEYCODE && !isUploading) {
        onSubmit();
      }
    };

    const onSubmit = async () => {
      if (!taskForm.title) {
        setIsError("Task cannot be empty");

        return;
      }

      setIsError("");

      if (taskForm._id) {
        await editTask(listId, taskForm);
      } else {
        await addNewTask(listId, taskForm);
      }

      clearTask();
      setTaskForm(initialTask);
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
          label={`${taskForm._id ? "Edit" : "Add"} task`}
          variant="standard"
          onChange={setTaskTitle}
          onKeyDown={onKeyDown}
          value={taskForm.title}
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
              value={taskForm.username || me.username}
              label="User"
              onChange={changeUser}
              labelId="user-selection"
            >
              {renderUsers}
            </Select>
          </FormControl>
          <Tooltip title="Mark as done">
            <Checkbox
              checked={taskForm.done === TASK_STATUS.DONE}
              onChange={markAsDone}
            />
          </Tooltip>
          {taskForm._id && (
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
  }
);

export default TaskForm;
