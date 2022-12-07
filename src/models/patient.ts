import { FieldGroup } from "types";
import { Author } from "./user";

export interface Patient {
  id: string;
  author: Author;
  fieldGroups: FieldGroup[];
}
