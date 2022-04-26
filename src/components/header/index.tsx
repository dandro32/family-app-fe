import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import UserIcon from "@mui/icons-material/PersonOutline";
import { Button, Popover } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStores } from "../../store";

interface HeaderProps {
  onHamburgerClick: () => void;
}

const Header: React.FC<HeaderProps> = observer(({ onHamburgerClick }) => {
  const { auth } = useStores();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogut = () => {
    auth.logout();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onHamburgerClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {`Daniel and Paulina Familly App`}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="subtitle2">User:&nbsp;</Typography>
            <Typography variant="body2">{auth.me.username}</Typography>
            <IconButton color="inherit" onClick={handleClick}>
              <UserIcon />
            </IconButton>
          </Box>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <Button color="primary" onClick={handleLogut} sx={{ m: 2 }}>
              Logout
            </Button>
          </Popover>
        </Toolbar>
      </AppBar>
    </Box>
  );
});

export default Header;
