import Box from "@mui/material/Box";
import { useQuery } from "@tanstack/react-query";
import api from "api";

import { Table, TableColumn } from "components";
import { PatientType } from "models/patient-type";

export const PatientTypes = () => {
  const { data } = useQuery({ ...api.queries.patientType.all() });
  const columns: TableColumn[] = [
    { id: "name", label: "Name", minWidth: 170 },
    {
      id: "author",
      label: "Author",
      minWidth: 170,
      align: "right",
      format: (value: PatientType["author"]) =>
        `${value.name} ${value.surname}`,
    },
  ];

  return (
    <Box sx={{ overflowY: "hidden", height: "100%" }}>
      <Table columns={columns} rows={data} />
    </Box>
  );
};
