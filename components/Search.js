import React from 'react'

const Search = () => {
  return (
    <>
      <h1 className='pt-5 mx-24 text-2xl font-semibold'>1,780 listings in Nepal</h1>
      <p className='py-2 mx-24 text-sm  text-gray-500'>Rent your next home at one of our properties</p>
      <div className='flex justify-start py-2 mx-24'>
        <input
          type='text'
          placeholder='Search-Location'
          className='border-1 border-gray-200 rounded-md py-2 px-4 w-3/5 bg-blue-50
          focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent'
        />
      </div>
      {/* sort by Price Low to High, High to LoW, newest and also make three different for them */}
      <div className='flex justify-start py-2 mx-24'>
        <select className='border-2 border-gray-200 rounded-md py-2 px-4'>
          <option>Sort by</option>
          <option>Price Low to High</option>
          <option>Price High to Low</option>
          <option>Newest</option>
        </select>
      </div>
    </>
  )
}

export default Search
