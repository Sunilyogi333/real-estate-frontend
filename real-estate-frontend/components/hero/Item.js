import React from "react";
import Link from "next/link";
import Image from "next/image";
import Icons from "../shared/icons";

const Item = ({ properties }) => {
  // Set default values if properties are not provided
  
  const {
    price = 4000,
    propertyName = 'Road Side',
    location = 'Balkumari',
    provison = 'Kathmandu',
    district = 'Lalitpur',
    municipality = 'Mahalaxmi',
    village = 'Balkumari',
    bedrooms = 5,
    bathrooms = 4,
    size = 120,
    image1 = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    propertyId = null,
  } = properties || {};
  // console.log(properties);
  // console.log('img',properties.image1);
  console.log('imageeee', image1);

  return (
    <div className="w-[21rem]">
      <Link href="/description" as={`/description/${propertyId}`} >
        <div className="border border-blue-200 bg-white overflow-hidden rounded-lg">
          <div className="w-full h-[223px] overflow-hidden">
            <img
              src={
                properties && properties.image1
                  ? `http://localhost:9000/images/uploads/${image1}`
                  : "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt=""
            />

          </div>

          <div className="flex flex-col self-start md:w-full px-6 py-6">
            <div className="">
              <p className="font-bold text-blue-400 text-xl">NPR. {price}</p>
              <p className="text-xl font-bold py-2">{propertyName}</p>
              <p className="text-sm text-gray-500">{district}, {village}</p>
              <hr className="my-4" />
            </div>

            <div className="flex md:justify-between md:w-full items-center">
              <div className="flex justify-between w-full mt-2">
                <div className="flex items-center gap-2">
                  <Icons type="bed"></Icons>
                  <span className="text-xl">{bedrooms}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icons type="bath"></Icons>
                  <span className="text-xl">{bathrooms}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icons type="area"></Icons>
                  <span className="text-xl">{size} sqrft</span>
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


