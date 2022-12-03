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
  getAll: async () => {
    const { data } = await axios.get<PatientType[]>("/patient-types");
    return data;
  },
};

export const patientTypeQueries = {
  all: () => ({
    queryKey: ["patient-types"],
    queryFn: () => patientType.getAll(),
  }),
};
