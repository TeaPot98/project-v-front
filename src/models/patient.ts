import { FieldGroup } from "types";
import { Author } from "./user";

export interface Patient {
  id: string;
  name: string;
  surname: string;
  author: Author;
  fieldGroups: FieldGroup[];
}
