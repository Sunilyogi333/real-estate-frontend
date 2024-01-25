
import React , {useState}from "react";
import { Button } from "../shared/button";

const ProfileDetails = ({user,visibility,editButtonClickAction})=>{
    
    const [buttonText,setButtonText]=useState("Edit Profile");
    const handleEditButtonClick = () => {
        console.log("button Pressed")
        if (visibility) {
          setButtonText("Edit Profile");
        } else {
          setButtonText("Cancel Edit");
        }
        editButtonClickAction(); // Call the parent component's function
      };
    const {
        profilePicture,
        username,
        numberOfListings,
        date_of_birth,
        // age,
        email,
        phoneNumber,
      } = user;

    return(
    <div className="bg-white p-6 rounded-md shadow-md w-96">
        <div className="flex-col items-center border-b border-green-500">
            <div className="rounded-full overflow-hidden w-16 h-16 mr-4">
                <img src={`http://localhost:9000/images/uploads/${profilePicture}`}
                alt="Profile"
                 className="w-full h-full object-cover" />
            </div>
            <div className="flex justify-between ">
                <div className="flex-col">
                    <p className="font-bold text-2xl">{username}</p>
                    <p className="text-gray-500 text-sm">{`${numberOfListings} listings`}</p>
                </div>
                <div>
                    <Button value={buttonText} onClick={handleEditButtonClick} className="w-8 h-3"></Button>
                </div>
            </div>
        </div>

        <ul className="mt-4 space-y-4 pl-0">
        <li className="border-b border-green-500 pb-2 flex justify-between items-center pl-0">
          <span className="text-gray-400 text-sm">Date of Birth:</span>
          <span>{date_of_birth.split('T')[0]}</span>
        </li>
        {/* <li className="border-b border-green-500 pb-2 flex justify-between items-center pl-0">
          <span className="text-gray-400 text-sm">Age:</span>
          <span>{age}</span>
        </li> */}
        <li className="border-b border-green-500 pb-2 flex justify-between items-center pl-0">
          <span className="text-gray-400 text-sm">Email:</span>
          <span>{email}</span>
        </li>
        <li className="border-b border-green-500 pb-2 flex justify-between items-center pl-0">
          <span className="text-gray-400 text-sm">Phone Number:</span>
          <span>{phoneNumber}</span>
        </li>
      </ul>
  </div>);
}

export default ProfileDetails;