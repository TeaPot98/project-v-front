import { Routes, Route, Navigate } from "react-router-dom";

import { Layout } from "components";
import { AuthPage } from "features/auth/pages/AuthPage";
import CssBaseline from "@mui/material/CssBaseline";
import { useContext } from "react";
import { UserContext } from "context";

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
