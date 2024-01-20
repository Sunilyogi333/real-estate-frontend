import React from "react";
import { createContext } from "react";
const authContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  auth: false,
});

export const AuthContextProvider = ({ children }) => {
  return (
    <authContext.Provider
      value={{
        user: null,
        login: () => {},
        logout: () => {},
        auth: false,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default authContext;
