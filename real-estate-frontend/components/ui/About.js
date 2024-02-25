import React from "react";
import Icons from "../shared/icons";
import Features from "./Features";


import Link from "next/link";
const about = ({propertyDetails}) => {
  return (
    <>
      <div className="flex lg:mx-40 lg:w-10/12 flex-wrap">
        <div className="hello lg:w-3/5 md:flex-wrap lg:pr-4">
          <div className="flex justify-around lg:w-full border rounded lg:px-10 py-2 h-max flex-wrap">
            <div>
              <p>Bedrooms</p>
              <div className="flex items-center gap-2 mt-2">
                <Icons type="bed"></Icons>
                <span className="font-semibold">{propertyDetails.bedrooms}</span>
              </div>
            </div>
            <div>
              <p>Bathrooms</p>
              <div className="flex items-center gap-2 mt-2">
              <Icons type="bath"></Icons>
                <span className="font-semibold">{propertyDetails.bathrooms}</span>
              </div>
            </div>
            <div>
              <p>Square Area</p>
              <div className="flex items-center gap-2 mt-2">
              <Icons type="area"></Icons>
                <span className="font-semibold">
                  {propertyDetails.size}sqrft
                </span>
              </div>
            </div>
            <div>
              <p>Repair Quality</p>
              <div className="flex items-center gap-2 mt-2">
              <Icons type="repair"></Icons>
                <span className="font-semibold">Modern Loft</span>
              </div>
            </div>
            <div>
              <p>Status</p>
              <div className="flex items-center gap-2 mt-2">
              <Icons type="active"></Icons>
                <span className="font-semibold">Active</span>
              </div>
            </div>
            {/* <div>
              <p>Type</p>
              <div className="flex items-center gap-2 mt-2">
                <Image src={bedrooms} alt="bedrooms" />
                <span className="font-semibold">Home</span>
              </div>
            </div> */}
          </div>
          <div className=" lg:w-full rounded py-2 h-max">
            <h1 className="font-semibold text-2xl lg:my-4">About this home</h1>
            <p>
           {propertyDetails.description}
            </p>
            <div className=" bg-blue-100 border rounded lg:px-4 py-4 lg:my-4">
              <p>Listed by property owner</p>
              <div className="flex justify-between items-center lg:px-2 lg:pt-4">
                <div className="flex justify-center items-center gap-3">
                  <div className="w-[3vw] h-[3vw] bg-sky-100 rounded-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src ={`http://localhost:9000/images/uploads/${propertyDetails.profilePicture}`}
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{propertyDetails.username}</p>
                    <p className="text-sm">{propertyDetails.district}, {propertyDetails.village}</p>
                  </div>
                </div>
                <div>
                <Link href="/agentInfo" as={`/agentInfo/${propertyDetails.agentId}`} 
                    className="font-semibold bg-blue-200 text-blue-500 rounded px-10 py-4"
                  >
                    Get more info
                  </Link>
                </div>
              </div>
            </div>
            <hr className="my-4" />
          </div>
          <Features propertyDetails = {propertyDetails}/>
        </div>
        <div className="border border-blue-500 rounded-md lg:w-96  lg:p-4 h-full">
          <p className="font-normal text-sm  text-gray-500">Price</p>
          <p className="font-bold text-blue-400">NPR {propertyDetails.price}</p>
          <hr className="my-3"/>
          <p className="font-bold text-xl">Contact info</p>
          <div className="flex gap-2 mt-3">
          <Icons type="gmail"></Icons>
            <span>{propertyDetails.email}</span>
          </div>
          <div className="flex gap-2 mt-3">
          <Icons type="phone"></Icons>
            <span>{propertyDetails.phoneNumber}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default about;
