import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "api";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import models from "models";
import { Table, TableColumn, ConfirmationDialog } from "components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NewPatientTypeDialog } from "../components";

interface DeleteModalState {
  open: boolean;
  message: string;
  patientTypeId: string;
}

export const PatientTypes = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [modalState, setModalState] = useState<DeleteModalState>({
    open: false,
    message: "",
    patientTypeId: "",
  });

  const { data } = useQuery({ ...api.queries.patientType.all() });

  const deleteMutation = useMutation(api.patientType.remove, {
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: api.queries.patientType.all().queryKey,
      }),
  });

  const columns: TableColumn[] = [
    { id: "name", label: "Name", minWidth: 170 },
    {
      id: "author",
      label: "Author",
      minWidth: 170,
      align: "right",
      format: (value: models.PatientType) =>
        `${value.author.name} ${value.author.surname}`,
    },
    {
      id: "actions",
      label: "Actions",
      format: (value: models.PatientType) => (
        <>
          <IconButton
            onClick={() => navigate(`/patient-types/edit/${value.id}`)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setModalState({
                open: true,
                message: `patient type ${value.name}`,
                patientTypeId: value.id,
              });
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const closeDeleteModal = () => {
    setModalState({ open: false, message: "", patientTypeId: "" });
  };

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
      <ConfirmationDialog
        open={modalState.open}
        title="Delete"
        contentText={`Are you sure you want to delete ${modalState.message} ?`}
        onClose={closeDeleteModal}
        onConfirm={() => {
          deleteMutation.mutate(modalState.patientTypeId);
          closeDeleteModal();
        }}
      />
    </Box>
  );
};
