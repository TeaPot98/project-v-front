export * from "./axios";
import { auth } from "./auth";
import { patientType } from "./patient-type";
import { patient } from "./patient";
import { queries } from "./queries";

const api = {
  queries,
  auth,
  patientType,
  patient,
};

export default api;
