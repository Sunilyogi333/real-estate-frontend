import React from "react";

const Properties = () => {
  return (
    <div className="bg-gray-100 p-4 md:p-8">
      <div className="bg-white shadow-md rounded-md overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 border-b px-4 text-left">Date</th>
              <th className="py-2 border-b px-4 text-left">Property</th>
              <th className="py-2 border-b px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-sky-100">
              <td className="py-2 md:py-4 px-4 border-b">2024-01-11</td>
              <td className="py-2 md:py-4 px-4 border-b flex flex-wrap gap-2">
                <div className="w-[14vw] h-[5vh] md:w-[8vw] md:h-[8vw] lg:w-[4vw] lg:h-[4vw] bg-sky-100 rounded-md overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="property"
                  />
                </div>
                <div className="py-1">
                  <p className="font-semibold">Roadside house</p>
                  <p className="text-sm">Balkumari, Lalitpur</p>
                </div>
              </td>
              <td className="py-4 md:py-4 px-4 border-b">
                <div className="flex flex-col lg:flex-row gap-4 overflow-hidden">
                  <button className="bg-blue-500 text-white w-36 px-4 py-2 rounded">
                    View Details
                  </button>
                  <button className="bg-red-500 text-white w-36 px-4 py-2 rounded">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            <tr className="hover:bg-sky-100">
              <td className="py-2 md:py-4 px-4 border-b">2024-01-11</td>
              <td className="py-2 md:py-4 px-4 border-b flex flex-wrap gap-2">
                <div className="w-[14vw] h-[5vh] md:w-[8vw] md:h-[8vw] lg:w-[4vw] lg:h-[4vw] bg-sky-100 rounded-md overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="property"
                  />
                </div>
                <div className="py-1">
                  <p className="font-semibold">Roadside house</p>
                  <p className="text-sm">Balkumari, Lalitpur</p>
                </div>
              </td>
              <td className="py-4 md:py-4 px-4 border-b">
                <div className="flex flex-col lg:flex-row gap-4 overflow-hidden">
                  <button className="bg-blue-500 text-white w-36 px-4 py-2 rounded">
                    View Details
                  </button>
                  <button className="bg-red-500 text-white w-36 px-4 py-2 rounded">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Properties;
