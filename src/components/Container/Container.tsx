import Box from "@mui/material/Box";
import { DrawerHeader } from "components";

export const Container = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
    </Box>
  );
};
