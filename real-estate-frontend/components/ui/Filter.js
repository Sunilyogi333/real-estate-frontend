import React from "react";

const Filter = () => {
  function toggleLocation(element) {
    element.classList.toggle("bg-gray-300");
  }

  return (
    <>
      <div className="mt-8 w-[21rem] lg:w-full">
        <div className="flex flex-col space-y-4 p-4 bg-gray-200 rounded-md">
          <div className="flex flex-col">
            <div className="text-sm font-semibold mb-1">Location</div>
            <div className="space-x-2 flex flex-wrap">
              <div
                className="loc bg-white text-gray-700 p-2 rounded-md cursor-pointer focus:bg-gray-300"
                // onClick={(e) => toggleLocation(e.currentTarget)}
              >
                City 1
              </div>
              <div
                className="bg-white text-gray-700 p-2 rounded-md cursor-pointer focus:bg-gray-300"
                // onClick={(e) => toggleLocation(e.currentTarget)}
              >
                City 2
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="price-range" className="text-sm font-semibold">
              Price Range
            </label>
            <input
              type="range"
              id="price-range"
              className="mt-2"
              min="0"
              max="1000000"
              step="10000"
            />
            <span id="price-value" className="text-sm mt-1">
              0 - 1,000,000
            </span>
          </div>

          <div className="flex flex-col">
            <label htmlFor="type" className="text-sm font-semibold">
              Type
            </label>
            <select id="type" className="p-2 border rounded-md">
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
            </select>
          </div>

          <button className="bg-blue-500 text-white p-2 rounded-md">
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default Filter;
