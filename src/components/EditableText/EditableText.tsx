import { useState } from "react";

import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

interface EditableTextProps {
  onAccept: (value: string) => void;
  initialValue: string;
  onEdit?: () => void;
  onCancel?: () => void;
  isActive?: boolean;
  label?: string;
}

export const EditableText = ({
  onAccept,
  onEdit,
  onCancel,
  isActive,
  initialValue,
  label,
}: EditableTextProps) => {
  const [active, setActive] = useState(!!isActive);
  const [value, setValue] = useState(initialValue);

  const cancel = () => {
    if (onCancel) return onCancel();
    return setActive(false);
  };

  const edit = () => {
    if (onEdit) return onEdit();
    return setActive(true);
  };

  return (
    <>
      {(isActive !== undefined ? isActive : active) ? (
        <Box>
          <TextField
            autoFocus
            size="small"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            onClick={(e) => e.stopPropagation()}
            label={label}
          />
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onAccept(value);
              cancel();
            }}
          >
            <CheckIcon />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              cancel();
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      ) : (
        <Typography sx={{ width: "33%", flexShrink: 0 }}>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              edit();
            }}
          >
            <EditIcon />
          </IconButton>
          {initialValue}
        </Typography>
      )}
    </>
  );
};
