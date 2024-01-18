import Header from "@/components/shared/header";
import Properties from "@/components/ui/Properties";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <Header />
      <div className="border border-blue-400 rounded-md mx-4 md:mx-8 lg:mx-16 xl:mx-32">
        <div className="flex flex-col md:flex-row justify-between flex-wrap h-full border py-6 px-4">
          <div className="flex flex-col md:flex-row gap-4 overflow-hidden w-full md:w-auto">
            <div className="text-center md:text-left">
              <p className="text-xl font-semibold">Overview</p>
              <p className="text-center text-sm md:text-left">Last 30 days</p>
            </div>
            <div>
              <p>Total Properties</p>
              <p className="font-semibold">12</p>
            </div>
          </div>
          <div className="flex mt-4 md:mt-0">
            <Link
              className="font-semibold bg-blue-200 text-blue-500 rounded px-2 py-2"
              href="/Property"
            >
              Add new Properties
            </Link>
          </div>
        </div>
        <div>
          <Properties />
        </div>
      </div>
    </>
  );
};

export default page;
