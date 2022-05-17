import { AppBar, Divider, Drawer } from "@mui/material";
import { FC, ChangeEvent, useEffect } from "react";
import { TextField, Button, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";

import { useStores } from "../../store";
import TasksEditor from "../tasksEditor";
import { red } from "@mui/material/colors";

interface ListDrawerProps {
  isOpen?: boolean;
  closeDrawer: () => void;
}

const ListCreation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const ListDrawer: FC<ListDrawerProps> = observer(
  ({ isOpen = false, closeDrawer }) => {
    const {
      listDetails: {
        addNewList,
        clearList,
        deleteList,
        editList,
        getList,
        setTitle,
        item: { title, _id: listId },
      },
      lists: { fetchLists },
      tasks: {
        addNewTask,
        editTask,
        fetchTasks,
        isLoading: tasksAreLoading,
        items: taskItems,
      },
    } = useStores();

    const isEditMode = Boolean(listId);

    useEffect(() => {
      const fetchList = async () => {
        await getList();
      };

      const fetchTaskDetails = async () => {
        await fetchTasks(listId);
      };

      if (listId) {
        fetchList();
        fetchTaskDetails();
      }
    }, [listId]);

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    };

    const handleClose = () => {
      closeDrawer();
      clearList();
    };

    const handleDeleteList = async () => {
      const isConfirmed = confirm("Are you sure you want to delete list"); // TODO styled

      if (!isConfirmed) {
        return;
      }

      await deleteList(listId);
      handleClose();
      await fetchLists();
    };

    const onSubmit = async () => {
      if (isEditMode) {
        await editList();
      } else {
        await addNewList();
      }

      await fetchLists();
      handleClose();
    };

    return (
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          sx: { width: "50%" },
        }}
      >
        <AppBar
          position="relative"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60px",
          }}
        >
          <Typography variant="h5">{`${
            isEditMode ? "Edit" : "Add"
          } List`}</Typography>
        </AppBar>
        <ListCreation>
          <TextField
            id="listTitle"
            label="List Title"
            variant="standard"
            onChange={onTitleChange}
            sx={{ m: 2 }}
            value={title}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={onSubmit}
            sx={{ mx: 2, minWidth: 200 }}
            disabled={title.length === 0}
          >
            {`${isEditMode ? "Update" : "Create"} List`}
          </Button>
        </ListCreation>

        {isEditMode && (
          <>
            <Typography variant="h6" sx={{ mx: 2 }}>
              Tasks:
            </Typography>
            <Divider />
            <TasksEditor
              listId={listId}
              tasks={taskItems}
              isLoading={tasksAreLoading}
              addNewTask={addNewTask}
              editTask={editTask}
            />

            <Button
              color="error"
              variant="outlined"
              onClick={handleDeleteList}
              sx={{
                position: "absolute",
                bottom: 10,
                left: 20,
                right: 20,
              }}
            >
              Delete
            </Button>
          </>
        )}
      </Drawer>
    );
  }
);

export default ListDrawer;
