import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import { AuthPage, ChangePasswordPage } from "features/auth/pages";
import { UserContext } from "context";
import { Layout } from "components";

const App = () => {
  const { user } = useContext(UserContext);
  console.log(user);

  return (
    <Box className="App">
      <CssBaseline />
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Navigate to="/patients" />} />
            <Route path="/*" element={<Layout />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
          )}
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </Box>
  );
};

export default App;
