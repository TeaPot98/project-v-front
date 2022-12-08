import { axios } from "api";
import models from "models";

export const patient = {
  create: async (newPatient: models.Patient) => {
    const { data } = await axios.post("/patients", newPatient);
    return data;
  },
  getAll: async () => {
    const { data } = await axios.get("/patients");
    return data;
  },
  getById: async (id: string) => {
    const { data } = await axios.get(`/patients/${id}`);
    return data;
  },
  update: async (updatedPatient: models.Patient) => {
    const { data } = await axios.put(
      `/patients/${updatedPatient.id}`,
      updatedPatient
    );
    return data;
  },
  remove: async (id: string) => {
    const { data } = await axios.delete(`/patients/${id}`);
    return data;
  },
};

export const patientQueries = {
  all: () => ({
    queryKey: ["patients"],
    queryFn: () => patient.getAll(),
  }),
  byId: (id: string) => ({
    queryKey: ["patients", id],
    queryFn: () => patient.getById(id),
  }),
};
