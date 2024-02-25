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
import AboutHome from '@/components/ui/aboutHome';


const page = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/getProperties",{withCredentials: true});
        setProperties(response.data); // Array of properties
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchData();
  }, []);
  console.log("Properties:", properties);

  return (
    <>
      <Header />
      <AboutHome properties={properties}/>
      <Footer />
    </>
  );
};

export default page;
