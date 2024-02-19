"use client";
import About from '@/components/ui/About'
import Header from '@/components/shared/header'
import Images from '@/components/ui/Images'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Footer from '@/components/shared/footer'
import { useRouter } from "next/navigation";
axios.defaults.withCredentials = true;


const page = ({ params }) => {

  console.log('params', params);
  const {id}  = params;
  console.log('id', id);
  const [propertyDetails, setPropertyDetails] = useState([]);

  const router = useRouter();
  
  // useEffect(() => {
  //   const verify = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:9000/verify");
  //       console.log('response', response);
  //       if (response.data.success) {
  //         console.log('user is logged in');
  //       } else {
  //         console.log('user is not logged in');
  //         router.push('/login');
  //       }
  //     } catch (error) {
  //       console.error("Error fetching properties:", error);
  //     }
  //   };

  //   verify();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/getProperty/" + id,{
          withCredentials: true
        })
        setPropertyDetails(response.data); // Array of properties
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchData();
  }, []);

  console.log('des', propertyDetails);

  return (
    <div>
      <Header />
      <Link className='mx-40 text-blue-500 font-medium' href='/'>Back to Homepage</Link>
      <h1 className='text-2xl font-bold text-gray-800 my-3 mx-40'>{propertyDetails.propertyName}</h1>
      <p className="text-sm text-gray-500 mx-40">{propertyDetails.location}</p>
      <Images propertyDetails={propertyDetails}/>
      <About propertyDetails={propertyDetails}/>
      <Footer />
    </div>
  )
}

export default page
