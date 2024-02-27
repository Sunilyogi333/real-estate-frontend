"use client"
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react'
import Header from '@/components/shared/header'
import Footer from "@/components/shared/footer";
import axios from 'axios'
import Validation from './propertyValidation'

const page = ({ params }) => {


    console.log('params', params);
    const { id } = params;
    console.log('id', id);
    const userId = localStorage.getItem("serenity@userId");

    const [formData, setFormData] = useState({
        propertyId: id,
        userId: userId,
        propertyName: "",
        provision: '',
        district: '',
        municipality: '',
        village: '',
        propertyType: "commercial",
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
        image1: null,
        image2: null,
        image3: null,
        existingImage1: "",
        existingImage2: "",
        existingImage3: "",
    });

    const [error, setError] = useState({});

    const handleMandatoryInput = (e) => {
        const { name, value, type } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === "file" ? e.target.files[0] : value,
        }));
        setError({ ...error, [e.target.name]: "" });
    };

    const handleOtherInput = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleImage1 = (e) => {
        document.querySelector('.image1').click();
        e.preventDefault();
    };

    const handleImage2 = (e) => {
        document.querySelector('.image2').click();
        e.preventDefault();
    };

    const handleImage3 = (e) => {
        document.querySelector('.image3').click();
        e.preventDefault();
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:9000/getProperty/" + id);
                // console.log('response', response);
                // setFormData(response.data)
                setFormData(() => {
                    return {
                        ...formData,
                        propertyName: response.data.propertyName,
                        provision: response.data.provision,
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
                        existingImage1: response.data.image1,
                        existingImage2: response.data.image2,
                        existingImage3: response.data.image3,
                    }
                })
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };

        fetchData();
    }, []);

    //   if (!isLoggedIn) {
    //     return null;
    //   }

    console.log('propertyexisting:', formData)
    // const handleSubmit = async () => {
    //     const formDataToSend = new FormData();
    //     for (const key in formData) {
    //         formDataToSend.append(key, formData[key]);
    //     }

    //     try {
    //         const response = await axios.post(
    //             "http://localhost:9000/updateProperty",
    //             formDataToSend
    //         );
    //         console.log(response);

    //         if (response.data.success) {
    //             router.push("/sell");
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    const handleSubmit = async () => {
        const error = Validation(formData);
        setError(error);
        if (Object.keys(error).length > 0) {
            return;
        }
        const formDataToSend = new FormData();
        for (const key in formData) {
            // Skip null image properties
            if (key === "image1" || key === "image2" || key === "image3") {
                if (formData[key] === null) {
                    continue;
                }
            }

            formDataToSend.append(key, formData[key]);
        }

        try {
            const response = await axios.post(
                "http://localhost:9000/updateProperty",
                formDataToSend
            );
            console.log(response);

            // Check if the request was successful
            if (response.data.success) {
                // Navigate to the sell page
                router.push("/sell");
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
                        Add Property Details
                    </h1>
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} encType="multipart/form-data">
                        {/* Mandatory Details */}
                        <div className="lg:p-4 border border-blue-200 rounded-md">
                            <div className="mb-8">
                                <h2 className="text-xl font-bold mb-4">Mandatory Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                                    {/* Property Name */}
                                    <div className="mb-4">
                                        <label
                                            htmlFor="property-name"
                                            className="block text-sm font-medium text-gray-700 "
                                        >
                                            Property Name
                                        </label>
                                        <input
                                            type="text"
                                            id="property-name"
                                            name="propertyName"
                                            value={formData.propertyName}
                                            onChange={handleMandatoryInput}
                                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent"
                                        />
                                        {error.propertyName && (
                                            <p className="text-red-500">{error.propertyName}</p>
                                        )}
                                    </div>

                                    {/* Location */}
                                    {/* <div className="mb-4">
                        <label
                          htmlFor="location"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Location
                        </label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleMandatoryInput}
                          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent"
                        />
                      </div> */}

                                    {/* Property Type */}
                                    <div className="mb-4">
                                        <label
                                            htmlFor="property-type"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Property Type
                                        </label>
                                        <select
                                            id="property-type"
                                            name="property-type"
                                            value={formData.propertyType}
                                            onChange={handleMandatoryInput}
                                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent"
                                        >
                                            <option value="commercial">Commercial</option>
                                            <option value="residential">Residential</option>
                                        </select>
                                        {error.propertyType && (
                                            <p className="text-red-500">{error.propertyType}</p>
                                        )
                                        }
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
                                            onChange={handleMandatoryInput}
                                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent"
                                        />
                                        {error.provision && (
                                            <p className="text-red-500">{error.provision}</p>
                                        )}
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
                                            onChange={handleMandatoryInput}
                                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent"
                                        />
                                        {error.district && (
                                            <p className="text-red-500">{error.district}</p>
                                        )}
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
                                            onChange={handleMandatoryInput}
                                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent"
                                        />
                                        {error.municipality && (
                                            <p className="text-red-500">{error.municipality}</p>
                                        )}
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
                                            onChange={handleMandatoryInput}
                                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent"
                                        />
                                        {error.village && (
                                            <p className="text-red-500">{error.village}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Image Uploads */}
                            <div className="mb-8">
                                <h2 className="text-xl font-bold mb-4">Image Uploads</h2>
                                <div className="flex justify-between">
                                    <div>
                                        <div class="flex flex-col items-center gap-2">
                                            <div class="image w-[18vw] h-[12vw] rounded-md p-1 border border-gray-400 flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={`http://localhost:9000/images/uploads/${formData.existingImage1}`}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover rounded-md" />
                                            </div>
                                            <button onClick={(e) => handleImage1(e)} className="text-blue-500 capitalize">Change picture</button>
                                        </div>
                                        <input
                                            hidden
                                            type="file"
                                            name="image1"
                                            accept="image/*"
                                            onChange={handleMandatoryInput}
                                            className="image1"
                                        />
                                        {error.image1 && (
                                            <p className="text-red-500">{error.image1}</p>
                                        )
                                        }
                                    </div>
                                    <div>
                                        <div class="flex flex-col items-center gap-2">
                                            <div class="image w-[18vw] h-[12vw] rounded-md p-1 border border-gray-400 flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={`http://localhost:9000/images/uploads/${formData.existingImage2}`}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover rounded-md" />
                                            </div>
                                            <button onClick={(e) => handleImage2(e)} className="text-blue-500 capitalize">Change picture</button>
                                        </div>
                                        <input
                                            hidden
                                            type="file"
                                            name="image2"
                                            accept="image/*"
                                            onChange={handleMandatoryInput}
                                            className="image2"
                                        />
                                        {error.image2 && (
                                            <p className="text-red-500">{error.image2}</p>
                                        )
                                        }
                                    </div>
                                    <div>
                                        <div class="flex flex-col items-center gap-2">
                                            <div class="image w-[18vw] h-[12vw] rounded-md p-1 border border-gray-400 flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={`http://localhost:9000/images/uploads/${formData.existingImage3}`}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover rounded-md" />
                                            </div>
                                            <button onClick={(e) => handleImage3(e)} className="text-blue-500 capitalize">Change picture</button>
                                        </div>
                                        <input
                                            hidden
                                            type="file"
                                            name="image3"
                                            accept="image/*"
                                            onChange={handleMandatoryInput}
                                            className="image3"
                                        />
                                        {error.image3 && (
                                            <p className="text-red-500">{error.image3}</p>
                                        )
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* Bedrooms, Bathrooms, Kitchen */}
                            <div className="mb-8">
                                <h2 className="text-xl font-bold mb-4">Property Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {/* Bedrooms */}
                                    <div className="mb-4">
                                        <label
                                            htmlFor="bedrooms"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Bedrooms
                                        </label>
                                        <input
                                            type="number"
                                            id="bedrooms"
                                            name="bedrooms"
                                            value={formData.bedrooms}
                                            onChange={handleMandatoryInput}
                                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent"
                                        />
                                        {error.bedrooms && (
                                            <p className="text-red-500">{error.bedrooms}</p>
                                        )}
                                    </div>

                                    {/* Bathrooms */}
                                    <div className="mb-4">
                                        <label
                                            htmlFor="bathrooms"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Bathrooms
                                        </label>
                                        <input
                                            type="number"
                                            id="bathrooms"
                                            name="bathrooms"
                                            value={formData.bathrooms}
                                            onChange={handleMandatoryInput}
                                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent"
                                        />
                                        {error.bathrooms && (
                                            <p className="text-red-500">{error.bathrooms}</p>
                                        )}
                                    </div>

                                    {/* Kitchen */}
                                    <div className="mb-4">
                                        <label
                                            htmlFor="kitchen"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Kitchen
                                        </label>
                                        <input
                                            type="number"
                                            id="kitchen"
                                            name="kitchen"
                                            value={formData.kitchen}
                                            onChange={handleMandatoryInput}
                                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent"
                                        />
                                        {/* {error.kitchen && ( */}
                                        <p className="text-red-500">{error.kitchen}</p>
                                        {/* // )} */}
                                    </div>
                                </div>
                            </div>

                            {/* Price, Year Built, Size */}
                            <div className="mb-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {/* Price */}
                                    <div className="mb-4">
                                        <label
                                            htmlFor="price"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Price
                                        </label>
                                        <input
                                            type="number"
                                            id="price"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleMandatoryInput}
                                            className="mt-1 p-2 w-full border rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent"
                                        />
                                        {error.price && (
                                            <p className="text-red-500">{error.price}</p>
                                        )}
                                    </div>

                                    {/* Year Built */}
                                    <div className="mb-4">
                                        <label
                                            htmlFor="year-built"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Year Built
                                        </label>
                                        <input
                                            type="number"
                                            inputMode="numeric"
                                            id="year-built"
                                            name="yearBuilt"
                                            value={formData.yearBuilt}
                                            onChange={handleMandatoryInput}
                                            className="mt-1 p-2 w-full border rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent"
                                        />
                                        {error.yearBuilt && (
                                            <p className="text-red-500">{error.yearBuilt}</p>
                                        )}
                                    </div>

                                    {/* Size in Square Feet */}
                                    <div className="mb-4">
                                        <label
                                            htmlFor="size"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Size (sq. ft.)
                                        </label>
                                        <input
                                            type="number"
                                            id="size"
                                            name="size"
                                            value={formData.size}
                                            onChange={handleMandatoryInput}
                                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent"
                                        />
                                        {error.size && (
                                            <p className="text-red-500">{error.size}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Other Details */}
                        <div className="border border-blue-200 lg:p-4 mt-4">
                            <div className="mb-8">
                                <h2 className="text-xl font-bold mb-4">Other Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {/* Parking */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Parking
                                        </label>
                                        <select
                                            name="parking"
                                            value={formData.parking}
                                            onChange={handleOtherInput}
                                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent"
                                        >
                                            <option value="">Select an option</option>
                                            <option value="available">Available</option>
                                            <option value="not-available">Not Available</option>
                                        </select>
                                    </div>

                                    {/* Garden */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Garden
                                        </label>
                                        <select
                                            name="garden"
                                            value={formData.garden}
                                            onChange={handleOtherInput}
                                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent"
                                        >
                                            <option value="">Select an option</option>
                                            <option value="available">Available</option>
                                            <option value="not-available">Not Available</option>
                                        </select>
                                    </div>

                                    {/* Fireplace */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Fireplace
                                        </label>
                                        <select
                                            name="fireplace"
                                            value={formData.fireplace}
                                            onChange={handleOtherInput}
                                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent"
                                        >
                                            <option value="">Select an option</option>
                                            <option value="available">Available</option>
                                            <option value="not-available">Not Available</option>
                                        </select>
                                    </div>

                                    {/* Cooling */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Cooling
                                        </label>
                                        <select
                                            name="cooling"
                                            value={formData.cooling}
                                            onChange={handleOtherInput}
                                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent"
                                        >
                                            <option value="">Select an option</option>
                                            <option value="room-air-conditioner">
                                                Room Air Conditioner
                                            </option>
                                            <option value="ductless-system">Ductless System</option>
                                            <option value="fans">Fans</option>
                                        </select>
                                    </div>

                                    {/* Heating */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Heating
                                        </label>
                                        <select
                                            name="heating"
                                            value={formData.heating}
                                            onChange={handleOtherInput}
                                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent"
                                        >
                                            <option value="">Select an option</option>
                                            <option value="forced-air">Forced Air</option>
                                            <option value="electric-space-heating">
                                                Electric Space Heating
                                            </option>
                                            <option value="fireplace">Fireplace</option>
                                        </select>
                                    </div>

                                    {/* Laundry */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Laundry
                                        </label>
                                        <select
                                            name="laundry"
                                            value={formData.laundry}
                                            onChange={handleOtherInput}
                                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent"
                                        >
                                            <option value="">Select an option</option>
                                            <option value="available">Available</option>
                                            <option value="not-available">Not Available</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-4 mt-6">
                                    <label
                                        htmlFor="description"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleOtherInput}
                                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent"
                                        rows={10}
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
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
