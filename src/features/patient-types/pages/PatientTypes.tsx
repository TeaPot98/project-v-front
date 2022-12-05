import { useQuery } from "@tanstack/react-query";
import api from "api";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import models from "models";
import { Table, TableColumn } from "components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NewPatientTypeDialog } from "../components";

const columns: TableColumn[] = [
  { id: "name", label: "Name", minWidth: 170 },
  {
    id: "author",
    label: "Author",
    minWidth: 170,
    align: "right",
    format: (value: models.PatientType["author"]) =>
      `${value.name} ${value.surname}`,
  },
];

export const PatientTypes = () => {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data } = useQuery({ ...api.queries.patientType.all() });

  return (
    <Box sx={{ overflowY: "hidden", height: "100%" }}>
      <Button
        variant="contained"
        sx={{ float: "right", mb: "1rem" }}
        onClick={() => setDialogOpen(true)}
      >
        New Patient Type
      </Button>
      <Table columns={columns} rows={data} />
      <NewPatientTypeDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={(newPatientType: models.PatientType) => {
          setDialogOpen(false);
          navigate(`/patient-types/edit/${newPatientType.id}`);
        }}
      />
    </Box>
  );
};
