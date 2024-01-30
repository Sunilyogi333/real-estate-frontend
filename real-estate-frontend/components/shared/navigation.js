"use client"
import Link from 'next/link';

import React, { useState } from 'react';
import { Button } from './button';


const Navigation = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex justify-between items-center text-center">
      <button onClick={toggleMenu} className='lg:hidden'>
        <span className={`block bg-gray-700 h-1 w-6 mb-1 relative ${isMenuOpen ? ' top-2 transform rotate-45' : ''}`}></span>
        <span className={`block bg-gray-700 h-1 w-6 mb-1 relative ${isMenuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block bg-gray-700 h-1 w-6 relative ${isMenuOpen ? '-top-2 transform -rotate-45' : ''}`}></span>
      </button>

      <Button 
      className="border-2 border-green-500 cursor-pointer text-blue-500 font-semibold text-base py-2 px-4 mr-4 rounded-md hidden lg:block md:block"
      link="/Login" value="Login"
      >
        Login
      </Button>

      <Button 
      className="bg-gray-300 border-transparent hover:border-gray-500 cursor-pointer text-white font-semibold text-base py-2 px-4 rounded-md hidden lg:block md:block"
      link="/Signup" value="Sign up"
      >
        
      </Button>
    </div>
  );
};

export default Navigation;
