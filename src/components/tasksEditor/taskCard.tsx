import { ChangeEvent, FC } from "react";
import {
  Checkbox,
  IconButton,
  ListItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { observer } from "mobx-react-lite";

import styled from "@emotion/styled";
import { TASK_STATUS } from "../../consts";
import { TaskItem } from "../../models/Task";
import { useStores } from "../../store";

const TaskActions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TaskCard: FC<TaskItem> = observer(
  ({ _id, title, username, done, listId, index }) => {
    const {
      tasks: { markTaskAsDone },
    } = useStores();

    const markAsDone = (e: ChangeEvent<HTMLInputElement>) => {
      markTaskAsDone(_id, e.target.checked);
    };

    const handleEdit = () => {};

    const handleDelete = () => {};

    const backgroundColor = index % 2 === 0 ? grey[300] : grey[50];

    return (
      <ListItem
        alignItems="center"
        divider
        sx={{ justifyContent: "space-between", backgroundColor }}
      >
        <Typography variant="subtitle1">{title}</Typography>
        <div>
          <Typography variant="caption">{username?.toUpperCase()}</Typography>
          <Tooltip title="Mark as done">
            <Checkbox
              checked={done === TASK_STATUS.DONE}
              onChange={markAsDone}
            />
          </Tooltip>
          <Tooltip title="Edit task">
            <IconButton onClick={handleEdit}>
              <EditIcon color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete task">
            <IconButton onClick={handleDelete}>
              <DeleteIcon color="primary" />
            </IconButton>
          </Tooltip>
        </div>
      </ListItem>
    );
  }
);

export default TaskCard;
