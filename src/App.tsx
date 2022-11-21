import { Routes, Route } from "react-router-dom";

import { Layout } from "components";
import { AuthPage } from "features/auth/pages/AuthPage";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/login" element={<AuthPage login />} />
        <Route path="/register" element={<AuthPage />} />
      </Routes>
    </div>
  );
};

export default App;
