import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState, useContext } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { FieldGroups } from "features/patient-types/components";
import models from "models";
import api from "api";
import { preventQueryRefetch } from "utils";
import { UserContext } from "context";
import { EditableText } from "components";

export const PatientEdit = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [formState, setFormState] = useState<models.Patient>({
    id: "",
    name: "Prenume",
    surname: "Nume",
    author: {
      name: user!.name,
      surname: user!.surname,
      id: user!.id,
    },
    fieldGroups: [],
  });

  const updateMutation = useMutation(api.patient.update);

  const { isLoading, data } = useQuery({
    ...api.queries.patient.byId(id!),
    enabled: !!id,
    onSuccess: (data) => setFormState(data),
    ...preventQueryRefetch(),
  });

  if (isLoading || !data) return <></>;

  return (
    <Box>
      <Button
        variant="contained"
        sx={{ display: "block", mb: "1rem", ml: "auto" }}
        onClick={() => updateMutation.mutate(formState)}
      >
        Save
      </Button>
      <Box
        sx={{
          bgcolor: "white",
          p: "1rem 1.5rem",
          display: "flex",
          flexWrap: "wrap",
          // flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.5rem",
          borderRadius: "0.25rem",
          borderBottomLeftRadius:
            formState.fieldGroups.length > 0 ? "0rem" : "auto",
          borderBottomRightRadius:
            formState.fieldGroups.length > 0 ? "0rem" : "auto",
        }}
      >
        <EditableText
          label="Prenume"
          initialValue={formState.name}
          onAccept={(value) =>
            setFormState((prevState) => ({ ...prevState, name: value }))
          }
        />
        <EditableText
          label="Nume"
          initialValue={data.surname}
          onAccept={(value) =>
            setFormState((prevState) => ({ ...prevState, surname: value }))
          }
        />
      </Box>
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
