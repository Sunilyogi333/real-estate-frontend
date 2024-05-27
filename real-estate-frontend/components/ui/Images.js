import React from "react";

const Images = ({propertyDetails}) => {
  return (
    <>
<div className="flex flex-wrap mx-18 md:mx-20 lg:mx-36">
  <div className="my-1 px-1 w-full md:w-2/3 lg:my-4 lg:px-4 lg:w-3/5 lg:max-h-[40rem] rounded overflow-hidden lg:p-4">
    <img
      alt="Main Image"
      className="block h-auto w-full lg:h-full rounded-md overflow-hidden lg:px-1"
      src ={`http://localhost:9000/images/uploads/${propertyDetails.image1}`}
    />
  </div>
  <div className="flex flex-wrap w-full md:w-1/3 lg:w-2/5 lg:flex-col rounded">
    <div className="my-1 px-1 w-1/2 md:w-full lg:mt-8 lg:p-2 lg:w-2/3 rounded border border-1 border-blue-700">
      <img
        alt="Image 1"
        className="block h-auto w-full rounded"
        src ={`http://localhost:9000/images/uploads/${propertyDetails.image2}`}
        />
    </div>
    <div className="my-1 px-1 w-1/2 md:w-full lg:my-4 lg:p-2 lg:w-2/3 rounded lg:mt-8 border border-blue-700">
      <img
        alt="Image 2"
        className="block h-auto w-full rounded"
        src ={`http://localhost:9000/images/uploads/${propertyDetails.image3}`}
      />
    </div>
  </div>
</div>

    </>
  );
};

export default Images;
