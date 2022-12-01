import { useQuery } from "@tanstack/react-query";

import CircularProgress from "@mui/material/CircularProgress";

import { LoggedUser } from "models/user";
import api, { initializeAxios } from "api";
import React, { useRef } from "react";
import { preventQueryRefetch } from "utils";

interface UserContextType {
  user?: LoggedUser;
}

export const UserContext = React.createContext<UserContextType>({});

export const UserProvider = ({ children }: React.PropsWithChildren) => {
  const user = useRef<LoggedUser | undefined>();

  const { isLoading } = useQuery(
    ["logged-user"],
    () => {
      const token = window.localStorage.getItem("user-token");
      if (!token) {
        user.current = undefined;
        throw new Error("Invalid token");
      }

      initializeAxios(token);
      return api.auth.getLoggedUser(token);
    },
    {
      onSuccess: (data) => {
        user.current = data;
        initializeAxios(data.token);
      },
      ...preventQueryRefetch(),
    }
  );

  if (isLoading) return <CircularProgress />;

  return (
    <UserContext.Provider value={{ user: user.current }}>
      {children}
    </UserContext.Provider>
  );
};
