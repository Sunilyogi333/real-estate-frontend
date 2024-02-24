"use client"
import Link from "next/link";
import React, { useContext } from "react";
import Logo from "./logo";
import Navigation from "./navigation";
import axios from "axios";
import { useEffect, useState } from "react";
const Header = () => {
  const userId = localStorage.getItem("serenity@userId");
  const [user, setUser] = useState({
    // Initial values can be empty or placeholders
    userId: userId,
    profilePicture: '',
    username: '',
    numberOfListings: 0,
    date_of_birth: '',
    age: 0,
    email: '',
    phoneNumber: '',
  });  useEffect(() => {
    const UserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:9000/getUserProfile/' + userId);
        setUser({
          userId: response.data.userId,
          profilePicture: response.data.profilePicture,
          username: response.data.username,
          numberOfListings: response.data.numberOfListings,
          date_of_birth: response.data.date_of_birth,
          age: response.data.age,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
        })
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    UserDetails();
  }, []);
  return (
      <header className="flex h-18 bg-white bg-opacity-30 backdrop-blur-xl w-full border-b-2 ">
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
          <Navigation user={user} />
        </div>
      </header>
      
    
  );
};

export default Header;
