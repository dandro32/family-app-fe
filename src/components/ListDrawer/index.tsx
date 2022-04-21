import { Drawer } from "@mui/material";
import { FC } from "react";

interface ListDrawerProps {
  isOpen?: boolean;
  closeDrawer: () => void;
}

const ListDrawer: FC<ListDrawerProps> = ({ isOpen = false, closeDrawer }) => {
  return (
    <Drawer anchor="right" open={isOpen} onClose={closeDrawer}>
      test
    </Drawer>
  );
};

export default ListDrawer;
