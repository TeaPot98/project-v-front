import { useState } from "react";

import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { FieldType } from "types";

interface PatientFieldProps {
  type: FieldType;
  name: string;
  value: string | number;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const PatientField = ({
  type,
  name,
  value,
  onEdit,
  onDelete,
}: PatientFieldProps) => {
  const [stateValue, setStateValue] = useState(value);

  const renderField = (
    fieldType: FieldType,
    fieldValue: string | number,
    label: string
  ) => {
    switch (fieldType) {
      case FieldType.TEXT:
        return (
          <TextField
            fullWidth
            size="small"
            value={fieldValue}
            label={label}
            onChange={(e) => setStateValue(e.target.value)}
          />
        );
      case FieldType.TEXTAREA:
        return (
          <TextField
            fullWidth
            multiline
            value={fieldValue}
            label={label}
            onChange={(e) => setStateValue(e.target.value)}
          />
        );
      case FieldType.NUMBER:
        return (
          <TextField
            fullWidth
            size="small"
            value={fieldValue}
            label={label}
            type="number"
            onChange={(e) => setStateValue(e.target.value)}
          />
        );
      default:
        break;
    }
  };

  return (
    <Box sx={{ position: "relative", p: "1rem", display: "flex" }}>
      {renderField(type, stateValue, name)}
      <Box sx={{ display: "flex" }}>
        {onEdit && (
          <IconButton onClick={onEdit}>
            <EditIcon />
          </IconButton>
        )}
        {onDelete && (
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};
