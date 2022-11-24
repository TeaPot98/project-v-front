import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import CssBaseline from "@mui/material/CssBaseline";

import { AuthPage } from "features/auth/pages/AuthPage";
import { UserContext } from "context";
import { Layout } from "components";

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="App">
      <CssBaseline />
      <Routes>
        <Route
          path="/"
          element={user ? <Layout /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<AuthPage login />} />
      </Routes>
    </div>
  );
};

export default App;
