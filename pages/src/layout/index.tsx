import { Drawer } from "@mui/material";
import { FC, ReactNode, useState } from "react";
import Header from "../Header";
import Menu from "../menu";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const openDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <>
      <Header onHamburgerClick={openDrawer} />
      <Drawer anchor="left" open={isOpen} onClose={closeDrawer}>
        <Menu />
      </Drawer>
      <main>{children}</main>
    </>
  );
};

export default Layout;
