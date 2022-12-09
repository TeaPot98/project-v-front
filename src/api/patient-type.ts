import { axios } from "api";
import models from "models";

export const patientType = {
  create: async (patientType: models.NewPatientType) => {
    const { data } = await axios.post<models.PatientType>(
      "/patient-types",
      patientType
    );
    return data;
  },
  getAll: async () => {
    const { data } = await axios.get<models.PatientType[]>("/patient-types");
    return data;
  },
  getById: async (id: string) => {
    const { data } = await axios.get<models.PatientType>(
      `/patient-types/${id}`
    );
    return data;
  },
  edit: async (patientType: models.PatientType) => {
    const { data } = await axios.put<models.PatientType>(
      `/patient-types/${patientType.id}`
    );
    return data;
  },
  remove: async (id: string) => {
    const { data } = await axios.delete(`/patient-types/${id}`);
    return data;
  },
};

export const patientTypeQueries = {
  all: () => ({
    queryKey: ["patient-types"],
    queryFn: () => patientType.getAll(),
  }),
  byId: (id: string) => ({
    queryKey: ["patient-types", id],
    queryFn: () => patientType.getById(id),
  }),
};
