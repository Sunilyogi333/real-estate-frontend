import React, { useState, useEffect } from 'react';
import Item from '../hero/Item';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


const AboutHome = ({ properties }) => {
  const [images, setImages] = useState([
    'https://images.pexels.com/photos/453201/pexels-photo-453201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/2468773/pexels-photo-2468773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  ]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 5000);

    return () => clearInterval(intervalId);
  }, [images]);

  return (
    <>
      <div className='h-max'>
        <div className="w-full h-[80vh] rounded overflow-hidden relative px-38">
          {images.map((image, index) => (
            <img
              key={index}
              alt="Main Image"
              className="block h-auto w-full lg:h-full rounded-md overflow-hidden lg:px-1 object-cover object-center absolute top-0 left-0 transition-opacity duration-1000"
              src={image}
              style={{
                zIndex: index === currentImageIndex ? 2 : 1,
                opacity: index === currentImageIndex ? 1 : 0,
              }}
            />
          ))}
          <div className="w-full h-full mt-8 text-center absolute z-10 top-0 left-0">
            <div className='w-full h-full text-center flex flex-col items-center justify-center'>
              <h1 className="text-8xl text-white font-bold">Serenity</h1>
              <h2 className='text-4xl text-white font-semibold'>Welcome to Serenity, the most trusted website for all your real estate needs.</h2>
            </div>
          </div>
        </div>
        <div className='px-24'>
          <div className="mt-12">
            <h1 className="text-4xl font-bold text-center text-gray-700">LATEST PROPERTIES</h1>
            <div className="flex lg:gap-10 flex-wrap items-center justify-around mt-8 lg:w-full">
              {properties.slice(0, 4).map((property, index) => (
                <Item key={index} properties={property} />
              ))}
            </div>
          </div>
          {/* <hr className='my-8 mt-12 border border-1 border-gray-200'></hr> */}
          <div className='mt-12'>
            <h1 className="text-4xl font-bold text-center text-gray-700">OUR SERVICES</h1>
            <div className="flex items-center justify-around gap-2 mt-8">
              <div className='flex flex-col items-center justify-center '>
                <div
                  className='h-32 w-32 bg-white border border-2 border-blue-100 rounded-full flex items-center justify-center'
                >
                  <img
                    src="/images/icons/pSelling.png" alt="property"
                    className="h-24 w-24" />
                </div>
                <span className="text-xl mt-4">Selling Service</span>
              </div>
              <div className='flex flex-col items-center justify-center '>
                <div
                  className='h-32 w-32 bg-white border border-2 border-blue-100 rounded-full flex items-center justify-center'
                >
                  <img
                    src="/images/icons/pListing.png" alt="property"
                    className="h-20 w-20" />
                </div>
                <span className="text-xl mt-4">Property Listing</span>
              </div>
              <div className='flex flex-col items-center justify-center '>
                <div
                  className='h-32 w-32 bg-white border border-2 border-blue-100 rounded-full flex items-center justify-center'
                >
                  <img
                    src="/images/icons/uInteraction.png" alt="property"
                    className="h-24 w-24" />
                </div>
                <span className="text-xl mt-4">User Interaction</span>
              </div>
              <div className='flex flex-col items-center justify-center '>
                <div
                  className='h-32 w-32 bg-white border border-2 border-blue-100 rounded-full flex items-center justify-center'
                >
                  <img
                    src="/images/icons/pManagement.png" alt="property"
                    className="h-24 w-24" />
                </div>
                <span className="text-xl mt-4">Property Management</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutHome;
