import { FC } from "react";
import { Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import DoneIcon from "@mui/icons-material/Done";

import { TASK_STATUS } from "../../consts";
import { Task } from "../../models/Task";
import styled from "@emotion/styled";

const TaskContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TaskCard: FC<Task> = observer(
  ({ _id, title, username, done, listId }) => {
    return (
      <TaskContent>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="caption">{username}</Typography>
        {done === TASK_STATUS.DONE && <DoneIcon />}
      </TaskContent>
    );
  }
);

export default TaskCard;
