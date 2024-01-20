"use client";
import React from "react";
import { createContext } from "react";
// import  Cookies  from "js-cookie";

export const AuthContext = createContext();
//   userName: null,
//   userId: null,
//   login: () => {},
//   logout: () => {},
//   auth: false,
//   check: "hello",
// });

const AuthContextProvider = ({ children }) => {
    // const [userName, setUser] = useState("hero");
    const userName = "hero";
    // const [token, setToken] = useState(Cookies.get("token"));
    // const [userId, setUserId] = useState(null);
    // const [auth, setAuth] = useState(false);
    // const [check, setCheck] = useState("hello");

    // const login = (user,auth) => {
    //   setUser(user.name);
    //   setUserId(user.userId);
    //   setAuth(auth);
    //   console.log(auth);
    // };
    
    // const logout = () => {
    //     console.log("i am inside logout fuction");
    //     setToken("");
    //     return removeCookie("token");
    // };

    // const context = { userName, userId, login, logout, auth, check };
  return (
    <AuthContext.Provider
      value={userName}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
