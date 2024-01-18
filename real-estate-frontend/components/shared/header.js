import Link from "next/link";
import React from "react";
import Logo from "./logo";
import Navigation from "./navigation";

const Header = () => {
  return (
    
      <header className="flex h-16 bg-white bg-opacity-30 backdrop-blur-xl w-full border-b-2 ">
        <div className="flex justify-between items-center w-full px-8 lg:px-24 py-3">
          <div className="flex gap-5 items-center">
            <Logo></Logo>
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
      
    
  );
};

export default Header;
