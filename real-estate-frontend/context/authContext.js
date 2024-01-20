"use client";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import  Cookies  from "js-cookie";

export const AuthContext = createContext({
    userName: "",
    login: () => {},
    logout: () => {},
    auth: false,
    setAuth: () => {},
    userId: null,
    token: "",
});

const AuthContextProvider = ({ children }) => {
    const [userName, setUser] = useState("");
    const [token, setToken] = useState(Cookies.get("token"));
    const [userId, setUserId] = useState(null);
    const [auth, setAuth] = useState(false);

        const login = (user,auth) => {
            setUser(user.name);
            console.log(user.name);
            setUserId(user.userId);
            setAuth(auth);
            console.log(user)
          };
    
    const logout = () => {
        setUser("");
        setUserId(null);
        setAuth(false);
        setToken("");
        return Cookies.remove("token");
    };

    const context = { userName, login, logout, auth, setAuth, userId, token};
  return (
    <AuthContext.Provider
      value={context}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
