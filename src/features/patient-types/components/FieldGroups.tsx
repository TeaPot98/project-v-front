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
import DeleteIcon from "@mui/icons-material/Delete";

import { Field } from "types";
import { FieldGroup } from "types";
import {
  FieldFormDialog,
  FormDialogProps,
  PatientTypeField,
} from "../components";
import { ConfirmationDialog } from "components";

interface FieldGroupsProps {
  fieldGroups: FieldGroup[];
  onChange: (value: FieldGroup[]) => void;
}

export const FieldGroups = ({ fieldGroups, onChange }: FieldGroupsProps) => {
  const [expanded, setExpanded] = React.useState<string[]>([]);

  const [formModalOpen, setFormModalOpen] = useState(false);
  const formModalState = useRef<FormDialogProps["modalState"]>();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const deleteModalState = useRef<{
    message: string;
    groupId: string;
    fieldId?: string;
  }>();

  const [groupEdit, setGroupEdit] = useState<{ id?: string; value: string }>();

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
    setGroupEdit({ id, value: "" });
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
                      onChange(
                        fieldGroups.map((fieldGr) =>
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