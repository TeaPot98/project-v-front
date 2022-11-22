import { LoginFormInputs } from "features/auth/components/LoginForm";
import { axios } from "api";
import { SignUpFormInputs } from "features/auth/components/SignUpForm";

export const auth = {
  login: async (credentials: LoginFormInputs) => {
    const response = await axios.post("auth/login", credentials);
    return response.data;
  },
  signUp: async (credentials: SignUpFormInputs) => {
    const response = await axios.post("auth/signup", credentials);
    return response.data;
  },
};
