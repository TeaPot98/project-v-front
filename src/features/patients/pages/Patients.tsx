import { useQuery } from "@tanstack/react-query";

import Box from "@mui/material/Box";

import { Table, TableColumn } from "components";
import models from "models";
import api from "api";

export const Patients = () => {
  const { data } = useQuery({ ...api.queries.patient.all() });
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

  return (
    <Box sx={{ overflowY: "hidden", height: "100%" }}>
      <Table columns={columns} rows={data} />
    </Box>
  );
};
