import Box from "@mui/material/Box";
import { LoginForm } from "../components/LoginForm";

interface AuthPageProps {
  login?: boolean;
}

export const AuthPage = ({ login = false }: AuthPageProps) => {
  return <Box>{login && <LoginForm />}</Box>;
};
