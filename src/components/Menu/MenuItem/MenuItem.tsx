import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

interface MenuItemProps {
  menuIsOpen?: boolean;
  icon?: React.ReactNode;
  text?: string;
}

export const MenuItem = ({ menuIsOpen, icon, text }: MenuItemProps) => {
  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: menuIsOpen ? "initial" : "center",
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: menuIsOpen ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} sx={{ opacity: menuIsOpen ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  );
};
