import React from "react";
import Link from "next/link";
import Image from "next/image";
import Icons from "../shared/icons";
// import bbedrooms from "../public/Images/Icons/bbedrooms.png";
// import bbathroom from "../public/Images/Icons/bbathrooms.png";
// import barea from "../public/Images/Icons/barea.png";

const Item = (properties) => {
  console.log("Properties in item table:", properties);
  return (
    <div className=" w-[21rem]">
      <Link href="/description">
        <div className="border border-blue-200 bg-white overflow-hidden rounded-lg">
          <div className="w-full h-[223px]">
            <img
              className="object-cover md:h-full md:w-full"
              src={
                `http://localhost:9000/images/uploads/` +
                properties.properties.image1
              }
              alt=""
            />
          </div>

          <div className="flex flex-col self-start md:w-full px-6 py-6">
            <div className="">
              <p className="font-bold text-blue-400 text-xl">
                {properties.properties.price}
              </p>
              <p className="text-xl font-bold py-2">
                {properties.properties.propertyName}
              </p>
              <p className="text-sm text-gray-500">
                {properties.properties.location}
              </p>
              <hr className="my-4" />
            </div>

            <div className="flex md:justify-between md:w-full items-center">
              <div className="flex justify-between w-full mt-2">
                <div className="flex items-center gap-2">
                  <Icons type="bed"></Icons>
                  <span className="text-xl">
                  {properties.properties.bedrooms}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Icons type="bath"></Icons>
                  <span className="text-xl">
                  {properties.properties.bathrooms}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Icons type="area"></Icons>
                  <span className=" text-xl">
                  {properties.properties.size} sqrft
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Item;
