import Link from "next/link";
import React from "react";
import Image from "next/image";
import serenity from "../public/Images/Icons/serenity.png";

const Header = () => {
  return (
    <>
      <header className="flex h-16 bg-color-white backdrop-blur-xl w-full fixed left-0 top-0">
        <div className="flex justify-between items-center w-full px-24 py-3">
          <div className="flex gap-5 items-center">
            <div className="flex gap-2">
              <Image src={serenity} alt="" />
              <span className="font-bold text-gray-800 text-2xl">Serenity</span>
            </div>
            <Link className="cursor-pointer" href="/">
              Buy
            </Link>
            <Link className="cursor-pointer" href="/sell">
              sell
            </Link>
          </div>
          <div className="flex items-center text-center">
            <button className="border-2 border-green-500 cursor-pointer text-blue-500 font-semibold text-base py-2 px-4 mr-4 rounded-md">
              Login
            </button>
            <button className="bg-gray-300 border-transparent hover:border-gray-500 cursor-pointer text-white font-semibold text-base py-2 px-4 rounded-md">
              Sign up
            </button>
          </div>
        </div>
      </header>
      <hr className="mt-16 mb-3" />
    </>
  );
};

export default Header;
