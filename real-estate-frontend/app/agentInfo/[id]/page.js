"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { data } from 'autoprefixer';

const page = ({params}) => {
    console.log('params', params);
    const agentId = params.id;
    console.log('agentId', agentId);

    const [agentInfo, setAgentInfo] = useState({
        agentName: "",
        agentEmail: "",
        agentPhoneNumber: "",
        agentDateOfBirth: "",
        agentPhoto: "",
        numberOfListings: 0
    })

    useEffect(() => {
        const fetchAgentInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/agent/`+ agentId);
                setAgentInfo({
                    agentName: response.data[0].username,
                    agentEmail: response.data[0].email,
                    agentPhoneNumber: response.data[0].phoneNumber,
                    agentDateOfBirth: response.data[0].date_of_birth,
                    agentPhoto: response.data[0].profilePicture,
                    // for number of listings, we need to calulate the length of the array
                    numberOfListings: response.data.length
                })

            } catch (error) {
                console.log('error', error);
            }
        }
        fetchAgentInfo();
    }
    , [])
  return (
    <>
       <div className="bg-white p-6 rounded-md shadow-md w-96 m=-8">
        <div className="flex-col items-center border-b border-green-500">
            <div className="rounded-md overflow-hidden w-32 h-32 mr-4">
                <img src={`http://localhost:9000/images/uploads/${agentInfo.agentPhoto}`}
                alt="Profile"
                 className="w-full h-full object-cover" />
            </div>
            <div className="flex justify-between mt-8">
                <div className="flex-col">
                    <p className="font-bold text-2xl">{agentInfo.agentName}</p>
                    <p className="text-gray-500 text-sm">{`${agentInfo.numberOfListings} listings`}</p>
                </div>
                <div>
                    {/* <Button value={buttonText} onClick={handleEditButtonClick} className="w-8 h-3"></Button> */}
                    
                </div>
            </div>
        </div>

        <ul className="mt-4 space-y-4 pl-0">
        <li className="border-b border-green-500 pb-2 flex justify-between items-center pl-0">
          <span className="text-gray-400 text-sm">Date of Birth:</span>
          {/* if date of birth is given, display it else display 'not provided' */}
          <span>{agentInfo.agentDateOfBirth ? agentInfo.agentDateOfBirth.split('T')[0] : '' }</span>
        </li>
        <li className="border-b border-green-500 pb-2 flex justify-between items-center pl-0">
          <span className="text-gray-400 text-sm">Email:</span>
          <span>{agentInfo.agentEmail}</span>
        </li>
        <li className="border-b border-green-500 pb-2 flex justify-between items-center pl-0">
          <span className="text-gray-400 text-sm">Phone Number:</span>
          <span>{agentInfo.agentPhoneNumber ? agentInfo.agentPhoneNumber : ''}</span>
        </li>
      </ul>
  </div>
    </>
  )
}

export default page