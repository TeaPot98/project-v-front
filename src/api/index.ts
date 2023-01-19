export * from "./axios";
import { auth } from "./auth";
import { patientType } from "./patient-type";
import { patient } from "./patient";
import { queries } from "./queries";
import { users } from "./users";

const api = {
  queries,
  auth,
  patientType,
  patient,
  users,
};

export default api;
