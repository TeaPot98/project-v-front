import * as React from "react";
import Box from "@mui/material/Box";
import { Menu, DrawerHeader, TopBar } from "components";
import CssBaseline from "@mui/material/CssBaseline";

export const Layout = () => {
  const [open, setOpen] = React.useState(true);

  const handleMenuOpen = () => {
    setOpen(true);
  };

  const handleMenuClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TopBar drawerOpen={open} handleMenuOpen={handleMenuOpen} />
      <Menu open={open} onClose={handleMenuClose} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
};
