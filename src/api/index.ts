export * from "./axios";
import { auth } from "./auth";
import { patientType } from "./patient-type";
import { queries } from "./queries";

const api = {
  queries,
  auth,
  patientType,
};

export default api;
