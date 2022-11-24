import { LoginFormInputs } from "features/auth/components/LoginForm";
import { axios } from "api";
import { SignUpFormInputs } from "features/auth/components/SignUpForm";
import { LoggedUser } from "models/user";

export const auth = {
  login: async (credentials: LoginFormInputs) => {
    const response = await axios.post<LoggedUser>("auth/login", credentials);
    return response.data;
  },
  signUp: async (credentials: SignUpFormInputs) => {
    const response = await axios.post("auth/signup", credentials);
    return response.data;
  },
  getLoggedUser: async (token: string) => {
    const response = await axios.get<LoggedUser>("users/logged", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};
