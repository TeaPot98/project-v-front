import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

import { ChangePasswordForm } from "../components/ChangePasswordForm";

export const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/login");
  };

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
      <ChangePasswordForm onSubmit={handleSubmit} />
    </Box>
  );
};
