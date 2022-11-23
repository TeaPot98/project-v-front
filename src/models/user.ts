import { UserRole } from "utils";

export interface LoggedUser {
  id: string;
  name: string;
  surname: string;
  username: string;
  role: UserRole;
  token: string;
}
