import Avatar from "@mui/material/Avatar";

import { stringToColor } from "utils";

interface InitialsAvatarProps {
  name: string;
  surname: string;
}

export const InitialsAvatar = ({ name, surname }: InitialsAvatarProps) => {
  const initials = `${name[0]}${surname[0]}`;
  return (
    <Avatar sx={{ bgcolor: stringToColor(initials) }} variant="rounded">
      {initials}
    </Avatar>
  );
};
