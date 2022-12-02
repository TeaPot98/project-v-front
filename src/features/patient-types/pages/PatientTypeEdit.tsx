import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import { Field, FieldGroup } from "types";
import {
  FieldFormDialog,
  FormDialogProps,
  PatientTypeField,
} from "../components";
import { ConfirmationDialog } from "components";

export const PatientTypeEdit = () => {
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const [fieldGroups, setFieldGroups] = useState<FieldGroup[]>([]);

  const [formModalOpen, setFormModalOpen] = useState(false);
  const formModalState = useRef<FormDialogProps["modalState"]>();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const deleteModalState = useRef<{
    message: string;
    fieldId: string;
    groupId: string;
  }>();

  const [groupEdit, setGroupEdit] = useState<{ id: string; value: string }>();

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

  const saveField = (values: Omit<Field, "id">) => {
    if (!formModalState.current?.field?.id) {
      const newField = {
        ...values,
        id: uuidv4(),
      };
      setFieldGroups((prevState) =>
        prevState.map((fieldGroup) =>
          fieldGroup.id === formModalState.current?.groupFieldId
            ? { ...fieldGroup, fields: [...fieldGroup.fields].concat(newField) }
            : fieldGroup
        )
      );
    } else {
      setFieldGroups((prevState) =>
        prevState.map((fieldGroup) => {
          if (fieldGroup.id === formModalState.current?.groupFieldId) {
            return {
              ...fieldGroup,
              fields: fieldGroup.fields.map((field) =>
                field.id === formModalState.current?.field?.id
                  ? { ...values, id: field.id }
                  : field
              ),
            };
          }
          return fieldGroup;
        })
      );
    }
    formModalState.current = undefined;
    setFormModalOpen(false);
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
            {groupEdit?.id === fieldGroup.id ? (
              <>
                <TextField
                  autoFocus
                  size="small"
                  onChange={(e) =>
                    setGroupEdit({
                      id: fieldGroup.id,
                      value: e.target.value,
                    })
                  }
                  value={groupEdit.value}
                  onClick={(e) => e.stopPropagation()}
                />
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setFieldGroups((prevState) =>
                      prevState.map((fieldGr) =>
                        fieldGr.id === fieldGroup.id
                          ? { ...fieldGr, name: groupEdit?.value }
                          : fieldGr
                      )
                    );
                    setGroupEdit(undefined);
                  }}
                >
                  <CheckIcon />
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setGroupEdit(undefined);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </>
            ) : (
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setGroupEdit({
                      value: fieldGroup.name,
                      id: fieldGroup?.id,
                    });
                  }}
                >
                  <EditIcon />
                </IconButton>
                {fieldGroup.name}
              </Typography>
            )}
          </AccordionSummary>
          <AccordionDetails>
            {fieldGroup.fields.map((field) => (
              <PatientTypeField
                key={field.id}
                type={field.type}
                name={field.name}
                onEdit={() => {
                  formModalState.current = {
                    groupFieldId: fieldGroup.id,
                    field,
                  };
                  setFormModalOpen(true);
                }}
                onDelete={() => {
                  deleteModalState.current = {
                    message: `field ${field.name} of type ${field.type}`,
                    groupId: fieldGroup.id,
                    fieldId: field.id,
                  };
                  setDeleteModalOpen(true);
                }}
              />
            ))}
            <Button
              variant="outlined"
              sx={{
                display: "block",
                mx: "auto",
                borderStyle: "dashed",
                "&:hover": {
                  borderStyle: "dashed",
                },
              }}
              onClick={() => {
                formModalState.current = { groupFieldId: fieldGroup.id };
                setFormModalOpen(true);
              }}
            >
              + New Field
            </Button>
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
      <FieldFormDialog
        open={formModalOpen}
        modalState={formModalState.current}
        onClose={() => {
          setFormModalOpen(false);
          formModalState.current = undefined;
        }}
        onConfirm={saveField}
      />
      <ConfirmationDialog
        open={deleteModalOpen}
        title="Delete"
        contentText={`Are you sure you want to delete ${deleteModalState.current?.message} ?`}
        onClose={() => {
          deleteModalState.current = undefined;
          setDeleteModalOpen(false);
        }}
        onConfirm={() => {
          setFieldGroups((prevState) => {
            const fieldId = deleteModalState.current?.fieldId;
            const groupId = deleteModalState.current?.groupId;
            if (fieldId) {
              return prevState.map((fieldGroup) => {
                if (fieldGroup.id === groupId) {
                  return {
                    ...fieldGroup,
                    fields: fieldGroup.fields.filter(
                      (field) => field.id !== fieldId
                    ),
                  };
                }
                return fieldGroup;
              });
            } else if (groupId) {
              return prevState.filter(
                (fieldGroup) => fieldGroup.id !== groupId
              );
            }
            return prevState;
          });
          deleteModalState.current = undefined;
          setDeleteModalOpen(false);
        }}
      />
    </Box>
  );
};