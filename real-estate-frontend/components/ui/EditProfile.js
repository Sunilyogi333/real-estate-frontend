
import { useState,useEffect } from 'react';

const EditProfile = ({ user, onSave ,visibility,onUpdate}) => {
  const [editedUser, setEditedUser] = useState({ ...user });

  useEffect(() => {
    // Update parent component state whenever editedUser changes
    onUpdate(editedUser);
  }, [editedUser, onUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Assuming onSave is a function passed as a prop to handle saving changes
    onSave(editedUser);
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md w-96">
        
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      {visibility?
      <form>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={editedUser.fullName}
          onChange={handleChange}
          className="border rounded-md p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Number of Listings</label>
        <input
          type="number"
          name="numberOfListings"
          value={editedUser.numberOfListings}
          onChange={handleChange}
          className="border rounded-md p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
        <input
          type="text"
          name="dateOfBirth"
          value={editedUser.dateOfBirth}
          onChange={handleChange}
          className="border rounded-md p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Age</label>
        <input
          type="number"
          name="age"
          value={editedUser.age}
          onChange={handleChange}
          className="border rounded-md p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={editedUser.email}
          onChange={handleChange}
          className="border rounded-md p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          value={editedUser.phoneNumber}
          onChange={handleChange}
          className="border rounded-md p-2 w-full"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Save Changes
        </button>
      </div>
    </form>
      :
      <form>
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2">Full Name</label>
          <input
          disabled
            type="text"
            name="fullName"
            value={editedUser.fullName}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2">Number of Listings</label>
          <input
          disabled
            type="number"
            name="numberOfListings"
            value={editedUser.numberOfListings}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2">Date of Birth</label>
          <input
          disabled
            type="text"
            name="dateOfBirth"
            value={editedUser.dateOfBirth}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2">Age</label>
          <input
          disabled
            type="number"
            name="age"
            value={editedUser.age}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2">Email</label>
          <input
          disabled
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2">Phone Number</label>
          <input
          disabled
            type="tel"
            name="phoneNumber"
            value={editedUser.phoneNumber}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
        </div>

        <div className="flex justify-end">
          <button
          disabled
            type="button"
            onClick={handleSave}
            className="bg-blue-100 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Save Changes
          </button>
        </div>
      </form>
      }
      
    </div>
  );
};

export default EditProfile;
