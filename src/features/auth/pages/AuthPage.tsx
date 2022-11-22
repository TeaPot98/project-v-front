import Box from "@mui/material/Box";

import { LoginForm } from "../components/LoginForm";
import { SignUpForm } from "../components/SignUpForm";

interface AuthPageProps {
  login?: boolean;
}

export const AuthPage = ({ login = false }: AuthPageProps) => {
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
      {login ? <LoginForm /> : <SignUpForm />}
    </Box>
  );
};
