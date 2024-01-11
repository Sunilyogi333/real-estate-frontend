import React from "react";

const Features = () => {
  return (
    <>
      <div className="">
        <h1 className="font-semibold text-2xl">Rental Features</h1>
        <div className="flex justify-between flex-wrap py-4">
          <div className="lg:w-96 ">
            <div className="flex justify-between mb-1">
              <p className="text-gray-700">Listed On</p>
              <p className="font-semibold">12/12/2021</p>
            </div>
            <div className="flex justify-between mb-1">
              <p className="text-gray-700">Data available</p>
              <p className="font-semibold">Available now</p>
            </div>
            <div className="flex justify-between mb-1">
              <p className= "text-gray-700">Type</p>
              <p className="font-semibold">Home</p>
            </div>
            <div className="flex justify-between mb-1">
              <p className= "text-gray-700">Laundary</p>
              <p className="font-semibold">In unit</p>
            </div>
            <div className="flex justify-between mb-1">
              <p className= "text-gray-700">Cooling</p>
              <p className="font-semibold">Air Conditioner</p>
            </div>
            <div className="flex justify-between mb-1">
              <p className= "text-gray-700">Heating</p>
              <p className="font-semibold">Forced Air</p>
            </div>
          </div>
          <div className="lg:w-96 ">
          <div className="flex justify-between mb-1">
              <p className= "text-gray-700">City</p>
              <p className="font-semibold">Itahari</p>
            </div>
            <div className="flex justify-between mb-1">
              <p className= "text-gray-700">Year Built</p>
              <p className="font-semibold">2018</p>
            </div>
            <div className="flex justify-between mb-1">
              <p className= "text-gray-700">Size</p>
              <p className="font-semibold">2,173 sqft</p>
            </div>
            <div className="flex justify-between mb-1">
              <p className= "text-gray-700">Lot size</p>
              <p className="font-semibold">9,060</p>
            </div>
            <div className="flex justify-between mb-1">
              <p className= "text-gray-700">Parking Area</p>
              <p className="font-semibold">Yes</p>
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
