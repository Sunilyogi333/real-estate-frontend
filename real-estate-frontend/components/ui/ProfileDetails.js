"use client"
import React, { useState } from "react";
import { Button } from "../shared/button";
import Icons from "../shared/icons";
import Link from "next/link";

const ProfileDetails = ({ user, visibility, editButtonClickAction }) => {

  const [buttonText, setButtonText] = useState("Edit Profile");
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
    email,
    phoneNumber,
    verification,
  } = user;
  console.log("ProfileDetails", verification)
  console.log("user ho vai", user)
  return (
    <div className="bg-white p-6 rounded-md shadow-md lg:w-[500px] w-96">
      <div className="flex-col items-center border-b pb-3 border-green-500">
        {profilePicture === null ? (
          <div className="w-28 h-28 bg-sky-100 rounded-full overflow-hidden flex items-center justify-center">
          <p className="font-semibold text-4xl text-gray-800 text-center">{username[0]}</p>
         </div>
        ) : (
          <div className="rounded-full overflow-hidden w-28 h-28 mr-4">
          <img
            className="w-full h-full object-cover"
            src={`http://localhost:9000/images/uploads/${profilePicture}`}
            alt="Profile"
          />
        </div>
        )}
        <div className="flex items-center justify-between mt-5">
          <div className="flex-col">
            <div className="flex gap-2 items-center">
              <p className="font-bold text-2xl">{username}</p>

              {verification === 'Verified' ? (
                <Icons type="verified"></Icons>
              ) : (
                <span> </span>
              )
              }
            </div>
            {/* <p className="text-gray-500 text-sm">{`${numberOfListings} listings`}</p> */}
          </div>
          <div>
            <Button value={buttonText} onClick={handleEditButtonClick} className="w-8 h-3"></Button>
          </div>
        </div>
      </div>

      <ul className="mt-4 space-y-4 pl-0">
        <li className="border-b border-green-500 pb-2 flex justify-between items-center pl-0">
          <span className="text-gray-400 text-sm">Date of Birth:</span>
          {/* if date of birth is given, display it else display 'not provided' */}
          <span>{date_of_birth ? date_of_birth.split('T')[0] : ''}</span>
          {/* <span>{date_of_birth.split('T')[0]}</span> */}
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
          <span>{phoneNumber ? phoneNumber : ''}</span>
        </li>
        <li className="border-b border-green-500 pb-2 flex justify-between items-center pl-0">
          <span className="text-gray-400 text-sm">KYC:</span>
          <span>{verification ? verification : ''}</span>
        </li>
        {verification === 'Rejected' ? (
          <Link href="/kycForm">
            <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Fill KYC again
            </button>
          </Link>
        ) : (
          <span> </span>
        )
        }
        {verification === null ? (
          <Link href="/kycForm">
            <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Fill KYC
            </button>
          </Link>
        ) : (
          <span> </span>
        )
        }
      </ul>
    </div>
  );
}

export default ProfileDetails;