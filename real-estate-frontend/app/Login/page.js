"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Item from "@/components/Item";
import Image from "next/image";
import Group from "/public/Images/Icons/Group.png";
import serenity from "/public/Images/Icons/serenity.png";
import Link from "next/link";
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
    <div className="lg:flex lg:justify-center lg:items-center h-[100vh] w-full bg-gray-100">
      <div className="h-full lg:flex lg:justify-center lg:items-center rounded-md overflow-hidden lg:w-[60vw] lg:h-[80vh] bg-yellow-400 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div className="w-full lg:w-1/2 h-full p-6 bg-white shadow-md">
          <div className="flex gap-2">
            <Image src={serenity} alt="" />
            <span className="font-bold text-gray-800 text-2xl">Serenity</span>
          </div>
          <div className="px-8 py-40 lg:py-20 lg:px-20">
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
                  placeholder="hi@example.com"
                  onChange={handleInput}
                  className="mt-1 px-3 p-2 w-full border rounded-md bg-blue-50"
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
                  placeholder="Enter password"
                  onChange={handleInput}
                  className="mt-1 px-3 p-2 w-full border rounded-md bg-blue-50"
                />
                <p className="text-sm text-blue-500 mt-1">
                  forget password?
                </p>
              </div>

              <button
                type="submit"
                className="font-semibold mt-2 bg-blue-500 text-white p-2 rounded-md w-full"
              >
                Login
              </button>
            </form>
          <p className="mt-8 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link href="/Signup" className="font-semibold text-blue-500 mr-1">
              Signup
            </Link>
          </p>
          </div>

        </div>
        {/* another div for showing one item inside it */}
        <div className="hidden md:block w-1/2 h-full bg-blue-50 shadow-md relative">
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
