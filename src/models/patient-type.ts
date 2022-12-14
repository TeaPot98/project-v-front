import { FieldGroup } from "types";
import { Author } from "./user";

export interface PatientType {
  id: string;
  name: string;
  author: Author;
  fieldGroups: FieldGroup[];
}

export type NewPatientType = Omit<PatientType, "id">;
