"use client";
import React, { useState } from "react";
import axios from "axios"; // Make sure to import Axios
import Header from "@/components/shared/header";
import { AuthContext } from "@/context/authContext";
import { useContext } from "react";
import Footer from "@/components/shared/footer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
axios.defaults.withCredentials = true;


const page = () => {

    const userId = localStorage.getItem("serenity@userId");
    const [formData, setFormData] = useState({
        uID: userId,
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

    const handleInput = (e) => {
        const { name, value, type } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === "file" ? e.target.files[0] : value,
        }));
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false); // Set to false initially
    const router = useRouter();

    useEffect(() => {
        const verify = async () => {
            try {
                const response = await axios.get("http://localhost:9000/verify", { withCredentials: true });
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



    const handleSubmit = async () => {
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            const response = await axios.post(
                "http://localhost:9000/kycForm",
                formDataToSend
            );
            console.log(response);
            // Check if the request was successful
            if (response.data.success) {
                // Navigate to the sell page
                router.push("/profile");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Header />
            <div className=" px-4 lg:px-60 py-6 overflow-hidden">
                <div className="bg-gray-100 px-12 py-8 border-2 border-gray-200 rounded-md">
                    <h1 className="text-2xl font-bold mb-4 text-blue-500">
                        KYC Form
                    </h1>
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} encType="multipart/form-data">
                        {/* Personal Details */}
                        <div className="lg:p-4 border border-blue-200 rounded-md">
                            <h1 className="text-xl font-bold mb-4">Personal Details</h1>
                            <div className="mb-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                                    {/* User Name */}
                                    <div className="mb-4">
                                        <label
                                            htmlFor="firstName"
                                            className="block text-sm font-medium text-gray-700 "
                                        >
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInput}
                                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label
                                            htmlFor="lastname"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            LastName
                                        </label>
                                        <input
                                            type="text"
                                            id="lastname"
                                            name="lastName"
                                            value={formData.location}
                                            onChange={handleInput}
                                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent"
                                        />
                                    </div>
                                    {/* Phone Number */}
                                    <div className="mb-4">
                                        <label
                                            htmlFor="PhoneNumber"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleInput}
                                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent"
                                        />
                                    </div>

                                    {/* date of birth */}
                                    <div className="mb-4">
                                        <label
                                            htmlFor="dateofbirth"
                                            className="block text-sm font-medium text-gray-700 "
                                        >
                                            Date of birth
                                        </label>
                                        <input
                                            type="date"
                                            id="dateofbirth"
                                            max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0]}
                                            name="date_of_birth"
                                            value={formData.date_of_birth || ''}
                                            onChange={handleInput}
                                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent"
                                        />
                                        <span className='text-gray-500 text-xs ml-2'>- must be 18 years old</span>
                                    </div>
                                </div>
                            </div>

                            {/* Image Uploads */}
                            <div className="mb-8">
                                <h2 className="text-xl font-bold mb-4">Image Uploads</h2>
                                <div className="flex mt-4">
                                    <div className="mb-4">
                                        <label
                                            htmlFor="lastname"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            User Photo
                                        </label>
                                        <input
                                            type="file"
                                            id="userPhoto"
                                            name="userPhoto"
                                            accept="image/*"
                                            onChange={handleInput}
                                            className="mb-2 mt-2"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="CFPhoto"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Citizenship Photo(frontside)
                                        </label>
                                        <input
                                            type="file"
                                            id="CFPhoto"
                                            name="CFPhoto"
                                            accept="image/*"
                                            onChange={handleInput}
                                            className="mb-2 mt-2"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="CFPhoto"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Citizenship Photo(Backside)
                                        </label>
                                        <input
                                            type="file"
                                            id="CBPhoto"
                                            name="CBPhoto"
                                            accept="image/*"
                                            onChange={handleInput}
                                            className="mb-2 mt-2"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="mb-8">
                                <h2 className="text-xl font-bold mb-4">Location</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                                    {/* Provision */}
                                    <div className="mb-4">
                                        <label
                                            htmlFor="provision"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Provision
                                        </label>
                                        <input
                                            type="text"
                                            id="provision"
                                            name="provision"
                                            value={formData.provision}
                                            onChange={handleInput}
                                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent"
                                        />
                                    </div>

                                    {/* District */}
                                    <div className="mb-4">
                                        <label
                                            htmlFor="district"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Dristrict
                                        </label>
                                        <input
                                            type="text"
                                            id="district"
                                            name="district"
                                            value={formData.district}
                                            onChange={handleInput}
                                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent"
                                        />
                                    </div>

                                    {/* Municipality */}
                                    <div className="mb-4">
                                        <label
                                            htmlFor="municipality"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Municipality
                                        </label>
                                        <input
                                            type="text"
                                            id="municipality"
                                            name="municipality"
                                            value={formData.municipality}
                                            onChange={handleInput}
                                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="village"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Village/Tole
                                        </label>
                                        <input
                                            type="text"
                                            id="village"
                                            name="village"
                                            value={formData.village}
                                            onChange={handleInput}
                                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default page;
