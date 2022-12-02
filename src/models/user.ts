export interface User {
  id: string;
  name: string;
  surname: string;
  username: string;
  role: UserRole;
}

export interface LoggedUser extends User {
  token: string;
}

export enum UserRole {
  ADMIN = "admin",
  MODERATOR = "moderator",
  USER = "user",
}
