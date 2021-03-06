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

import { TASK_STATUS } from "../../consts";
import { Task } from "../../models/Task";
import { useStores } from "../../store";

interface TaskCardProps {
  disabled?: boolean;
  deleteTask: (listId: string, taskId: string) => Promise<void>;
  index: number;
  listId: string;
  markTaskAsDone: (
    listId: string,
    taskId: string,
    status: boolean
  ) => Promise<void>;
  task: Task;
}

const TaskCard: FC<TaskCardProps> = observer(
  ({ task, index, listId, markTaskAsDone, deleteTask, disabled = false }) => {
    const {
      tasks: { setEditedTaskId },
    } = useStores();

    const { _id, title, username, done } = task;

    const markAsDone = (e: ChangeEvent<HTMLInputElement>) => {
      markTaskAsDone(listId, _id, e.target.checked);
    };

    const handleEdit = () => {
      setEditedTaskId(_id);
    };

    const handleDelete = () => {
      deleteTask(listId, _id);
    };

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
              disabled={disabled}
            />
          </Tooltip>
          <Tooltip title="Edit task">
            <IconButton onClick={handleEdit} disabled={disabled}>
              <EditIcon color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete task">
            <IconButton onClick={handleDelete} disabled={disabled}>
              <DeleteIcon color="primary" />
            </IconButton>
          </Tooltip>
        </div>
      </ListItem>
    );
  }
);

export default TaskCard;
