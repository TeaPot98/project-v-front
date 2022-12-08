import { useState } from "react";
import { Dayjs } from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { FieldType } from "types";

interface PatientFieldProps {
  type: FieldType;
  name: string;
  value: FieldValue;
  onEdit?: () => void;
  onDelete?: () => void;
  onChange?: (v?: string) => any;
}

type FieldValue = string | number | Dayjs | null;

export const PatientField = ({
  type,
  name,
  value,
  onEdit,
  onDelete,
  onChange,
}: PatientFieldProps) => {
  const [stateValue, setStateValue] = useState<FieldValue>(value || null);

  const handleChange = (v: FieldValue) => {
    onChange?.(v?.toString());
    setStateValue(v);
  };

  const renderField = (
    fieldType: FieldType,
    fieldValue: FieldValue,
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
            onChange={(e) => handleChange(e.target.value)}
          />
        );
      case FieldType.TEXTAREA:
        return (
          <TextField
            fullWidth
            multiline
            value={fieldValue}
            label={label}
            onChange={(e) => handleChange(e.target.value)}
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
            onChange={(e) => handleChange(e.target.value)}
          />
        );
      case FieldType.DATE:
        return (
          <DesktopDatePicker
            label={label}
            inputFormat="MM/DD/YYYY"
            value={stateValue}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        );
      case FieldType.DATETIME:
        return (
          <DateTimePicker
            ampm={false}
            label={label}
            value={stateValue}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        );
      case FieldType.TIME:
        return (
          <TimePicker
            ampm={false}
            label={label}
            value={stateValue}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        );
      default:
        break;
    }
  };

  return (
    <Box sx={{ position: "relative", p: "1rem", display: "flex" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {renderField(type, value, name)}
      </LocalizationProvider>
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
