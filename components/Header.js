import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="flex bg-color-white justify-between items-center px-14 py-2">
      <div className="flex gap-5 items-center">
        <div className="logo">
          <img src="" alt="" />
          <span className="font-bold text-gray-800 text-xl">Serenity</span>
        </div>
        <Link className="cursor-pointer" href="/">
          Buy
        </Link>
        <Link className="cursor-pointer" href="/about">
          sell
        </Link>
      </div>
      <div className="flex items-center text-center">
        <button
          className="border-2 border-green-500 cursor-pointer text-blue-500 font-semibold text-base py-2 px-4 mr-4 rounded-md">
          Login
        </button>
        <button
          className="bg-gray-300 border-transparent hover:border-gray-500 cursor-pointer text-white font-semibold text-base py-2 px-4 rounded-md">
          Sign up
        </button>
      </div>
    </header>
  );
};

export default Header;
