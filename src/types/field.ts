export interface FieldGroup {
  id: string;
  name: string;
  fields: Field[];
}

export interface Field {
  id: string;
  type: FieldType;
  name: string;
}

export enum FieldType {
  TEXT = "text",
  TEXTAREA = "textarea",
  NUMBER = "number",
  RANGE = "range",
  DATE = "date",
}
