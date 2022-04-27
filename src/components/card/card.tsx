import {
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { FC } from "react";
import TaskIcon from "@mui/icons-material/Task";
import DoneIcon from "@mui/icons-material/Done";
import { grey, red } from "@mui/material/colors";

interface CardProps {
  _id: string;
  title: string;
  done?: boolean;
  tasksNumber?: number;
  onClick: (_id: string) => void;
}

const CardItem: FC<CardProps> = ({
  _id,
  title,
  tasksNumber = 0,
  done = false,
  onClick,
}) => {
  const handleClick = () => {
    onClick(_id);
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        m: 2,
        background: done ? grey[200] : "white",
      }}
    >
      <CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" gutterBottom>
            {title}
            {done && <DoneIcon sx={{ color: red[500] }} />}
          </Typography>
          <Badge badgeContent={tasksNumber} color="secondary">
            <TaskIcon />
          </Badge>
        </div>
      </CardContent>
      <CardActions
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button size="small" onClick={handleClick}>
          Edit list
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardItem;
