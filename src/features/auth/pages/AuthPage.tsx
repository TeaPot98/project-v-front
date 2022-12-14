import Box from "@mui/material/Box";

import { LoginForm } from "features/auth/components";

export const AuthPage = () => {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "whitesmoke",
      }}
    >
      <LoginForm />
    </Box>
  );
};
