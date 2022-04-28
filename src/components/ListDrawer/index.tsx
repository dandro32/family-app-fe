import { AppBar, Drawer } from "@mui/material";
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
        setTitle,
        item: { title, _id },
      },
    } = useStores();

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
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
          <Typography variant="h6">{`${_id ? "Edit" : "Add"} List`}</Typography>
        </AppBar>
        <TextField
          id="username"
          label="Login"
          variant="standard"
          onChange={onTitleChange}
          sx={{ mb: 2 }}
          value={title}
        />
      </Drawer>
    );
  }
);

export default ListDrawer;
