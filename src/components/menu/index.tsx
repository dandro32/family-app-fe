import React, { FC, ReactNode } from "react";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ClearAll from "@mui/icons-material/ClearAll";
import Link from "next/link";
import { Typography } from "@mui/material";
import styled from "@emotion/styled";

const StyledWrapper = styled("div")(({ theme }: any) => ({
  backgroundColor: theme.palette.secondary.main,
  width: "300px",
  height: "100vh",
  color: "white",
}));

interface MenuConfigItem {
  href: string;
  text: string;
  icon: () => ReactNode;
}

const MENU_CONFIG: MenuConfigItem[] = [
  {
    href: "/lists",
    text: "Lists",
    icon: () => <PlaylistAddIcon fontSize="small" style={{ color: "white" }} />,
  },
  {
    href: "/all-lists",
    text: "All Lists View",
    icon: () => <ClearAll fontSize="small" style={{ color: "white" }} />,
  },
];

const Menu: FC = () => {
  const renderMenuItems = MENU_CONFIG.map(({ icon, text, href }, index) => (
    <Link href={href} key={`menu-item-${index}`} passHref>
      <MenuItem>
        <ListItemIcon>{icon()}</ListItemIcon>
        <ListItemText>
          <Typography variant="h6">{text}</Typography>
        </ListItemText>
      </MenuItem>
    </Link>
  ));

  return (
    <StyledWrapper>
      <MenuList>{renderMenuItems}</MenuList>
    </StyledWrapper>
  );
};

export default Menu;
