import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  FieldFormDialog,
  FormDialogProps,
  PatientTypeField,
} from "../components";
import { Field } from "types";
import { FieldGroup } from "types";
import { ConfirmationDialog, EditableText } from "components";
import { PatientField } from "features/patients/components";

interface FieldGroupsProps {
  fieldGroups: FieldGroup[];
  onChange: (value: FieldGroup[]) => void;
  isPatient?: boolean;
}

export const FieldGroups = ({
  fieldGroups,
  onChange,
  isPatient = false,
}: FieldGroupsProps) => {
  const [expanded, setExpanded] = React.useState<string[]>([]);

  const [formModalOpen, setFormModalOpen] = useState(false);
  const formModalState = useRef<FormDialogProps["modalState"]>();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const deleteModalState = useRef<{
    message: string;
    groupId: string;
    fieldId?: string;
  }>();

  const [groupEditId, setGroupEditId] = useState<string>();

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
    const id = uuidv4();
    setGroupEditId(id);
    onChange([...fieldGroups, { id, name: "", fields: [] }]);
  };

  const closeFormModal = () => {
    setFormModalOpen(false);
    formModalState.current = undefined;
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setTimeout(() => {
      deleteModalState.current = undefined;
    }, 0);
  };

  const editField = (fieldGroup: FieldGroup, field: Field) => {
    formModalState.current = {
      groupFieldId: fieldGroup.id,
      field,
    };
    setFormModalOpen(true);
  };

  const deleteField = (fieldGroup: FieldGroup, field: Field) => {
    deleteModalState.current = {
      message: `field ${field.name} of type ${field.type}`,
      groupId: fieldGroup.id,
      fieldId: field.id,
    };
    setDeleteModalOpen(true);
  };

  const saveField = (values: Omit<Field, "id">) => {
    if (!formModalState.current?.field?.id) {
      const newField = {
        ...values,
        id: uuidv4(),
      };
      onChange(
        fieldGroups.map((fieldGroup) =>
          fieldGroup.id === formModalState.current?.groupFieldId
            ? { ...fieldGroup, fields: [...fieldGroup.fields].concat(newField) }
            : fieldGroup
        )
      );
    } else {
      onChange(
        fieldGroups.map((fieldGroup) => {
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
    closeFormModal();
  };
  return (
    <>
      {fieldGroups.map((fieldGroup, i) => (
        <Accordion
          key={fieldGroup.id}
          expanded={expanded.includes(fieldGroup.id)}
          onChange={handleChange(fieldGroup.id)}
          aria-controls={`panel${i + 1}-content`}
          id={`panel${i + 1}-header`}
          disableGutters
          elevation={0}
        >
          <Box sx={{ display: "flex" }}>
            <AccordionSummary
              sx={{ flexGrow: 1 }}
              expandIcon={<ExpandMoreIcon />}
            >
              <EditableText
                isActive={groupEditId === fieldGroup.id}
                initialValue={fieldGroup.name}
                onEdit={() => setGroupEditId(fieldGroup.id)}
                onAccept={(value) =>
                  onChange(
                    fieldGroups.map((fieldGr) =>
                      fieldGr.id === fieldGroup.id
                        ? { ...fieldGr, name: value }
                        : fieldGr
                    )
                  )
                }
                onCancel={() => setGroupEditId("")}
              />
            </AccordionSummary>
            <IconButton
              onClick={() => {
                deleteModalState.current = {
                  message: `field group ${fieldGroup.name}`,
                  groupId: fieldGroup.id,
                };
                setDeleteModalOpen(true);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
          <AccordionDetails>
            {fieldGroup.fields.map((field) =>
              isPatient ? (
                <PatientField
                  key={field.id}
                  type={field.type}
                  name={field.name}
                  value={field.content || ""}
                  onEdit={() => editField(fieldGroup, field)}
                  onDelete={() => deleteField(fieldGroup, field)}
                />
              ) : (
                <PatientTypeField
                  key={field.id}
                  type={field.type}
                  name={field.name}
                  onEdit={() => editField(fieldGroup, field)}
                  onDelete={() => deleteField(fieldGroup, field)}
                />
              )
            )}
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
          mt: "1rem",
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
        onClose={closeFormModal}
        onConfirm={saveField}
      />
      <ConfirmationDialog
        open={deleteModalOpen}
        title="Delete"
        contentText={`Are you sure you want to delete ${deleteModalState.current?.message} ?`}
        onClose={closeDeleteModal}
        onConfirm={() => {
          onChange(
            (() => {
              const fieldId = deleteModalState.current?.fieldId;
              const groupId = deleteModalState.current?.groupId;
              if (fieldId) {
                return fieldGroups.map((fieldGroup) => {
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
                return fieldGroups.filter(
                  (fieldGroup) => fieldGroup.id !== groupId
                );
              }
              return fieldGroups;
            })()
          );
          closeDeleteModal();
        }}
      />
    </>
  );
};
