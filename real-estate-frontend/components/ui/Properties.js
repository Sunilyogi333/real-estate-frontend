import React from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Properties = ({ Myproperties }) => {
  const router = useRouter();
  const [Properties, setProperties] = React.useState([]);

  React.useEffect(() => {
    setProperties(Myproperties);
  }, [Myproperties]);

  console.log("Properties herum: ", Properties);
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

    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

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
            {Properties.map((Myproperty, index) => (
              <tr key={index} className="hover:bg-sky-100"
                onClick={() => router.push(`/description/${Myproperty.propertyId}`)}
            
              >
                <td className="py-2 md:py-4 px-4 border-b">{Myproperty.date.split('T')[0]}</td>
                <td className="py-2 md:py-4 px-4 border-b flex flex-wrap gap-2">
                  <div className="w-[14vw] h-[5vh] md:w-[8vw] md:h-[8vw] lg:w-[4vw] lg:h-[4vw] bg-sky-100 rounded-md overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={`http://localhost:9000/images/uploads/${Myproperty.image1}`}
                      alt="property"
                    />
                  </div>
                  <div className="py-1">
                    <p className="font-semibold">{Myproperty.PropertyName}</p>
                    <p className="text-sm">{Myproperty.location}</p>
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
                      onClick={() => handleDelete(Myproperty.propertyId)}
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
