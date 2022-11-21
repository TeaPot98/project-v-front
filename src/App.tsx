import { Routes, Route } from "react-router-dom";

import { Layout } from "components";
import { AuthPage } from "features/auth/pages/AuthPage";
import CssBaseline from "@mui/material/CssBaseline";

const App = () => {
  return (
    <div className="App">
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/login" element={<AuthPage login />} />
        <Route path="/register" element={<AuthPage />} />
      </Routes>
    </div>
  );
};

export default App;
