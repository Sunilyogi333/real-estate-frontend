import React from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "../shared/button";

const kycForms = ({ formDetails, handleOptionClick, setFormId}) => {
    // const router = useRouter();
    console.log("data", formDetails);

    return (
        <div className="bg-gray-100 p-4 md:p-8 h-full border rounded-md">
            <h1 className="text-blue-500 text-2xl font-semibold mb-4">KYC Forms</h1>
            <div className="bg-white shadow-md rounded-md overflow-hidden">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="py-2 border-b px-4 text-left text-xl">S.N</th>
                            <th className="py-2 border-b px-4 text-left text-xl">Forms</th>
                            <th className="py-2 border-b px-4 text-left text-xl">Date</th>
                            <th className="py-2 border-b px-4 text-left text-xl">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formDetails.map((form, index) => (
                            <tr key={index} className="hover:bg-sky-100"
                            onClick={() =>
                               { setFormId(form.id)
                                 handleOptionClick('View Details');
                               }
                                } 
                            >
                                <td className="py-2 md:py-4 px-4 border-b">{index + 1}</td>
                                <td className="py-2 md:py-4 px-4 border-b flex flex-wrap gap-2">
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-[4vw] h-[5vh] md:w-[8vw] md:h-[8vw] lg:w-[2vw] lg:h-[2vw] bg-sky-100 rounded-md overflow-hidden">
                                            <img className="w-full h-full object-cover" src={`http://localhost:9000/images/uploads/${form.userPhoto}`} alt="property" />
                                        </div>
                                        <div className="py-1">
                                            <p className="font-semibold">{form.firstName} {form.lastName}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2 md:py-4 px-4 border-b">hello</td>
                                <td className="py-4 md:py-4 px-4 border-b">
                                    <div className="flex flex-col lg:flex-row gap-4 overflow-hidden">
                                        <button
                                            onClick={(e) => {
                                                setFormId(form.id);
                                                // e.stopPropagation();
                                            }}
                                            className="bg-blue-500 text-white w-36 px-4 py-2 z-10 rounded text-center">
                                            View Details
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

export default kycForms;
