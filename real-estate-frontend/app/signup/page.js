"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Item from "@/components/hero/Item";
import Image from "next/image";
import Group from "/public/images/icons/Group.png";
import serenity from "/public/images/icons/serenity.png";
import Link from "next/link";
import Validation from "./signupValidation";

function page() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age:11
  });

  const [error, setError] = useState({});
  const [serverError, setServerError] = useState();

  const handleInput = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setError({ ...error, [event.target.name]: "" });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const error = Validation(formData);
    setError(error);
    console.log("formdata", formData);
    console.log("error", error);  

    if (Object.keys(error).length > 0) {
      console.log("error length", Object.keys(error).length);
      return;
    }
    const res = await axios.post("http://localhost:9000/signup", formData);
    if (res.data.success) {
      console.log(res);
      router.push("/login");
    } else {
      console.log("🚀 ~ handleSubmit ~ res:", res);
      setError(res.data)
      // console.log("s");
      setServerError(res.data.Error);
      console.log(res.data.Error);
    }
  }
  return (
    <div className="lg:flex lg:justify-center lg:items-center h-[100vh] w-full bg-gray-100">
      <div className="h-full lg:flex lg:justify-center lg:items-center rounded-md overflow-hidden lg:w-[60vw] lg:h-[80vh] bg-yellow-400 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div className="w-full lg:w-1/2 h-full p-6 bg-white shadow-md">
          <div className="flex gap-2">
            <Image src={serenity} alt="logo"></Image>
            <span className="font-bold text-gray-800 text-2xl">Serenity</span>
          </div>
          <div className="px-8 py-40 lg:py-20 lg:px-20">
            <h2 className="text-2xl font-semibold mb-4">Welcome!</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-600 "
                  >
                    Username
                  </label>
                  <span className="text-xs text-red-500 italic mr-2">
                    {error.name ? error.name : ''}
                  </span>
                </div>
                <input
                  type="text"
                  id="username"
                  name="name"
                  placeholder="Full Name"
                  onChange={handleInput}
                  className="mt-1 px-3 p-2 w-full border rounded-md bg-blue-50 outline-none focus:border-blue-400"
                />
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-600 "
                  >
                    Email
                  </label>
                  <span className="text-xs text-red-500 italic mr-2">
                    {error.email ? error.email : ''}
                    {serverError}
                  </span>

                </div>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="hi@example.com"
                  onChange={handleInput}
                  className="mt-1 p-2 px-3 w-full border rounded-md bg-blue-50 outline-none focus:border-blue-400"
                />
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Password
                  </label>
                  <span className="text-xs text-red-500 italic mr-2">
                    {error.password ? error.password : ''}
                  </span>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  onChange={handleInput}
                  className="mt-1 p-2 px-3 w-full border rounded-md bg-blue-50 outline-none focus:border-blue-400"
                />
                <p className="text-xs text-gray-500 mt-1 italic">
                  - password must have 6 characters <br />- include numbers and
                  special characters
                </p>
              </div>

              <button
                type="submit"
                className="font-semibold mt-2 bg-blue-500 text-white p-2 rounded-md w-full"
              >
                Signup
              </button>
            </form>
            <p className="mt-8 text-sm text-center text-gray-600">
              Already have an account?
              <Link href="/login" className="font-semibold text-blue-500 ml-1">
                Login
              </Link>
            </p>
          </div>
        </div>
        {/* another div for showing one item inside it */}
        <div className="hidden md:block w-1/2 h-full bg-blue-50 shadow-md relative">
          <Image src={Group} alt="group"></Image>
          <div className="absolute top-28 left-16 p-4 bg-white">
            <Item />
          </div>
        </div>
      </div>
    </div>
  );
}
export default page;
