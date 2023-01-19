import models from "models";
import { axios } from "api";

export const users = {
  getAll: async () => {
    const { data } = await axios.get<models.User[]>("users");
    return data;
  },
  remove: async (userId: string) => {
    const { data } = await axios.delete(`users/${userId}`);
    return data;
  },
};

export const userQueries = {
  all: () => ({
    queryKey: ["users"],
    queryFn: users.getAll,
  }),
};
