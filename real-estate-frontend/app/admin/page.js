"use client"
import React from 'react'
import Link from 'next/link'
import Image from "next/image";
import serenity from "/public/images/icons/serenity.png";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {
    const [formData, setFormData] = useState({
        adminEmail: "",
        adminPassword: "",
    });
    const router = useRouter();
    axios.defaults.withCredentials = true;

    const [serverError, setServerError] = useState({});

    const handleInput = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    async function handleSubmit(event) {
        event.preventDefault();
        const res = await axios.post("http://localhost:9000/adminLogin", formData);
        console.log("🚀 ~ handleSubmit ~ res:", res);
        if (res.data.success) {
            console.log(res.data.user)
            router.push("/adminPage");
        } else {
            console.log("res:", res.data);
            setServerError(res.data);
            console.log(serverError);
            console.log("failed");
        }
    }
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
                <div className=" w-full flex gap-2 items-center justify-center">
                    <Image src={serenity} alt="" />
                    <span className="font-bold text-gray-800 text-2xl">Admin</span>
                </div>
                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="mb-4">
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-800 "
                            >
                                Email
                            </label>
                            <span className="text-xs text-red-500 italic mr-2">
                                {serverError.accountError}
                            </span>
                        </div>
                        <input
                            type="email"
                            name="adminEmail"
                            onChange={handleInput}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label><input
                            type="password"
                            name="adminPassword"
                            onChange={handleInput}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <Link
                        href="/forget"
                        className="text-xs text-blue-600 hover:underline"
                    >
                        Forget Password?
                    </Link>
                    <div className="mt-2">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default page