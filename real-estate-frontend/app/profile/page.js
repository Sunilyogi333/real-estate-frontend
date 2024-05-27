"use client"
import Header from "@/components/shared/header";
import ProfileDetails from "@/components/ui/ProfileDetails";
import EditProfile from "@/components/ui/EditProfile";
import axios from "axios";

import { useEffect, useState } from "react";
import Footer from "@/components/shared/footer";
import { useRouter } from "next/navigation";
axios.defaults.withCredentials = true;

const Profile = () => {
  const userId = localStorage.getItem("serenity@userId");


  // const [updatedUser, setUpdatedUser] = useState({
  //     profileImage: 'images/icons/person.png',
  //     fullName: 'John Doe',
  //     numberOfListings: 100,
  //     dateOfBirth: '1990-01-01',
  //     age: 32,
  //     email: 'john.doe@example.com',
  //     phoneNumber: '+1234567890',
  //   });
  //   const handleSaveChanges = () => {
  //     // Handle saving changes to user details
  //     console.log('Saving changes:', updatedUser);

  //   };

  //sunil-dynamic update  
  const [user, setUser] = useState({
    name: '',
  })
  const [updatedUser, setUpdatedUser] = useState({
    // Initial values can be empty or placeholders
    userId: userId,
    profilePicture: '',
    username: '',
    numberOfListings: 0,
    date_of_birth: '',
    age: 0,
    email: '',
    phoneNumber: '',
    verification: '',
  });

  const [editProfileVisiblity, setEditProfileVisibility] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set to false initially
  const router = useRouter();


  useEffect(() => {
    const verify = async () => {
      try {
        const response = await axios.get("http://localhost:9000/verify",{withCredentials: true});
        // console.log('response', response);
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

  //sunil-dynamic update
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:9000/getUserProfile/' + userId);
        // if (response.data.profilePicture === null) {
        //   response.data.profilePicture = null;
        // }
        console.log('User profile:', response.data);
        setUpdatedUser({
          userId: response.data.userId,
          profilePicture: response.data.profilePicture,
          username: response.data.username,
          // numberOfListings: response.data.numberOfListings,
          date_of_birth: response.data.date_of_birth,
          age: response.data.age,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
          verification: response.data.verification,
        })
        // if(updatedUser.profilePicture === 'null'){
          // updatedUser.profilePicture = null;
          // console.log("Profile Picture is null")
        // }
        setUser({
          name: response.data.username,
        })
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    
    fetchUserDetails();
  }, []);
  
  if (!isLoggedIn) {
    return null;
  }

  // console.log("Profile Picture herr:", updatedUser.profilePicture)
  console.log("Updated User:", updatedUser);
  if (updatedUser.profilePicture === null) {
    // updatedUser.profilePicture = null;
    console.log("Profile Picture is null")
  }

  const handleEditToogle = () => {
    console.log("Button clicked")

    setEditProfileVisibility(!editProfileVisiblity)
  }
  return (<>
    <Header user={updatedUser}></Header>
    <div className="flex justify-between px-6 pr-0">
      <ProfileDetails user={updatedUser} editButtonClickAction={handleEditToogle} visibility={editProfileVisiblity} onUpdate={(user) => setUpdatedUser(user)}> </ProfileDetails>
      <EditProfile visibility={editProfileVisiblity} user={updatedUser} onUpdate={(user) => setUpdatedUser(user)}></EditProfile>
    </div>
    <Footer></Footer>
    {/* onSave={handleSaveChanges} -removed it from Edited Profile*/}

  </>);
}
export default Profile;