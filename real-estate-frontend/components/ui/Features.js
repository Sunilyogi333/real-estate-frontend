import React from "react";

const Features = ({propertyDetails}) => {
  return (
    <>
      <div className="">
        <h1 className="font-semibold text-2xl">Rental Features</h1>
        <div className="flex justify-between flex-wrap py-4">
          <div className="lg:w-96 ">
            <div className="flex justify-between mb-1">
              <p className="text-gray-700">Listed On</p>
              <p className="font-semibold">{propertyDetails.date}</p>
            </div>
            <div className="flex justify-between mb-1">
              <p className="text-gray-700">Data available</p>
              <p className="font-semibold">Available now</p>
            </div>
            <div className="flex justify-between mb-1">
              <p className= "text-gray-700">Type</p>
              <p className="font-semibold">{propertyDetails.propertyType}</p>
            </div>
            <div className="flex justify-between mb-1">
              <p className= "text-gray-700">Laundary</p>
              <p className="font-semibold">{propertyDetails.laundry}</p>
            </div>
            <div className="flex justify-between mb-1">
              <p className= "text-gray-700">Cooling</p>
              <p className="font-semibold">{propertyDetails.cooling}</p>
            </div>
            <div className="flex justify-between mb-1">
              <p className= "text-gray-700">Heating</p>
              <p className="font-semibold">{propertyDetails.heating}</p>
            </div>
          </div>
          <div className="lg:w-96 ">
          <div className="flex justify-between mb-1">
              <p className= "text-gray-700">City</p>
              <p className="font-semibold">{propertyDetails.location}</p>
            </div>
            <div className="flex justify-between mb-1">
              <p className= "text-gray-700">Year Built</p>
              <p className="font-semibold">{propertyDetails.yearBuilt}</p>
            </div>
            <div className="flex justify-between mb-1">
              <p className= "text-gray-700">Size</p>
              <p className="font-semibold">{propertyDetails.size} sqft</p>
            </div>
            <div className="flex justify-between mb-1">
              <p className= "text-gray-700">Kitchen</p>
              <p className="font-semibold">{propertyDetails.kitchen}</p>
            </div>
            <div className="flex justify-between mb-1">
              <p className= "text-gray-700">Parking Area</p>
              <p className="font-semibold">{propertyDetails.parking}</p>
            </div>
            <div className="flex justify-between mb-1">
              <p className= "text-gray-700">Deposit</p>
              <p className="font-semibold">lorem</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
