import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { SignUpForm } from "features/auth/components";

interface DialogProps {
  open: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
}

export const NewUserDialog = ({ open, onClose, onConfirm }: DialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>New user</DialogTitle>
      <DialogContent>
        <SignUpForm onSubmit={onConfirm} />
      </DialogContent>
    </Dialog>
  );
};
