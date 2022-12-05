import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { EditableText } from "components";
import { FieldGroups } from "../components";
import { useParams } from "react-router-dom";

import models from "models";
import api from "api";

export const PatientTypeEdit = () => {
  const { id } = useParams();

  const [formState, setFormState] = useState<models.PatientType>({
    id: "",
    name: "",
    author: {
      name: "",
      surname: "",
      id: "",
    },
    fieldGroups: [],
  });

  const { isLoading, data: patientType } = useQuery({
    ...api.queries.patientType.byId(id!),
    enabled: !!id,
    onSuccess: (data) => setFormState(data),
  });

  const createMutation = useMutation((data: models.PatientType) =>
    api.patientType.create(data)
  );

  if (isLoading || !patientType || !formState) return <div>is Loading</div>;

  return (
    <Box>
      <Box
        sx={{
          bgcolor: "white",
          p: "1rem",
          borderRadius:
            formState?.fieldGroups.length === 0 ? "0.25rem" : undefined,
          borderTopLeftRadius: "0.25rem",
          borderTopRightRadius: "0.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <EditableText
          initialValue={formState.name}
          onAccept={(value) =>
            setFormState((prevState) => ({
              ...prevState,
              name: value,
            }))
          }
        />
        <Button
          variant="contained"
          onClick={() => createMutation.mutate(formState)}
        >
          Save
        </Button>
      </Box>
      <FieldGroups
        fieldGroups={formState.fieldGroups}
        onChange={(value) =>
          setFormState((prevState) => ({ ...prevState, fieldGroups: value }))
        }
      />
    </Box>
  );
};
