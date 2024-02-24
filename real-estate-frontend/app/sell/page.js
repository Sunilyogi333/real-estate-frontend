"use client"
import Header from "@/components/shared/header";
import Properties from "@/components/ui/Properties";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "@/components/shared/footer";
import { useRouter } from "next/navigation";
axios.defaults.withCredentials = true;

const page = () => {
  const [Myproperties, setMyProperties] = React.useState([]);
  const userId = localStorage.getItem("serenity@userId");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set to false initially

  const router = useRouter();
      
      useEffect(() => {
        const verify = async () => {
          try {
            const response = await axios.get("http://localhost:9000/verify",{withCredentials: true});
            console.log('response', response);
            if (response.data.success) {
              console.log('user is logged in');
              setIsLoggedIn(true); // Set the state to true if logged in
            } else {
              console.log('user is not logged in');
              setIsLoggedIn(false); // Set the state to false if not logged in
              router.push('/login');
            }
          } catch (error) {
            console.error("Error fetching properties:", error);
          }
        };
    
        verify();
      }, []);
    
      
  useEffect(() => {
    if (!userId) {
      return;
    }
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/getMyProperties/"+userId);
        setMyProperties(response.data); // Array of properties
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchData();
  }, [userId]);

  if (!isLoggedIn) {
    return null;
  }
  console.log("Myproperties: ", Myproperties);
  return (
    <>
      <Header />
      <div className="border border-blue-400 rounded-md mx-4 md:mx-8 lg:mx-16 xl:mx-32 mt-4">
        <div className="flex flex-col md:flex-row justify-between flex-wrap h-full border py-6 px-4">
          <div className="flex flex-col md:flex-row gap-4 overflow-hidden w-full md:w-auto">
            <div className="text-center md:text-left">
              <p className="text-xl font-semibold">Overview</p>
              <p className="text-center text-sm md:text-left">Last 30 days</p>
            </div>
            <div>
              <p>Total Properties</p>
              <p className="font-semibold">12</p>
            </div>
          </div>
          <div className="flex mt-4 md:mt-0">
            <Link
              className="font-semibold bg-blue-200 text-blue-500 rounded px-2 py-2"
              href="/Property"
            >
              Add new Properties
            </Link>
          </div>
        </div>
        <div>
          <Properties Myproperties={Myproperties}/>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
