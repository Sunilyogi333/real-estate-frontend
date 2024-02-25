import React, { useEffect, useState } from "react";
import Icons from "./icons";
import Link from "next/link";
import axios from "axios";
import { AuthContext } from "@/context/authContext";
import { useContext } from "react";

const account = ({user ={}}) => {
    const userName = localStorage.getItem("serenity@username");
    const firstName = userName.split(" ")[0];

    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
      setDropdownVisible(!isDropdownVisible);
    };
    // log the user object
    console.log('user:', user);
    const {profilePicture}= user;
  return (
    <>
      <div className="relative">
        <div className="flex justify-center items-center">
          <div className=" bg-blue-50 rounded-lg h-12 w-12 flex justify-center items-center">
            <Icons type={"notification"}></Icons>
          </div>
          <div className="h-11 flex justify-center items-center overflow-hidden">
            <Icons type={"line"}></Icons>
          </div>
          <div onClick={toggleDropdown} className="z-50 flex justify-center items-center gap-2 border border-blue-300 cursor-pointer text-white font-semibold text-base py-2 px-4 rounded-md">
            {profilePicture ? (
              <div className="w-[2vw] h-[2vw] bg-sky-100 rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={`http://localhost:9000/images/uploads/${profilePicture}`}
                  alt=""
                />
              </div>
            ) : (
              <div className="w-[2vw] h-[2vw] bg-sky-100 rounded-full overflow-hidden flex items-center justify-center">
                <p className="font-semibold text-gray-800 text-center">{userName[0]}</p>
              </div>
            )}
            <div className="flex items-center justify-center">
              <p className="font-semibold text-gray-800">{firstName}</p>
              <Icons type={"down"}></Icons>
            </div>
          </div>
        </div>
        {/* <div className="fixed bg-green-500 top-0 left-0 right-0 bottom-0"></div> */}
        {isDropdownVisible && (
        <div className="z-50 showme absolute right-0 border border-gray-200 mt-2 py-2 w-[180px] bg-sky-50 text-white rounded-lg shadow-[0_2px_2px_rgb(0,0,0,0.2)]">
          <Link
            href="/profile"
            className="text-left block px-4 py-2 text-gray-800 hover:underline border-b-2 border-gray-200"
          >
            Profile
          </Link>
          <Link
            href="#" 
            className="text-left block px-4 py-2 text-gray-800 hover:underline border-b-2 border-gray-200"
          >
            Settings
          </Link>
          <Link
            href="#"
            className="text-left block px-4 py-2 text-gray-800 hover:underline border-b-2 border-gray-200 z-50"
          >
            Support
          </Link>
          <Link
            href="/logout"
            className="text-left block px-4 py-2 text-gray-800 hover:underline border border-transparent z-50"
          >
            Logout
          </Link>
        </div>
        )}
      </div>
    </>
  );
};

export default account;
