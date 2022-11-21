import { AppBar } from "components";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

interface TopBarProps {
  drawerOpen: boolean;
  handleMenuOpen: () => void;
}

export const TopBar = ({ drawerOpen, handleMenuOpen }: TopBarProps) => {
  return (
    <AppBar position="fixed" drawerOpen={drawerOpen} elevation={0}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleMenuOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(drawerOpen && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Mini variant drawer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
