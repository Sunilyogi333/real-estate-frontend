import React from "react";

const Search = () => {
  return (
    <>
      <div className="px-8">
        <h1 className="pt-5 mx-4 md:mx-40 text-2xl font-semibold md:text-left">
          1,780 listings in Nepal
        </h1>
        <p className="py-2 mx-4 md:mx-40 text-sm text-gray-500 md:text-left">
          Rent your next home at one of our properties
        </p>

        <div className="flex flex-col md:flex-row justify-center md:justify-start md:items-start py-2 mx-4 md:mx-40">
          <input
            type="text"
            placeholder="Search Location"
            className="border-1 border-gray-200 rounded-md py-2 px-4 md:w-3/5 lg:w-3/5 bg-blue-50
        focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent"
          />
        </div>

        {/* Sort by Price Low to High, High to Low, Newest */}
        <div className="flex md:justify-start py-2 mx-4 md:mx-40">
          <select className="border-2 border-gray-200 rounded-md py-2 px-4">
            <option>Sort by</option>
            <option>Price Low to High</option>
            <option>Price High to Low</option>
            <option>Newest</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Search;
