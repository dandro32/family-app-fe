import { ChangeEvent, FC } from "react";
import { Checkbox, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";

import styled from "@emotion/styled";
import { TASK_STATUS } from "../../consts";
import { Task } from "../../models/Task";
import { useStores } from "../../store";

const TaskContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TaskCard: FC<Task> = observer(
  ({ _id, title, username, done, listId }) => {
    const {
      tasks: { markTaskAsDone },
    } = useStores();

    const markAsDone = (event: ChangeEvent<HTMLInputElement>) => {
      markTaskAsDone(event.target.checked);
    };

    return (
      <TaskContent>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="caption">{username}</Typography>
        <Checkbox checked={done === TASK_STATUS.DONE} onChange={markAsDone} />
      </TaskContent>
    );
  }
);

export default TaskCard;
