"use client";
import { createContext } from "react";

const UserContext = createContext<any>(null);

const UserProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) => {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
UserProvider.propTypes = {};
export { UserContext, UserProvider };
