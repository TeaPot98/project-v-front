import { Route, Routes } from "react-router-dom";

import Box from "@mui/material/Box";

import { Users } from "features/users/pages";
import { DrawerHeader } from "components";
import { Patients } from "features/patients/pages";
import { PatientTypes } from "features/patient-types/pages";

export const Container = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <DrawerHeader />
      <Box sx={{ overflowY: "hidden", height: "100%" }}>
        <Routes>
          <Route path="users" element={<Users />} />
          <Route path="patients" element={<Patients />} />
          <Route path="patient-types" element={<PatientTypes />} />
        </Routes>
      </Box>
    </Box>
  );
};
