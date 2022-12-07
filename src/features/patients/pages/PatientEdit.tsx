import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { FieldGroups } from "features/patient-types/components";
import models from "models";
import { useQuery } from "@tanstack/react-query";
import api from "api";
import { useParams } from "react-router-dom";
import { preventQueryRefetch } from "utils";

export const PatientEdit = () => {
  const { typeId } = useParams();

  const [formState, setFormState] = useState<models.Patient>({
    id: "",
    author: {
      name: "",
      surname: "",
      id: "",
    },
    fieldGroups: [],
  });

  const { isLoading } = useQuery({
    ...api.queries.patientType.byId(typeId!),
    enabled: !!typeId,
    onSuccess: (data) =>
      setFormState((prevState) => ({
        ...prevState,
        fieldGroups: data.fieldGroups,
      })),
    ...preventQueryRefetch(),
  });

  return (
    <Box>
      <Button
        variant="contained"
        sx={{ display: "block", mb: "1rem", ml: "auto" }}
        onClick={() => console.log("saved")}
      >
        Save
      </Button>
      <FieldGroups
        isPatient={true}
        fieldGroups={formState.fieldGroups}
        onChange={(value) =>
          setFormState((prevState) => ({ ...prevState, fieldGroups: value }))
        }
      />
    </Box>
  );
};
