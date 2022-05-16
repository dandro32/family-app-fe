//

import { Typography } from "@mui/material";
import { FC } from "react";
import styled from "@emotion/styled";

import { List } from "../../models/List";
import TasksEditor from "../tasksEditor";
import { useBoolean } from "../../shared/utils";

const ListWrapper = styled.div`
  width: 400px;
  margin: 10px;
  border: 1px solid black;
`;

interface AllListsItem {
  list: List;
}

const AllListsItem: FC<AllListsItem> = ({ list }) => {
  const [willBeEdited, onEnter, onLeave] = useBoolean(false);

  return (
    <ListWrapper onMouseEnter={onEnter} onMouseMove={onLeave}>
      <Typography variant="h3">{list.title}</Typography>
      <TasksEditor listId={list._id} fetchForDetails={willBeEdited} />
    </ListWrapper>
  );
};

export default AllListsItem;
