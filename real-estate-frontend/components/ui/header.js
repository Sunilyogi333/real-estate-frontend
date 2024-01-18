import Link from "next/link";
import React from "react";
import Logo from "./logo";
import Navigation from "../Navigation";

const Header = () => {
  return (
    <>
      <header className="flex h-16 bg-white bg-opacity-30 backdrop-blur-xl w-full fixed left-0 top-0">
        <div className="flex justify-between items-center w-full px-8 lg:px-24 py-3">
          <div className="flex gap-5 items-center">
            <Logo />
            <Link className="cursor-pointer" href="/">
              Buy
            </Link>
            <Link className="cursor-pointer" href="/sell">
              sell
            </Link>
          </div>
          <Navigation />
        </div>
      </header>
      <hr className="mt-16 mb-3" />
    </>
  );
};

export default Header;
