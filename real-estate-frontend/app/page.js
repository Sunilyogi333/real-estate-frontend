"use client";
import Filter from "@/components/ui/Filter";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import Item from "@/components/ui/Item";
// import Items from '@/components/ui/Items'
import Search from "@/components/ui/Search";
// import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "@/context/authContext";

const page = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/getProperties");
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
      <Search />
      <div className="px-12 lg:mx-48 flex flex-col md:flex-col md:justify-between lg:px-0 lg:justify-between lg:flex-row">
        <div className="flex lg:gap-10 flex-wrap mt-8 lg:w-3/4">
          {properties.map((properties, index) => (
            <Item key={index} properties={properties} />
          ))}
        </div>
        <div className="w-1/4 ">
          <Filter />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
