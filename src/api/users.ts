import { axios } from "api";

export const users = {
  getAll: async () => {
    const response = await axios.get("users");
    return response.data;
  },
};
