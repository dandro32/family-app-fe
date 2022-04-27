import { FC, ReactNode } from "react";
import { Drawer } from "@mui/material";

import Header from "../header";
import Menu from "../menu";
import { useBoolean } from "../../shared/utils";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [menuIsOpen, openMenu, closeMenu] = useBoolean(false);

  return (
    <>
      <Header onHamburgerClick={openMenu} />
      <Drawer anchor="left" open={menuIsOpen} onClose={closeMenu}>
        <Menu />
      </Drawer>
      <main>{children}</main>
    </>
  );
};

export default Layout;
