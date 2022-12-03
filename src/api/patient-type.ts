import { axios } from "api";
import { NewPatientType, PatientType } from "models/patient-type";

export const patientType = {
  create: async (patientType: NewPatientType) => {
    const { data } = await axios.post<PatientType>(
      "/patient-types",
      patientType
    );
    return data;
  },
};
