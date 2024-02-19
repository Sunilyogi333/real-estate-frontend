"use client";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import Cookies from "js-cookie";
// import localStorage from "local-storage";

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
  const [token, setToken] = useState(Cookies.get("token"));
  const [auth, setAuth] = useState(false);
  // const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (Cookies.get("token")) {
      setToken(Cookies.get("token"));
      setAuth(true);
    }
  }, []);

  const login = (user, auth) => {
    setAuth(auth);
    localStorage.setItem("serenity@username", user.name);
    localStorage.setItem("serenity@userId", user.userId);
  };

  const logout = () => {
    // setUser("");
    // setUserId(null);
    setAuth(false);
    setToken("");
    Cookies.remove("token");
    localStorage.removeItem("serenity@username");
    localStorage.removeItem("serenity@userId");
  };
  
  const context = { login, logout, auth, setAuth, token };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
