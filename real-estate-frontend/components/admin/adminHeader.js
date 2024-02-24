import React from 'react';
import Logo from '@/components/shared/logo'
import { useRouter } from "next/navigation";

const adminHeader = () => {
  const router = useRouter();
  const handleLogout = () =>{
    console.log("Logging out");
    router.push("/admin");
  }
  return (
  <>
  <header className="fixed top-0 left-0 w-full bg-white text-black border flex items-center justify-between p-4">
    {/* <div className="flex items-center">
      <img src="/images/logo.png" alt="Serenity Logo" className="h-10 w-10 mr-2" />
      <h1 className="text-xl font-bold">Serenity</h1>
    </div> */}
    <Logo></Logo>
    <button
      onClick={handleLogout}
      className="bg-blue-500 text-white p-2 rounded-md"
    >
      Logout
    </button>
  </header>
    </>
  );
  }

export default adminHeader;
