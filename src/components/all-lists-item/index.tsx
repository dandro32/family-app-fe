//

import { Typography } from "@mui/material";
import { FC } from "react";
import styled from "@emotion/styled";

import { List } from "../../models/List";
import TasksEditor from "../tasksEditor";
import { observer } from "mobx-react-lite";
import { useStores } from "../../store";

const ListWrapper = styled.div`
  width: 400px;
  margin: 10px;
  border: 1px solid black;
`;

interface AllListsItem {
  list: List;
}

const AllListsItem: FC<AllListsItem> = observer(({ list }) => {
  const {
    lists: { addNewTaskInList, editTaskInList },
  } = useStores();

  return (
    <ListWrapper>
      <Typography variant="h3">{list.title}</Typography>
      <TasksEditor
        listId={list._id}
        tasks={list.tasks}
        addNewTask={addNewTaskInList}
        editTask={editTaskInList}
      />
    </ListWrapper>
  );
});

export default AllListsItem;
