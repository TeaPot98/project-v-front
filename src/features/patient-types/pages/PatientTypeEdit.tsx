import { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { EditableText } from "components";
import { FieldGroups } from "../components";
import { NewPatientType } from "models/patient-type";
import { UserContext } from "context";
import api from "api";

export const PatientTypeEdit = () => {
  const { user } = useContext(UserContext);

  const [formState, setFormState] = useState<NewPatientType>({
    name: "",
    author: {
      name: user!.name,
      surname: user!.surname,
      id: user!.id,
    },
    fieldGroups: [],
  });

  const createMutation = useMutation((data: NewPatientType) =>
    api.patientType.create(data)
  );

  return (
    <Box>
      <Box
        sx={{
          bgcolor: "white",
          p: "1rem",
          borderRadius:
            formState.fieldGroups.length === 0 ? "0.25rem" : undefined,
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
