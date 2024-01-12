import Link from "next/link";
import React from "react";
import Image from "next/image";
import bbedrooms from "../public/Images/Icons/bbedrooms.png";
import bbathrooms from "../public/Images/Icons/bbathrooms.png";
import barea from "../public/Images/Icons/barea.png";

const items = () => {
  return (
    <>
      <div className="lg:mr-14">
        <Link
          href="/description"
          class="my-4 flex flex-col  items-center bg-white border border-gray-200 rounded-lg shadow md:h-60 "
        >
          <div className="border border-red-600">
            <img
              class="object-cover rounded-t-lg md:h-full md:w-80 md:rounded-none md:rounded-s-lg"
              src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <div class="flex flex-col p-5 self-start md:w-full">
              <p className="font-bold text-blue-400">NPR 2,400,000</p>
              <p className="text-xl font-bold py-2">House 1</p>
              <p className="text-sm text-gray-500">
                210 Nepal Highway, Bhaktapur, BAGMATI
              </p>
              <div className="flex md:justify-between md:w-full items-center pt-5">
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 mt-2">
                    <Image src={bbedrooms} alt="bedrooms" />
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Image src={bbathrooms} alt="bedrooms" />
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Image src={barea} alt="bedrooms" />
                    <span className="font-semibold">
                      6x7.5 m<sup>2</sup>
                    </span>
                  </div>
                </div>
                <button className="border-2 border-blue-300 cursor-pointer text-gray-700 font-semibold text-base py-2 px-4 mr-4 rounded-md">
                  View details
                </button>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default items;
