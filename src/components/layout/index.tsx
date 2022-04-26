import { FC, ReactNode, useEffect } from "react";
import { Drawer } from "@mui/material";

import Header from "../header";
import Menu from "../menu";
import { useBoolean } from "../../shared/utils";
import Api from "../../services/api";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [menuIsOpen, openMenu, closeMenu] = useBoolean(false);

  useEffect(() => {
    Api.loginSilently();
  }, []);

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
