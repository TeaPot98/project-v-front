import { useQuery } from "@tanstack/react-query";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { Table, TableColumn } from "components";
import models from "models";
import api from "api";

export const Patients = () => {
  const navigate = useNavigate();

  const { data: patients } = useQuery({ ...api.queries.patient.all() });
  const { data: patientTypes } = useQuery({ ...api.queries.patientType.all() });

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
      <PopupState variant="popover">
        {(popupState) => (
          <>
            <Button
              variant="contained"
              sx={{ float: "right", mb: "1rem" }}
              {...bindTrigger(popupState)}
            >
              New Patient
            </Button>
            <Menu {...bindMenu(popupState)}>
              {patientTypes?.map((patientType) => (
                <MenuItem
                  key={patientType.id}
                  onClick={() => {
                    popupState.close();
                    navigate("/patients/create", {
                      state: {
                        patientTypeId: patientType.id,
                      },
                    });
                  }}
                >
                  {patientType.name}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </PopupState>
      <Table columns={columns} rows={patients} />
    </Box>
  );
};
