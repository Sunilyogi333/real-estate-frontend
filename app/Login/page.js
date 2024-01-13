"use client"
import React, { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
const page = () => {

  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInput = (event) =>{
    setFormData({...formData, [event.target.name]: event.target.value})
  }

  async function handleSubmit(event) {
    event.preventDefault(); 
    const res = await axios.post('http://localhost:9000/login', formData)
    console.log("🚀 ~ handleSubmit ~ res:", res)
    if (res.data.success) {
      localStorage.setItem('userId', res.data.data.userId);
        console.log(res.data.us);
        router.push('/');
        }
    else{
        console.log("s")
    }
}
  return (
    <div>
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Welcome!</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input type="email" id="email" name="email" onChange={handleInput} className="mt-1 p-2 w-full border rounded-md" />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input type="password" id="password" name="password" onChange={handleInput} className="mt-1 p-2 w-full border rounded-md" />
            <p className="text-xs text-gray-500 mt-1">Password must be 8 characters long</p>
          </div>

          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">Login</button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">Don't have an account? <a href="#" className="text-blue-500">Signup</a></p>
      </div>
    </div>
  )
}

export default page
