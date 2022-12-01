export * from "./axios";
import { auth } from "./auth";
import { queries } from "./queries";

const api = {
  auth,
  queries,
};

export default api;
