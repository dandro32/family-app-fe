//

import { Typography } from "@mui/material";
import { FC } from "react";
import styled from "@emotion/styled";

import { List } from "../../models/List";
import TasksEditor from "../tasksEditor";
import { observer } from "mobx-react-lite";
import { useStores } from "../../store";

const ListWrapper = styled.div`
  width: 650px;
  margin: 10px;
  border: 1px solid grey;
`;

const StyledTitle = styled(Typography)`
  && {
    text-align: center;
  }
`;

interface AllListsItem {
  list: List;
}

const AllListsItem: FC<AllListsItem> = observer(({ list }) => {
  const {
    lists: {
      addNewTaskInList,
      deleteTaskInList,
      editTaskInList,
      listAreChainging,
      markTaskAsDoneInList,
    },
  } = useStores();

  return (
    <ListWrapper>
      <StyledTitle variant="h4">{list.title}</StyledTitle>
      <TasksEditor
        listId={list._id}
        tasks={list.tasks}
        addNewTask={addNewTaskInList}
        editTask={editTaskInList}
        deleteTask={deleteTaskInList}
        markTaskAsDone={markTaskAsDoneInList}
        disabled={listAreChainging.includes(list._id)}
      />
    </ListWrapper>
  );
});

export default AllListsItem;
