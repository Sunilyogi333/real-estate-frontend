"use client"
import Header from "@/components/shared/header";
import ProfileDetails from "@/components/ui/ProfileDetails";
import EditProfile from "@/components/ui/EditProfile";

import { useState } from "react";

const Profile = ()=>{
    const [updatedUser, setUpdatedUser] = useState({
        profileImage: 'images/icons/person.png',
        fullName: 'John Doe',
        numberOfListings: 100,
        dateOfBirth: '1990-01-01',
        age: 32,
        email: 'john.doe@example.com',
        phoneNumber: '+1234567890',
      });
      const handleSaveChanges = () => {
        // Handle saving changes to user details
        console.log('Saving changes:', updatedUser);
        
      };
    
      
      const [editProfileVisiblity,setEditProfileVisibility]=useState(false);
    

      const handleEditToogle=()=>{
        console.log("Button clicked")
       
        setEditProfileVisibility(!editProfileVisiblity)
      }
   return(<>
    <Header></Header>
    <div className="flex justify-between px-6 pr-0">
    <ProfileDetails user={updatedUser} editButtonClickAction={handleEditToogle} visibility={editProfileVisiblity} onUpdate={(user)=> setUpdatedUser(user)}> </ProfileDetails>
    <EditProfile visibility={editProfileVisiblity} user={updatedUser} onSave={handleSaveChanges} onUpdate={(user)=> setUpdatedUser(user)}></EditProfile>
    </div>
    
   
   </>); 
}
export default Profile;