import { AppBar, Divider, Drawer } from "@mui/material";
import { FC, ChangeEvent, useEffect } from "react";
import { TextField, Button, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";

import { useStores } from "../../store";
import TasksEditor from "../tasksEditor";

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
        editList,
        getList,
        setTitle,
        item: { title, _id },
      },
      lists: { fetchLists },
    } = useStores();

    const isEditMode = Boolean(_id);

    useEffect(() => {
      const fetchList = async () => {
        await getList();
      };

      if (_id) {
        fetchList();
      }
    }, [_id]);

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    };

    const handleClose = () => {
      closeDrawer();
      clearList();
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
            <Divider sx={{ mx: 2 }} />
            <TasksEditor listId={_id} />
          </>
        )}
      </Drawer>
    );
  }
);

export default ListDrawer;
