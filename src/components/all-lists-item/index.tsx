//

import { Typography } from "@mui/material";
import { FC } from "react";
import { List } from "../../models/List";
import TasksEditor from "../tasksEditor";

interface AllListsItem {
  list: List;
}

const AllListsItem: FC<AllListsItem> = ({ list }) => {
  console.log(list);
  return (
    <div>
      <Typography variant="h3">{list.title}</Typography>
      {/* <TasksEditor listId={list._id} /> */}
    </div>
  );
};

export default AllListsItem;
