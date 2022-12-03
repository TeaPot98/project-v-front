import models from "models";
import { axios } from "api";

export const users = {
  getAll: async () => {
    const { data } = await axios.get<models.User[]>("users");
    return data;
  },
};

export const userQueries = {
  all: () => ({
    queryKey: ["users"],
    queryFn: users.getAll,
  }),
};
