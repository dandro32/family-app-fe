import { FC, ReactNode } from "react";
import { Drawer, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import Header from "../header";
import Menu from "../menu";
import { useBoolean } from "../shared/utils";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [menuIsOpen, openMenu, closeMenu] = useBoolean(false);
  const [newListIsOpen, openListDrawer, closeListDrawer] = useBoolean(false);

  return (
    <>
      <Header onHamburgerClick={openMenu} />
      <Drawer anchor="left" open={menuIsOpen} onClose={closeMenu}>
        <Menu />
      </Drawer>
      <Drawer anchor="right" open={newListIsOpen} onClose={closeListDrawer}>
        <div>list drawer</div>
      </Drawer>
      <main>{children}</main>
      <Fab color="primary" onClick={openListDrawer}>
        <AddIcon />
      </Fab>
    </>
  );
};

export default Layout;
