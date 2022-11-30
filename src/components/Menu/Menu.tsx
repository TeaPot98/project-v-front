import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import PersonIcon from "@mui/icons-material/Person";

import { Drawer, DrawerHeader } from "components";
import { MenuItem } from "./MenuItem";

interface MenuProps {
  open?: boolean;
  onClose?: () => void;
}

export const Menu = ({ open, onClose }: MenuProps) => {
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <MenuItem text="Users" menuIsOpen={open} icon={<PersonIcon />} />
        <MenuItem text="Patients" menuIsOpen={open} icon={<PersonIcon />} />
        <MenuItem
          text="Patient Types"
          menuIsOpen={open}
          icon={<PersonIcon />}
        />
      </List>
    </Drawer>
  );
};
