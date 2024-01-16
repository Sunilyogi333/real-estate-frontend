"use client"

import Header from "@/components/ui/header";
import ProfileDetails from "@/components/ProfileDetails";
import EditProfile from "@/components/EditProfile";

import { useState } from "react";

const Profile = ()=>{
    const dummyUser = {
        profileImage: 'images/icons/person.png',
        fullName: 'John Doe',
        numberOfListings: 100,
        dateOfBirth: '1990-01-01',
        age: 32,
        email: 'john.doe@example.com',
        phoneNumber: '+1234567890',
      };
      const [editMode, setEditMode] = useState(false);

      const handleEditClick = () => {
        setEditMode(true);
      };
    
      const handleSaveChanges = (updatedUser) => {
        // Handle saving changes to user details (you may want to implement this function)
        console.log('Saving changes:', updatedUser);
        setEditMode(false); // Switch back to view mode
      };

      return (
        <>
          <Header />
          {editMode ? (
            <EditProfile user={dummyUser} onSave={handleSaveChanges} />
          ) : (
            <ProfileDetails user={dummyUser} onEditClick={handleEditClick} />
          )}
        </>
      );
}
export default Profile;