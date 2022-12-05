import { useState } from "react";

import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

interface EditableTextProps {
  onAccept: (value: string) => void;
  onEdit: () => void;
  onCancel: () => void;
  active: boolean;
  initialValue: string;
}

export const EditableText = ({
  onAccept,
  onEdit,
  onCancel,
  active,
  initialValue,
}: EditableTextProps) => {
  const [value, setValue] = useState(initialValue);
  return (
    <>
      {active ? (
        <>
          <TextField
            autoFocus
            size="small"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            onClick={(e) => e.stopPropagation()}
          />
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onAccept(value);
              onCancel();
            }}
          >
            <CheckIcon />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onCancel();
            }}
          >
            <CloseIcon />
          </IconButton>
        </>
      ) : (
        <Typography sx={{ width: "33%", flexShrink: 0 }}>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
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
