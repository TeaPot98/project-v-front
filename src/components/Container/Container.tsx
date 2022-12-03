import { Route, Routes } from "react-router-dom";

import Box from "@mui/material/Box";
import MuiContainer from "@mui/material/Container";

import { Users } from "features/users/pages";
import { DrawerHeader } from "components";
import { Patients } from "features/patients/pages";
import { PatientTypes } from "features/patient-types/pages";
import { PatientTypeEdit } from "features/patient-types/pages";

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
        bgcolor: "gainsboro",
      }}
    >
      <DrawerHeader />
      <MuiContainer sx={{ overflowY: "auto" }}>
        <Routes>
          <Route path="users" element={<Users />} />
          <Route path="patients" element={<Patients />} />
          <Route path="patient-types" element={<PatientTypes />} />
          <Route path="patient-types/create" element={<PatientTypeEdit />} />
        </Routes>
      </MuiContainer>
    </Box>
  );
};
