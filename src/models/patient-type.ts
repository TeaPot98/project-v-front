import { FieldGroup } from "types";

export interface PatientType {
  id: string;
  name: string;
  author: {
    name: string;
    surname: string;
    id: string;
  };
  fieldGroups: FieldGroup[];
}
