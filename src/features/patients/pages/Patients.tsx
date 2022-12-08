import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { ConfirmationDialog, Table, TableColumn } from "components";
import models from "models";
import api from "api";

interface DeleteModalState {
  open: boolean;
  message: string;
  patientId: string;
}

export const Patients = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [modalState, setModalState] = useState<DeleteModalState>({
    open: false,
    message: "",
    patientId: "",
  });

  const { data: patients } = useQuery({ ...api.queries.patient.all() });

  const deleteMutation = useMutation(api.patient.remove, {
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: api.queries.patient.all().queryKey,
      }),
  });

  const columns: TableColumn[] = [
    { id: "name", label: "Prenume" },
    { id: "surname", label: "Nume" },
    {
      id: "author",
      label: "Autor",
      minWidth: 170,
      align: "right",
      format: (value: models.Patient) =>
        `${value.author.name} ${value.author.surname}`,
    },
    {
      id: "actions",
      label: "Actions",
      format: (value: models.Patient) => (
        <>
          <IconButton onClick={() => navigate(`/patients/edit/${value.id}`)}>
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setModalState({
                open: true,
                message: `patient ${value.name} ${value.surname}`,
                patientId: value.id,
              });
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];
  const { data: patientTypes } = useQuery({ ...api.queries.patientType.all() });

  const closeDeleteModal = () => {
    setModalState({ open: false, message: "", patientId: "" });
  };

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
                    navigate(`/patients/create/${patientType.id}`);
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
      <ConfirmationDialog
        open={modalState.open}
        title="Delete"
        contentText={`Are you sure you want to delete ${modalState.message} ?`}
        onClose={closeDeleteModal}
        onConfirm={() => {
          deleteMutation.mutate(modalState.patientId);
          closeDeleteModal();
        }}
      />
    </Box>
  );
};
