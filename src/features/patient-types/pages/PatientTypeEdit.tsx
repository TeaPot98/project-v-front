import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { FieldGroup, FieldType } from "types";
import { PatientTypeField } from "../components";

export const PatientTypeEdit = () => {
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const [fieldGroups, setFieldGroups] = useState<FieldGroup[]>([]);

  const handleChange =
    (panelId: string) =>
    (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded((prevState) => {
        return isExpanded
          ? [...prevState, panelId]
          : prevState.filter((id) => id !== panelId);
      });
    };

  const addGroupField = () => {
    setFieldGroups((prevState) => [
      ...prevState,
      { id: uuidv4(), name: "General information", fields: [] },
    ]);
  };

  const editGroupName = (event: React.SyntheticEvent) => {
    event.stopPropagation();
  };

  return (
    <Box>
      {fieldGroups.map((fieldGroup, i) => (
        <Accordion
          key={fieldGroup.id}
          expanded={expanded.includes(fieldGroup.id)}
          onChange={handleChange(fieldGroup.id)}
          aria-controls={`panel${i + 1}-content`}
          id={`panel${i + 1}-header`}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              <IconButton onClick={editGroupName}>
                <EditIcon />
              </IconButton>
              {fieldGroup.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {fieldGroup.fields.map((field) => (
              <PatientTypeField
                key={field.id}
                type={field.type}
                name={field.name}
              />
            ))}
            <PatientTypeField type={FieldType.TEXT} name="Name Surname" />
          </AccordionDetails>
        </Accordion>
      ))}
      <Button
        fullWidth
        variant="outlined"
        sx={{
          borderStyle: "dashed",
          "&:hover": {
            borderStyle: "dashed",
          },
        }}
        onClick={addGroupField}
      >
        + New Field Group
      </Button>
    </Box>
  );
};
