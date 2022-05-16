//

import { Typography } from "@mui/material";
import { FC } from "react";
import styled from "@emotion/styled";

import { List } from "../../models/List";
import TasksEditor from "../tasksEditor";
import { useBoolean } from "../../shared/utils";
import lists from "../../../pages/lists";

const ListWrapper = styled.div`
  width: 400px;
  margin: 10px;
  border: 1px solid black;
`;

interface AllListsItem {
  list: List;
}

const AllListsItem: FC<AllListsItem> = ({ list }) => {
  return (
    <ListWrapper>
      <Typography variant="h3">{list.title}</Typography>
      <TasksEditor listId={list._id} tasks={list.tasks} />
    </ListWrapper>
  );
};

export default AllListsItem;
