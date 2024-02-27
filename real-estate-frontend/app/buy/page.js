"use client"
import Filter from '@/components/hero/Filter'
import Header from '@/components/shared/header'
import Item from '@/components/hero/Item'
import { useRouter } from "next/navigation";
// import Items from '@/components/ui/Items'
import Search from '@/components/hero/Search'
// import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "@/context/authContext";
import Footer from '@/components/shared/footer'
import { useFetcher } from 'react-router-dom';
import Cookies from "js-cookie";


const page = () => {
  const [properties, setProperties] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const [totalProperties, setTotalProperties] = useState(0);

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await axios.get("http://localhost:9000/verify", { withCredentials: true });
        console.log('response', response);
        if (response.data.success) {
          console.log('user is logged in');
          setIsLoggedIn(true); // Set the state to true if logged in
        } else {
          console.log('user is not logged in');
          setIsLoggedIn(false); // Set the state to false if not logged in
          router.push('/');
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    verify();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/getProperties",{withCredentials: true});
        setProperties(response.data);
        setTotalProperties(response.data.length);
         // Array of properties
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchData();
  }, []);
  if (!isLoggedIn) {
    return null;
  }
  console.log("Properties:", properties);

  return (
    <>
      <Header />
      <Search setProperties={setProperties} properties={properties} totalProperties={totalProperties}/>
      <div className="lg:mx-48 px-12 flex flex-col md:flex-col md:justify-between lg:px-0 lg:flex-row">
        <div className="flex lg:gap-10 flex-wrap mt-8 lg:w-full">
          {properties.map((properties, index) => (
            <Item key={index} properties={properties} />
          ))}
        </div>
        {/* <div className="w-1/4 ">
          <Filter />
        </div> */}
      </div>
      <Footer />
    </>
  );
};

export default page;
