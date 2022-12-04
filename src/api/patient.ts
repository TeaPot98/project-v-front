import { axios } from "api";

export const patient = {
  getAll: async () => {
    const { data } = await axios.get("/patients");
    return data;
  },
};

export const patientQueries = {
  all: () => ({
    queryKey: ["patients"],
    queryFn: () => patient.getAll(),
  }),
};
