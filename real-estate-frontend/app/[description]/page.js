"use client";
import About from '@/components/ui/About'
import Header from '@/components/shared/header'
import Images from '@/components/ui/Images'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const page = ({ params }) => {
  const { description } = params;
  const [propertyDetails, setPropertyDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/getProperty/" + description);
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
    </div>
  )
}

export default page
