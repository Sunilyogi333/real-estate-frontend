import React from "react";
import Icons from "../shared/icons";
import Features from "./Features";


import Link from "next/link";
const about = () => {
  return (
    <>
      <div className="flex lg:mx-40 lg:w-10/12 flex-wrap">
        <div className="hello lg:w-3/5 md:flex-wrap lg:pr-4">
          <div className="flex justify-around lg:w-full border rounded lg:px-10 py-2 h-max flex-wrap">
            <div>
              <p>Bedrooms</p>
              <div className="flex items-center gap-2 mt-2">
                <Icons type="bed"></Icons>
                <span className="font-semibold">4</span>
              </div>
            </div>
            <div>
              <p>Bathrooms</p>
              <div className="flex items-center gap-2 mt-2">
              <Icons type="bath"></Icons>
                <span className="font-semibold">4</span>
              </div>
            </div>
            <div>
              <p>Square Area</p>
              <div className="flex items-center gap-2 mt-2">
              <Icons type="area"></Icons>
                <span className="font-semibold">
                  6x7.5 m<sup>2</sup>
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
              Check out that Custom Backyard Entertaining space! 3237sqft, 4
              Bedrooms, 2 Bathrooms house on a Lake Villa street in the
              Biratnagar neighborhood of Texas. Well cared for with tons of
              upgrades! Newer stainless steel appliances will stay with the
              unit, including dishwasher, fridge, stove, microwave, and washer
              and dryer. Tenant pays electricity and gas bills. Water, Sewer,
              and Trash are covered by Landlord. Tenant is responsible for
              lawncare and snow removal. Landlord provides lawn mower. Minimum
              one year lease.
            </p>
            <div className=" bg-blue-100 border rounded lg:px-4 py-4 lg:my-4">
              <p>Listed by property owner</p>
              <div className="flex justify-between items-center lg:px-2 lg:pt-4">
                <div className="flex justify-center items-center gap-3">
                  <div class="w-[3vw] h-[3vw] bg-sky-100 rounded-full overflow-hidden">
                    <img
                      class="w-full h-full object-cover"
                      src="https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p9991602_p_v12_aj.jpg"
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="font-semibold">Sunil Nath</p>
                    <p className="text-sm">Balkumari, Lalitpur</p>
                  </div>
                </div>
                <div>
                  <Link
                    className="font-semibold bg-blue-200 text-blue-500 rounded px-10 py-4"
                    href="/agentInfo"
                  >
                    Get more info
                  </Link>
                </div>
              </div>
            </div>
            <hr className="my-4" />
          </div>
          <Features />
        </div>
        <div className="border border-blue-500 rounded-md lg:w-96  lg:p-4 h-full">
          <p className="font-normal text-sm  text-gray-500">Price</p>
          <p className="font-bold text-blue-400">NPR 2,600,000</p>
          <hr className="my-3"/>
          <p className="font-bold text-xl">Contact info</p>
          <div className="flex gap-2 mt-3">
          <Icons type="gmail"></Icons>
            <span>sunilnath0109@gmail.com</span>
          </div>
          <div className="flex gap-2 mt-3">
          <Icons type="phone"></Icons>
            <span>9828000000</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default about;
