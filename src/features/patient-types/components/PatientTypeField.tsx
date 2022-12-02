import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { FieldType } from "types";

interface PatientTypeFieldProps {
  type: FieldType;
  name: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const PatientTypeField = ({
  type,
  name,
  onEdit,
  onDelete,
}: PatientTypeFieldProps) => {
  return (
    <Box sx={{ position: "relative", p: "1rem", display: "flex" }}>
      <Typography
        sx={{
          position: "absolute",
          top: "0.25rem",
          left: "1.5rem",
          backgroundColor: "white",
          textTransform: "uppercase",
          fontWeight: "600",
          color: "gray",
        }}
      >
        {type}
      </Typography>
      <Box
        sx={{
          border: "1px dashed gray",
          p: "0.375rem 0.5rem",
          borderRadius: "0.5rem",
          flexGrow: 1,
        }}
      >
        <Typography>{name}</Typography>
      </Box>
      <Box>
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
