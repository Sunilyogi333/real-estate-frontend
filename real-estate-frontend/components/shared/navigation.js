"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./button";
import Account from "./account";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";

const Navigation = () => {
  const { auth } = useContext(AuthContext);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  console.log(auth);  

  return (
    <div className="flex justify-between items-center text-center">
      <button onClick={toggleMenu} className="lg:hidden">
        <span
          className={`block bg-gray-700 h-1 w-6 mb-1 relative ${
            isMenuOpen ? " top-2 transform rotate-45" : ""
          }`}
        ></span>
        <span
          className={`block bg-gray-700 h-1 w-6 mb-1 relative ${
            isMenuOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block bg-gray-700 h-1 w-6 relative ${
            isMenuOpen ? "-top-2 transform -rotate-45" : ""
          }`}
        ></span>
      </button>

      {auth ? (
        <>
        <Account />
        </>
      ) : (
        <>
          <Button
            className="border-2 border-green-500 cursor-pointer text-blue-500 font-semibold text-base py-2 px-4 mr-4 rounded-md hidden lg:block md:block"
            link="/login"
            value="Login"
          ></Button>

          <Button
            className="bg-gray-300 border-transparent hover:border-gray-500 cursor-pointer text-white font-semibold text-base py-2 px-4 rounded-md hidden lg:block md:block"
            link="/signup"
            value="Sign up"
          ></Button>
        </>
      )}
    </div>
  );
};

export default Navigation;
