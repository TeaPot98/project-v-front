import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import DeleteIcon from "@mui/icons-material/Delete";

import api from "api";
import { ConfirmationDialog, Table, TableColumn } from "components";
import { userRoles } from "utils";
import models from "models";
import { useState } from "react";
import { NewUserDialog } from "../components/NewUserDialog";

interface DeleteModalState {
  open: boolean;
  message: string;
  userId: string;
}

export const Users = () => {
  const [newUserModalOpen, setNewUserModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const [deleteModalState, setDeleteModalState] = useState<DeleteModalState>({
    open: false,
    message: "",
    userId: "",
  });

  const deleteMutation = useMutation(api.users.remove, {
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: api.queries.users.all().queryKey,
      }),
  });

  const { data, isLoading } = useQuery({ ...api.queries.users.all() });
  const columns: TableColumn[] = [
    {
      id: "name",
      label: "Name",
      minWidth: 170,
      format: (value: models.User) => `${value.name} ${value.surname}`,
    },
    {
      id: "username",
      label: "Username",
      minWidth: 170,
      align: "right",
    },
    {
      id: "role",
      label: "Role",
      minWidth: 170,
      align: "right",
    },
    {
      id: "actions",
      label: "Actions",
      format: (value: models.User) => (
        <>
          <IconButton
            onClick={() => {
              setDeleteModalState({
                open: true,
                message: `user ${value.name} ${value.surname}`,
                userId: value.id,
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
    setDeleteModalState({ open: false, message: "", userId: "" });
  };

  const users =
    data?.map((u) => {
      const userRole: string =
        userRoles.find((r) => r.key === u.role)?.label || "";
      const rowUser = { ...u, role: userRole };
      return rowUser;
    }) || [];

  return (
    <Box sx={{ overflowY: "hidden", height: "100%" }}>
      <Button
        variant="contained"
        sx={{ float: "right", mb: "1rem" }}
        onClick={() => {
          setNewUserModalOpen(true);
        }}
      >
        New User
      </Button>
      <Table isLoading={isLoading} columns={columns} rows={users} />
      <NewUserDialog
        open={newUserModalOpen}
        onClose={() => setNewUserModalOpen(false)}
        onConfirm={() => {
          setNewUserModalOpen(false);
        }}
      />
      <ConfirmationDialog
        open={deleteModalState.open}
        title="Delete"
        contentText={`Are you sure you want to delete ${deleteModalState.message} ?`}
        onClose={closeDeleteModal}
        onConfirm={() => {
          deleteMutation.mutate(deleteModalState.userId);
          closeDeleteModal();
        }}
      />
    </Box>
  );
};
