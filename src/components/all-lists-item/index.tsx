//

import { Typography } from "@mui/material";
import { FC } from "react";
import styled from "@emotion/styled";

import { List } from "../../models/List";
import TasksEditor from "../tasksEditor";

const ListWrapper = styled.div`
  width: 500px;
`;

interface AllListsItem {
  list: List;
}

const AllListsItem: FC<AllListsItem> = ({ list }) => {
  return (
    <ListWrapper>
      <Typography variant="h3">{list.title}</Typography>
      <TasksEditor listId={list._id} />
    </ListWrapper>
  );
};

export default AllListsItem;
