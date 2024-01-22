"use client";
import React, { useState } from "react";
import axios from "axios"; // Make sure to import Axios
import { useRouter } from "next/router";
import Header from "@/components/shared/header";
import { AuthContext } from "@/context/authContext";
import { useContext } from "react";

const page = () => {
  const { userId } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    userId: userId,
    propertyName: '',
    location: '',
    propertyType: 'commercial',
    bedrooms: '',
    bathrooms: '',
    kitchen: '',
    price: '',
    yearBuilt: '',
    size: '',
    parking: '',
    garden: '',
    fireplace: '',
    cooling: '',
    heating: '',
    laundry: '',
    image1: null,
    image2: null,
    image3: null,
  });

  const handleMandatoryInput = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'file' ? e.target.files[0] : value,
    }));
  };

  const handleOtherInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    axios.post('http://localhost:9000/addProperty', formDataToSend)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header />
      <div className=" px-4 lg:px-60 py-6 overflow-hidden">
        <div className="bg-gray-100 px-12 py-8 border-2 border-gray-200 rounded-md">
          <h1 className="text-2xl font-bold mb-4 text-blue-500">
            Add Property Details
          </h1>
          <form onSubmit={handleSubmit} encType="multipart/form-data" >
          {/* Mandatory Details */}
          <div className="lg:p-4 border border-blue-200 rounded-md">
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Mandatory Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                </div>

                {/* Location */}
                <div className="mb-4">
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
                </div>

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
                </div>
              </div>
            </div>

            {/* Image Uploads */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Image Uploads</h2>
              <input
                type="file"
                name="image1"
                accept="image/*"
                onChange={handleMandatoryInput}
                className="mb-2"
              />
              <input
                type="file"
                name="image2"
                accept="image/*"
                onChange={handleMandatoryInput}
                className="mb-2"
              />
              <input
                type="file"
                name="image3"
                accept="image/*"
                onChange={handleMandatoryInput}
                className="mb-2"
              />
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
    </>
  );
};

export default page;
