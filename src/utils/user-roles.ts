import { UserRole } from "models/user";

export const userRoles: { key: UserRole; label: string }[] = [
  {
    key: UserRole.ADMIN,
    label: "Admin",
  },
  {
    key: UserRole.MODERATOR,
    label: "Moderator",
  },
  {
    key: UserRole.USER,
    label: "User",
  },
];
