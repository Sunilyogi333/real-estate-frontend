import React from "react";
import Link from "next/link";
import Image from "next/image";
import bbedrooms from "../public/Images/Icons/bbedrooms.png";
import bbathroom from "../public/Images/Icons/bbathrooms.png";
import barea from "../public/Images/Icons/barea.png";

const Item = () => {
  return (
    <div className="mt-8">
      <Link href="/description">
        <div className="border border-blue-200 w-[21rem] overflow-hidden rounded-lg">
          <div className="w-full">
            <img
              class="object-cover md:h-full md:w-full"
              src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>

          <div class="flex flex-col self-start md:w-full px-6 py-6">
             <div className="">
              <p className="font-bold text-blue-400 text-xl">NPR 2,400,000</p>
              <p className="text-xl font-bold py-2">House 1</p>
              <p className="text-sm text-gray-500">Bhaktapur, BAGMATI</p>
              <hr className="my-4"/>
             </div>

             <div className="flex md:justify-between md:w-full items-center">
              <div className="flex justify-between w-full mt-2">
                   
                 <div className="flex items-center gap-2">
                     <Image src={bbedrooms} alt="bedrooms"/>
                     <span className="text-xl">3</span>
                 </div>
                 <div className="flex items-center gap-2">
                     <Image src={bbathroom} alt="bedrooms"/>
                     <span className="text-xl">3</span>
                 </div>
                 <div className="flex items-center gap-2">
                     <Image src={barea} alt="bedrooms" />
                      <span className=" text-xl">
                          6x7.5 m<sup>2</sup>
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
