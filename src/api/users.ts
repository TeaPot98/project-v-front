import models from "models";
import { axios } from "api";

export const users = {
  getAll: async () => {
    const response = await axios.get<models.User[]>("users");
    return response.data;
  },
};

export const queries = {
  all: () => ({
    queryKey: ["users"],
    queryFn: users.getAll,
  }),
};
