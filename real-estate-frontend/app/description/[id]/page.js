'use client'
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
  const [propertyDetails, setPropertyDetails] = useState({
    propertyName: "",
    provision: '',
    district: '',
    municipality: '',
    village: '',    propertyType: "commercial",
    bedrooms: "",
    bathrooms: "",
    kitchen: "",
    price: "",
    yearBuilt: "",
    size: "",
    parking: "",
    garden: "",
    fireplace: "",
    cooling: "",
    heating: "",
    laundry: "",
    description: "",
    date: "",
    image1: null,
    image2: null,
    image3: null,
    username: "",
    email: "",
    phoneNumber: "",
    profilePicture: ""
  })
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set to false initially

  const router = useRouter();
  
  useEffect(() => {
    const verify = async () => {
      try {
        const response = await axios.get("http://localhost:9000/verify/",{withCredentials: true})
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
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/getProperty/" + id);
        console.log('response her vai', response);
        setPropertyDetails({
          propertyName: response.data.propertyName,
          provision : response.data.provision,
          district: response.data.district,
          municipality: response.data.municipality,
          village: response.data.village,
          propertyType: response.data.propertyType,
          bedrooms: response.data.bedrooms,
          bathrooms: response.data.bathrooms,
          kitchen: response.data.kitchen,
          price: response.data.price,
          yearBuilt: response.data.yearBuilt,
          size: response.data.size,
          parking: response.data.parking,
          garden: response.data.garden,
          fireplace: response.data.fireplace,
          cooling: response.data.cooling,
          heating: response.data.heating,
          laundry: response.data.laundry,
          description: response.data.description,
          date: response.data.date.split('T')[0],
          image1: response.data.image1,
          image2: response.data.image2,
          image3: response.data.image3,
          username: response.data.username,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
          profilePicture: response.data.profilePicture
        })
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchData();
  }, []);

  if (!isLoggedIn) {
    return null;
  }
  console.log('description', propertyDetails);

  return (
    <div>
      <Header />
      <Link className='mx-40 text-blue-500 font-medium' href='/'>Back to Homepage</Link>
      <h1 className='text-2xl font-bold text-gray-800 my-3 mx-40'>{propertyDetails.propertyName}</h1>
      <p className="text-sm text-gray-500 mx-40">{propertyDetails.district}, {propertyDetails.village}</p>
      <Images propertyDetails={propertyDetails}/>
      <About propertyDetails={propertyDetails}/>
      <Footer />
    </div>
  )
}

export default page;
