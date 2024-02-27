import React, { useState } from "react";

const Search = ({setProperties, properties, totalProperties}) => {
  const [search, setSearch] = useState("");

  const handleSorting = (e) => {
    const value = e.target.value;
    if (value === 'lowToHigh') {
      const sortedProperties = properties.sort((a, b) => a.price - b.price);
      setProperties([...sortedProperties]);
    } else if (value === 'HighToLow') {
      const sortedProperties = properties.sort((a, b) => b.price - a.price);
      setProperties([...sortedProperties]);
    } else if (value === 'newest') {
      const sortedProperties = properties.sort((a, b) => new Date(b.date) - new Date(a.date));
      setProperties([...sortedProperties]);
    } else if (value === 'oldest') {
      const sortedProperties = properties.sort((a, b) => new Date(a.date) - new Date(b.date));
      setProperties([...sortedProperties]);
    }
  }
 //Searching
  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filteredProperties = properties.filter((property) => {
      return property.district.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setProperties([...filteredProperties]);
  }

  return (
    <>
      <div className="px-8">
        <h1 className="pt-5 mx-4 md:mx-40 text-2xl font-semibold md:text-left">
          {totalProperties} listings in Nepal
        </h1>
        <p className="py-2 mx-4 md:mx-40 text-sm text-gray-500 md:text-left">
          Buy your next home at one of our properties
        </p>

        <div className="flex flex-col md:flex-row justify-center md:justify-start md:items-start py-2 mx-4 md:mx-40">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search Location (District)"
            className="border-1 border-gray-200 rounded-md py-2 px-4 md:w-3/5 lg:w-3/5 bg-blue-50
        focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent"
          />
        </div>

        {/* Sort by Price Low to High, High to Low, Newest */}
        <div className="flex md:justify-start py-2 mx-4 md:mx-40">
          <select className="border-2 border-gray-200 rounded-md py-2 px-4" onChange={handleSorting}>
            <option>Sort by</option>
            <option value='lowToHigh'>Price Low to High</option>
            <option value='HighToLow'>Price High to Low</option>
            <option value='newest'>Newest</option>
            <option value='oldest'>Oldest</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Search;
