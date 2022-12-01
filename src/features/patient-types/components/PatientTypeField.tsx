import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { FieldType } from "types";

interface PatientTypeFieldProps {
  type: FieldType;
  name: string;
}

export const PatientTypeField = ({ type, name }: PatientTypeFieldProps) => {
  return (
    <Box sx={{ position: "relative", p: "1rem" }}>
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
        }}
      >
        <Typography>{name}</Typography>
      </Box>
    </Box>
  );
};
