import Link from "next/link";
import React from "react";

const items = () => {
  return (
    <>
      <div className="px-24">
        <Link
          href="/description"
          class="my-4 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:h-48 md:max-w-2xl"
        >
          <img
            class="object-cover rounded-t-lg md:h-full md:w-80 md:rounded-none md:rounded-s-lg"
            src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div class="flex flex-col p-5 self-start md:w-full">
            <p className="font-bold text-blue-400">NPR 2,400
              <span className="font-normal text-sm  text-gray-500">/month</span>
            </p>
            <p className="text-xl font-bold py-2" >House 1</p>
            <p className="text-sm text-gray-500">210 Nepal Highway, Bhaktapur, BAGMATI</p>
            <div className="flex md:justify-between md:w-full items-center pt-5">
            <div className="flex gap-2">
              <span className="text-sm text-gray-500"> 3</span>
              <span className="text-sm text-gray-500">2</span>
              <span className="text-sm text-gray-500">1</span>
            </div>
              <button
                className="border-2 border-blue-300 cursor-pointer text-gray-700 font-semibold text-base py-2 px-4 mr-4 rounded-md">
                View details
              </button>
            </div>
                      </div>
        </Link>
      </div>
    </>
  );
};

export default items;
