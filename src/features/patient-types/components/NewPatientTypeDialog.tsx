import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { Field } from "types";
import { UserContext } from "context";
import { useMutation } from "@tanstack/react-query";
import api from "api";
import models from "models";

interface DialogProps {
  open: boolean;
  onClose?: () => void;
  onConfirm?: (value: models.PatientType) => void;
  modalState?: { field?: Field; groupFieldId: string };
}

interface Inputs {
  name: string;
}

export const NewPatientTypeDialog = ({
  open,
  onClose,
  onConfirm,
}: DialogProps) => {
  const { user } = useContext(UserContext);
  const { handleSubmit, register } = useForm<Inputs>();

  const createMutation = useMutation(api.patientType.create, {
    onSuccess: (data) => onConfirm?.(data),
  });

  const onSubmit: SubmitHandler<Inputs> = (values) => {
    createMutation.mutate({
      name: values.name,
      author: {
        id: user!.id,
        name: user!.name,
        surname: user!.surname,
      },
      fieldGroups: [],
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>New patient type</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="field-name"
            label="Field name"
            fullWidth
            variant="standard"
            defaultValue=""
            {...register("name")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Confirm</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
