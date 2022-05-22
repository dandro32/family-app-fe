//

import { Typography } from "@mui/material";
import { FC } from "react";
import styled from "@emotion/styled";
import DoneIcon from "@mui/icons-material/Done";
import { red } from "@mui/material/colors";

import { List } from "../../models/List";
import TasksEditor from "../tasksEditor";
import { observer } from "mobx-react-lite";
import { useStores } from "../../store";
import { checkIfListIsDone } from "../../shared/utils";

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
  const isDone = checkIfListIsDone(list.tasks);

  return (
    <ListWrapper>
      <StyledTitle variant="h4">
        {list.title}
        {isDone && <DoneIcon sx={{ color: red[500] }} />}
      </StyledTitle>
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
