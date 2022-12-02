import { useForm, SubmitHandler } from "react-hook-form";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { Field, FieldType } from "types";
import { fieldTypes } from "utils";
import { useEffect } from "react";

export interface FormDialogProps {
  open: boolean;
  onClose?: () => void;
  onConfirm?: (values: Inputs, fieldId?: string) => void;
  modalState?: { field?: Field; groupFieldId: string };
}

interface Inputs {
  name: string;
  type: FieldType;
}

export const FieldFormDialog = ({
  modalState,
  open,
  onClose,
  onConfirm,
}: FormDialogProps) => {
  const { handleSubmit, register, reset } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (values) => onConfirm?.(values);

  useEffect(() => {
    reset({
      name: modalState?.field?.name || "",
      type: modalState?.field?.type || FieldType.TEXT,
    });
  }, [modalState]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {modalState?.field ? "Edit field" : "New field"}
      </DialogTitle>
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
          <FormControl fullWidth size="small">
            <InputLabel id="field-type">Field type</InputLabel>
            <Select
              size="small"
              labelId="field-type"
              label="Field type"
              defaultValue={FieldType.TEXT}
              {...register("type")}
            >
              {fieldTypes.map(({ key, label }) => (
                <MenuItem key={key} value={key}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Confirm</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
