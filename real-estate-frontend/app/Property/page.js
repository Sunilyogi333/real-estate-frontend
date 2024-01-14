"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";


const page = () => {
  const router = useRouter();
  const user = localStorage.getItem("userId");
  const [formData, setFormData] = useState({
    userId:'',
    name: "",
    price: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    squareArea: "",
    type: "",
    yearBuilt: "",
    city: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleFileInput = (e) => {
  //   const { name, files } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: files,
  //   }));
  // };

  async function handleSubmit(event) {
    event.preventDefault();
    formData.userId = user;
    const res = await axios.post("http://localhost:9000/addProperty", formData);
    console.log("🚀 ~ handleSubmit ~ res:", res);
    if (res.data.success) {
      console.log(res);
      router.push("/description");
    } else {
      console.log("s");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Add Property
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Property Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInput}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-600"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              onChange={handleInput}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-600"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInput}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          {/* <div className="mb-4">
            <label
              htmlFor="propertyImages"
              className="block text-sm font-medium text-gray-600"
            >
              Property Images
            </label>
            <input
              type="file"
              id="propertyImages"
              name="propertyImages"
              multiple
              onChange={handleFileInput}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="propertyImages"
              className="block text-sm font-medium text-gray-600"
            >
              Property Images
            </label>
            <input
              type="file"
              id="propertyImages"
              name="propertyImages"
              multiple
              onChange={handleFileInput}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="propertyImages"
              className="block text-sm font-medium text-gray-600"
            >
              Property Images
            </label>
            <input
              type="file"
              id="propertyImages"
              name="propertyImages"
              multiple
              onChange={handleFileInput}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div> */}

          <div className="mb-4">
            <label
              htmlFor="bedrooms"
              className="block text-sm font-medium text-gray-600"
            >
              Bedrooms
            </label>
            <input
              type="number"
              id="bedrooms"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleInput}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="bathrooms"
              className="block text-sm font-medium text-gray-600"
            >
              Bathrooms
            </label>
            <input
              type="number"
              id="bathrooms"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleInput}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="squareArea"
              className="block text-sm font-medium text-gray-600"
            >
              Square Area
            </label>
            <input
              type="number"
              id="squareArea"
              name="squareArea"
              value={formData.squareArea}
              onChange={handleInput}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-600"
            >
              Type
            </label>
            <input
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInput}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="yearBuilt"
              className="block text-sm font-medium text-gray-600"
            >
              Year Built
            </label>
            <input
              type="number"
              id="yearBuilt"
              name="yearBuilt"
              value={formData.yearBuilt}
              onChange={handleInput}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-600"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInput}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md w-full"
          >
            Add Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
