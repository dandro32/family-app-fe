import { AppBar, Divider, Drawer } from "@mui/material";
import { FC, ChangeEvent, useEffect } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStores } from "../../store";

interface ListDrawerProps {
  isOpen?: boolean;
  closeDrawer: () => void;
}

const ListDrawer: FC<ListDrawerProps> = observer(
  ({ isOpen = false, closeDrawer }) => {
    const {
      listDetails: {
        addNewList,
        getList,
        setTitle,
        item: { title, _id },
      },
    } = useStores();

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

    const onSubmit = async () => {
      if (_id) {
        // await editList
      } else {
        await addNewList();
      }
    };

    return (
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={closeDrawer}
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
          <Typography variant="h5">{`${_id ? "Edit" : "Add"} List`}</Typography>
        </AppBar>
        <TextField
          id="listTitle"
          label="List Title"
          variant="standard"
          onChange={onTitleChange}
          sx={{ m: 2 }}
          value={title}
        />
        <Typography variant="h6" sx={{ mx: 2 }}>
          Tasks:
        </Typography>
        <Divider sx={{ mx: 2 }} />
        {/* <TasksEditor /> */}

        <Button
          variant="contained"
          onClick={onSubmit}
          sx={{ mx: 2 }}
          disabled={title.length === 0}
        >
          {`${_id ? "Update" : "Create"} List`}
        </Button>
      </Drawer>
    );
  }
);

export default ListDrawer;
