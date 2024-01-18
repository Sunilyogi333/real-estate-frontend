import React from "react";

const Images = () => {
  return (
    <>
<div className="flex flex-wrap mx-18 md:mx-20 lg:mx-36">
  <div className="my-1 px-1 w-full md:w-2/3 lg:my-4 lg:px-4 lg:w-3/5 rounded overflow-hidden lg:p-4">
    <img
      alt="Main Image"
      className="block h-auto w-full lg:h-full rounded-md overflow-hidden lg:px-1"
      src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    />
  </div>
  <div className="flex flex-wrap w-full md:w-1/3 lg:w-2/5 lg:flex-col rounded">
    <div className="my-1 px-1 w-1/2 md:w-full lg:mt-8 lg:p-2 lg:w-2/3 rounded border border-red-900">
      <img
        alt="Image 1"
        className="block h-auto w-full rounded"
        src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </div>
    <div className="my-1 px-1 w-1/2 md:w-full lg:my-4 lg:p-2 lg:w-2/3 rounded lg:mt-8 border border-red-900">
      <img
        alt="Image 2"
        className="block h-auto w-full rounded"
        src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </div>
  </div>
</div>

    </>
  );
};

export default Images;
