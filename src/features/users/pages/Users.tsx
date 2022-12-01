import Box from "@mui/material/Box";
import { useQuery } from "@tanstack/react-query";
import api from "api";

import { Table, TableColumn } from "components";
import { userRoles } from "utils";

export const Users = () => {
  const { data } = useQuery({ ...api.queries.users.all() });
  const columns: TableColumn[] = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "surname", label: "Surname", minWidth: 100 },
    {
      id: "username",
      label: "Username",
      minWidth: 170,
      align: "right",
      format: (value: number) => value.toLocaleString("en-US"),
    },
    {
      id: "role",
      label: "Role",
      minWidth: 170,
      align: "right",
      format: (value: number) => value.toLocaleString("en-US"),
    },
  ];

  const users =
    data?.map((u) => {
      const userRole: string =
        userRoles.find((r) => r.key === u.role)?.label || "";
      const rowUser = { ...u, role: userRole };
      return rowUser;
    }) || [];

  return (
    <Box sx={{ overflowY: "hidden", height: "100%" }}>
      <Table columns={columns} rows={users} />
    </Box>
  );
};
