import { LoginFormInputs } from "features/auth/components/LoginForm";
import { axios } from "api";
import { SignUpFormInputs } from "features/auth/components/SignUpForm";
import { LoggedUser } from "models/user";

export const auth = {
  login: async (credentials: LoginFormInputs) => {
    const { data } = await axios.post<LoggedUser>("auth/login", credentials);
    return data;
  },
  signUp: async (credentials: SignUpFormInputs) => {
    const { data } = await axios.post("auth/signup", credentials);
    return data;
  },
  getLoggedUser: async (token: string) => {
    const { data } = await axios.get<LoggedUser>("users/logged", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },
};
