import * as React from "react";
import Box from "@mui/material/Box";
import { Menu, TopBar, Container } from "components";
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
    <Box sx={{ display: "flex", height: "100%" }}>
      <CssBaseline />
      <TopBar drawerOpen={open} handleMenuOpen={handleMenuOpen} />
      <Menu open={open} onClose={handleMenuClose} />
      <Container />
    </Box>
  );
};
