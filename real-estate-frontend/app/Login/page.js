"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Item from "@/components/Item";
import Image from "next/image";
import Group from "/public/Images/Icons/Group.png";
import serenity from "/public/Images/Icons/serenity.png";
const page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const res = await axios.post("http://localhost:9000/login", formData);
    console.log("🚀 ~ handleSubmit ~ res:", res);
    if (res.data.success) {
      localStorage.setItem("userId", res.data.data.userId);
      console.log(res.data.us);
      router.push("/");
    } else {
      console.log("s");
    }
  }
  return (
    <div className="flex justify-center items-center h-[100vh] w-full bg-red-600">
      <div className="flex justify-center items-center rounded-md overflow-hidden w-[60vw] h-[80vh] bg-yellow-400">
        <div className=" w-1/2 h-full p-6 bg-white shadow-md">
          <div className="flex gap-2">
            <Image src={serenity} alt="" />
            <span className="font-bold text-gray-800 text-2xl">Serenity</span>
          </div>
          <div className="py-20 px-20">
            <h2 className="text-2xl font-semibold mb-4">
              Welcome!
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600 "
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleInput}
                  className="mt-1 p-2 w-full border rounded-md bg-blue-50"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleInput}
                  className="mt-1 p-2 w-full border rounded-md bg-blue-50"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Password must be 8 characters long
                </p>
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md w-full"
              >
                Login
              </button>
            </form>
          </div>

          <p className="mt-4 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="text-blue-500">
              Signup
            </a>
          </p>
        </div>
        {/* another div for showing one item inside it */}
        <div className="w-1/2 h-full bg-blue-50 shadow-md relative">
          <Image src={Group}></Image>
          <div className="absolute top-28 left-16 p-4 bg-white">
            <Item />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
