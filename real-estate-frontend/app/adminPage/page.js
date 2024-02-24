"use client";
import React, { useEffect } from 'react';
import AdminHeader from '@/components/admin/adminHeader';
import AdminSidebar from '@/components/admin/adminSidebar';
import DataView from '@/components/admin/dataView';
import { useState } from 'react';


const page = () => {
  const [selectedOption, setSelectedOption] = React.useState('Dashboard');
  const [name, setName] = useState('');

  // Function to handle button clicks and update the selected option
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    // console.log('Selected option:', option);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:9000/getAdmin/' + userId);
        setUpdatedUser({
          userId: response.data.userId,
          profilePicture: response.data.profilePicture,
          username: response.data.username,
          numberOfListings: response.data.numberOfListings,
          date_of_birth: response.data.date_of_birth,
          age: response.data.age,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
        })

        setUser({
          name: response.data.username,
        })
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserDetails();
  }, []);


  return (
    <div className="flex">
      {/* AdminHeader component */}
      <AdminHeader adminName="John Doe" />

      {/* AdminSidebar component */}
      <AdminSidebar handleOptionClick={handleOptionClick} />

      {/* DataView component */}
      <DataView data={selectedOption} handleOptionClick={handleOptionClick} />
    </div>
  );
};

export default page;
