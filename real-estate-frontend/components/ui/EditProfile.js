
import { useState, useEffect } from 'react';
import axios from "axios";

const EditProfile = ({ user, onSave, visibility, onUpdate }) => {
  const [editedUser, setEditedUser] = useState({ ...user });

  // useEffect(() => {
  //   // Update parent component state whenever editedUser changes
  //   onUpdate(editedUser);
  // }, [editedUser, onUpdate]);

  //sunil-dynamic update
  useEffect(() => {
    setEditedUser({ ...user }); // Update editedUser when the user prop changes
  }, [user]);

  console.log("Edit Profile:", editedUser)
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: type === "file" ? e.target.files[0] : value,
    }));
  };

  const handlePictureClick = (e) => {
    document.querySelector('.trigger').click();
    e.preventDefault();

  };

  // const handleSave = () => {
  //   // Assuming onSave is a function passed as a prop to handle saving changes
  //   onSave(editedUser);
  // };

  const handleSave = async () => {
    const formData = new FormData();
    if (editedUser.profilePicture) {
      formData.append('profilePicture', editedUser.profilePicture);
    }
    formData.append('userId', editedUser.userId);
    formData.append('username', editedUser.username);
    formData.append('numberOfListings', editedUser.numberOfListings);
    formData.append('date_of_birth', editedUser.date_of_birth);
    formData.append('phoneNumber', editedUser.phoneNumber);

    try {
      const response = await axios.put('http://localhost:9000/updateProfile', formData);
      console.log('Profile updated successfully:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };



  return (
    <div className="bg-white p-6 rounded-md shadow-md w-96">

      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      {visibility ?
        <form encType="multipart/form-data">
          <div>
            <div class="flex flex-col items-center gap-2 mt-10">
              <div class="image w-[8vw] h-[8vw] rounded-full border-2 border-zinc-800 flex items-center justify-center overflow-hidden">
                <img
                  src={`http://localhost:9000/images/uploads/${editedUser.profilePicture}`}
                  alt="Profile"
                  className="w-full h-full object-cover" />
              </div>
              <button onClick={(e) => handlePictureClick(e)} className="text-blue-500 capitalize">select picture</button>
            </div>
            <input
              hidden
              className='trigger'
              type="file"
              onChange={handleChange}
              name="profilePicture" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
            <input
              type="text"
              name="username"
              value={editedUser.username}
              onChange={handleChange}
              className="border rounded-md p-2 w-full"
            />
          </div>
{/* 
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Number of Listings</label>
            <input
              type="number"
              name="numberOfListings"
              value={editedUser.numberOfListings}
              onChange={handleChange}
              className="border rounded-md p-2 w-full"
            />
          </div> */}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
            <input
              type="date"
              //person should be 18 years old so set the max date to exactly 18 years ago
              max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0]}
              name="date_of_birth"
              value={editedUser.date_of_birth}
              onChange={handleChange}
              className="border rounded-md p-2 w-full"
            />
            <span className='text-gray-400 text-xs ml-2'>- must be 18 years old</span>

          </div>
          {/* 
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Age</label>
        <input
          type="number"
          name="age"
          value={editedUser.age}
          onChange={handleChange}
          className="border rounded-md p-2 w-full"
        />
      </div> */}

          {/* <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={editedUser.email}
          onChange={handleChange}
          className="border rounded-md p-2 w-full"
        />
      </div> */}

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
          <div>
            <div class="flex flex-col items-center gap-2 mt-10 ">
              <div class="image w-[8vw] h-[8vw] rounded-full border-2 border-zinc-800 flex items-center justify-center overflow-hidden opacity-5">
                <img
                  src={`http://localhost:9000/images/uploads/${editedUser.profilePicture}`}
                  alt="Profile"
                  className="w-full h-full object-cover" />
              </div>
              <button onClick={(e) => handlePictureClick(e)} className="text-blue-200 capitalize">select picture</button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-200 text-sm font-bold mb-2">Full Name</label>
            <input
              disabled
              type="text"
              name="username"
              value={editedUser.username}
              onChange={handleChange}
              className="border rounded-md p-2 w-full text-gray-200"
            />
          </div>

          {/* <div className="mb-4">
            <label className="block text-gray-200 text-sm font-bold mb-2">Number of Listings</label>
            <input
              disabled
              type="number"
              name="numberOfListings"
              value={editedUser.numberOfListings}
              onChange={handleChange}
              className="border rounded-md p-2 w-full text-gray-200"
            />
          </div> */}

          <div className="mb-4">
            <label className="block text-gray-200 text-sm font-bold ">Date of Birth</label>
            <input
              disabled
              type="date"
              max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0]}
              name="date_of_birth"
              value={editedUser.date_of_birth || ''}
              onChange={handleChange}
              className="border rounded-md p-2 w-full text-gray-200 mt-2"
            />
            <span className='text-gray-200 text-xs ml-2'>-must be 18 years old</span>
          </div>

          {/* <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2">Age</label>
          <input
          disabled
            type="number"
            name="age"
            value={editedUser.age}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
        </div> */}

          {/* <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2">Email</label>
          <input
          disabled
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
        </div> */}

          <div className="mb-4">
            <label className="block text-gray-200 text-sm font-bold mb-2">Phone Number</label>
            <input
              disabled
              type="tel"
              name="phoneNumber"
              value={editedUser.phoneNumber}
              onChange={handleChange}
              className="border rounded-md p-2 w-full text-gray-200"
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
