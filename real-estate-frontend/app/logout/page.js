"use client";
import React, { useEffect } from 'react'
import { useRouter } from "next/navigation";
import { useContext } from 'react'
import { AuthContext } from '@/context/authContext'


const page = () => {
  
    const { logout } = useContext(AuthContext);
    console.log(logout);
    const router = useRouter()
    // console.log("we are in logout page");

    useEffect(() => {
        logout();
    }, [logout]);
  return (
   router.push("/")
  )
}

export default page
