import { FC, ChangeEvent } from "react";
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

const TaskContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface TaskFormProps {
  listId: string;
}

const TaskForm: FC<TaskFormProps> = observer(({ listId }) => {
  const {
    tasks: { newTask },
    auth: { users },
  } = useStores();

  const onTaskChange = () => {};

  const changeUser = (event: SelectChangeEvent) => {
    // setUser(event.target.value as string);
  };

  const markAsDone = (event: ChangeEvent<HTMLInputElement>) => {
    // setChecked(event.target.checked);
  };

  const renderUsers = (users || []).map(({ username }) => (
    <MenuItem key={`select-user-${username}`} value={username}>
      {username}
    </MenuItem>
  ));

  return (
    <TaskContent>
      <TextField
        id="title"
        label="Add task title"
        variant="standard"
        onChange={onTaskChange}
        value={newTask.title}
      />
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={newTask.username}
        label="Age"
        onChange={changeUser}
      >
        {renderUsers}
      </Select>
      <Checkbox
        checked={newTask.done === TASK_STATUS.DONE}
        onChange={markAsDone}
      />
      <Button>Submit Task</Button>
    </TaskContent>
  );
});

export default TaskForm;
