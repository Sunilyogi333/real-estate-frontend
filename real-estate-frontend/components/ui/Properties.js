import React from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Properties = ({ Myproperties, setTotalProperties, totalProperties }) => {
  const router = useRouter();
  const [Properties, setProperties] = React.useState([]);

  React.useEffect(() => {
    setProperties(Myproperties);
  }, [Myproperties]);

  console.log("Properties herum: ", Properties);
  // const total = Properties.length;
  console.log("totalProperties: ", totalProperties);
  const handleDelete = async (propertyId) => {
    try {
      // Display a confirmation prompt
      const confirmDelete = window.confirm("Are you sure you want to delete this property?");

      if (!confirmDelete) {
        return; // If the user cancels, do nothing
      }

      // Make a DELETE request to server with the propertyId
      await axios.delete(`http://localhost:9000/deleteProperty/${propertyId}`);
      setProperties(Properties.filter((property) => property.propertyId !== propertyId));
      setTotalProperties(totalProperties - 1);

    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  return (
    <div className="bg-gray-100 p-4 md:p-8 min-h-96">
      <div className="bg-white shadow-md rounded-md overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 border-b px-4 text-left">S.N</th>
              <th className="py-2 border-b px-4 text-left">Date</th>
              <th className="py-2 border-b px-4 text-left">Properties</th>
              <th className="py-2 border-b px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
          {totalProperties === 0 && (
                    <tr className="hover:bg-sky-100">
                      <td></td>
                      <td></td>
                      <td>
                      <div className="text-center w-full h-12 flex items-center justify-center text-left">
                      <p className="text-left w-full">You have no properties listed</p>
                      </div>
                      </td>
                      <td></td>
                   
                    </tr>
                      )}
            {Properties.map((Myproperty, index) => (
              <tr key={index} className="hover:bg-sky-100"
                onClick={() => router.push(`/description/${Myproperty.propertyId}`)}
            
              >
                <td className="py-2 md:py-4 px-4 border-b">{index + 1}</td>
                <td className="py-2 md:py-4 px-4 border-b">{Myproperty.date.split('T')[0]}</td>
                <td className="py-2 md:py-4 px-4 border-b flex flex-wrap gap-2 items-center justify-left">
                  <div className="w-[14vw] h-[5vh] md:w-[8vw] md:h-[8vw] lg:w-[4vw] lg:h-[4vw] bg-sky-100 rounded-md overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={`http://localhost:9000/images/uploads/${Myproperty.image1}`}
                      alt="property"
                    />
                  </div>
                  <div className="py-1">
                    <p className="">{Myproperty.propertyName}</p>
                    {/* <p className="text-sm">{Myproperty.location}</p> */}
                  </div>
                </td>
                <td className="py-4 md:py-4 px-4 border-b">
                  <div className="flex flex-col lg:flex-row gap-4 overflow-hidden">
                    <Link href= "/editProperty" as={`/editProperty/${Myproperty.propertyId}`}
                            onClick={(event) => {
                              event.stopPropagation();
                            }}
                    
                      className="bg-blue-500 text-white w-36 px-4 py-2 z-10 rounded text-center">
                      Edit Details
                    </Link>
                    <button
                      onClick={(event) =>{
                         handleDelete(Myproperty.propertyId)
                         event.stopPropagation();

                      }}
                      className="bg-red-500 text-white w-36 px-4 py-2 z-10 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Properties;
