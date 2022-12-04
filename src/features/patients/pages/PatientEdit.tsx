import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";

export const PatientEdit = () => {
  const { typeId } = useParams();

  return <Box>Edit page {typeId}</Box>;
};
