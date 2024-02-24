"use client";
import AdminHeader from '@/components/admin/adminHeader';
import AdminSidebar from '@/components/admin/adminSidebar';
import DataView from '@/components/admin/dataView';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
axios.defaults.withCredentials = true;


const viewDetails = ({ params, handleOptionClick, setFormDetails, formDetails }) => {

    console.log('params', params);
    const formId = params;
    console.log("formId", formId);
    const [details, setDetails] = useState({
        id: formId,
        firstName: '',
        lastName: '',
        date_of_birth: '',
        phoneNumber: '',
        provision: '',
        district: '',
        municipality: '',
        village: '',
        userPhoto: '',
        CFPhoto: '',
        CBPhoto: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:9000/getkycForm/" + formId, { withCredentials: true });
                setDetails(response.data); // Array of properties
                console.log("response", response.data);
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };
        fetchData();
    }, []);
    const handleVerify = async (formId) => {
        try {
            // Make a DELETE request to server with the propertyId
            const response = await axios.post(`http://localhost:9000/verifyKycForm/${formId}`);
            if (response.data.success) {
                alert('Form Verified');
                
                const updatedFormDetails = formDetails.filter((form) => form.id !== formId);
                setFormDetails(updatedFormDetails);
                // console.log("updatedFormDetails", updatedFormDetails);
                 handleOptionClick('KYC Forms');

            }

        } catch (error) {
            console.error("Error deleting property:", error);
        }
    };

    const handleReject = async (formId) => {
        try {
            // Display a confirmation prompt
            const confirmReject = window.confirm("Are you sure you want to reject this Form?");

            if (!confirmReject) {
                return; // If the user cancels, do nothing
            }

            // Make a DELETE request to server with the propertyId
            await axios.post(`http://localhost:9000/rejectKycForm/${formId}`);
        } catch (error) {
            console.error("Error deleting property:", error);
        }
    };

    return (
        <>
            <div className='bg-white rounded w-full h-full p-8 lg:py-12 lg:px-20 border'>
                <h1 className="text-blue-500 text-2xl font-semibold mb-4">KYC Form</h1>
                <div className='flex justify-between'>
                    <div>
                        <h1 className="text-black-500 text-xl font-semibold mb-4">Personal Details</h1>
                        <div>
                            <div className='flex gap-2'>
                                <p>Name: </p>
                                <p>{details.firstName} {details.lastName}</p>
                            </div>
                            <div className='flex gap-2 text-base'>
                                <p>Date of Birth: </p>
                                <p>{details.date_of_birth}</p>
                            </div>
                            <div className='flex gap-2 text-base'>
                                <p>Phone Number: </p>
                                <p>{details.phoneNumber}</p>
                            </div>
                            <div className='flex gap-2 text-base'>
                                <p>Gmail: </p>
                                <p>sunil123@Gmail.com</p>
                            </div>
                            <div className='flex gap-2 text-base'>
                                <p>Provision: </p>
                                <p>{details.provision}</p>
                            </div>
                            <div className='flex gap-2 text-base'>
                                <p>District: </p>
                                <p>{details.district}</p>
                            </div>
                            <div className='flex gap-2 text-base'>
                                <p>Municipality: </p>
                                <p>{details.municipality}</p>
                            </div>
                            <div className='flex gap-2 text-base'>
                                <p>Village: </p>
                                <p>{details.village}</p>
                            </div>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <div className="h-[20vh] w-[12vw] rounded border border-red-900">                            <img
                            alt="user Photo"
                            className="block h-full w-full rounded"
                            src={`http://localhost:9000/images/uploads/${details.userPhoto}`}
                        />
                        </div>
                    </div>
                </div>
                <div className='mt-6'>
                    <h1 className="text-black-500 text-xl font-semibold mb-4">Citizenship Front and Back</h1>
                    <div className='flex justify-between'>
                        <div className=''>
                            <div className="h-[28vh] rounded border border-red-900">
                                <img
                                    alt="user Photo"
                                    className="block h-full w-full rounded"
                                    src={`http://localhost:9000/images/uploads/${details.CFPhoto}`}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="h-[28vh] rounded border border-red-900">
                                <img
                                    alt="user Photo"
                                    className="block h-full w-full rounded"
                                    src={`http://localhost:9000/images/uploads/${details.CBPhoto}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* verify and reject button */}
                <div className='mt-8'>
                    <button
                        onClick={() => handleVerify(formId)}
                        className='bg-blue-500 text-white px-4 py-2 rounded-md'>Verify Form</button>
                    <button
                        onClick={() => handleReject(formId)}
                        className='bg-red-500 text-white px-4 py-2 rounded-md ml-4'>Reject Form</button>
                </div>
            </div >
        </>
    )
}

export default viewDetails;
