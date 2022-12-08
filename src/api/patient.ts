import { axios } from "api";
import models from "models";

export const patient = {
  getAll: async () => {
    const { data } = await axios.get("/patients");
    return data;
  },
  create: async (newPatient: models.Patient) => {
    const { data } = await axios.post("/patients", newPatient);
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
};
