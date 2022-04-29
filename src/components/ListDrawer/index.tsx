import { AppBar, Divider, Drawer } from "@mui/material";
import { FC, ChangeEvent } from "react";
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
        setTitle,
        item: { title, _id },
      },
    } = useStores();

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    };

    const onCreateSubmit = async () => {
      await addNewList();
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
        {!_id && (
          <Button
            variant="contained"
            onClick={onCreateSubmit}
            sx={{ mx: 2 }}
            disabled={title.length === 0}
          >
            Create List
          </Button>
        )}
      </Drawer>
    );
  }
);

export default ListDrawer;
