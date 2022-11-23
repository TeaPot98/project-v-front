import { LoggedUser } from "models/user";
import React, { useState } from "react";

interface UserContextType {
  user?: LoggedUser;
  set: (user: LoggedUser) => void;
}

export const UserContext = React.createContext<UserContextType | null>(null);

export const UserContextProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<LoggedUser | undefined>();

  return (
    <UserContext.Provider
      value={{ user: user, set: (newUser) => setUser(newUser) }}
    >
      {children}
    </UserContext.Provider>
  );
};
