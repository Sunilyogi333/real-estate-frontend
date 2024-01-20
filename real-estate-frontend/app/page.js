"use client";
import Filter from "@/components/ui/Filter";
import Header from "@/components/shared/header";
import Item from "@/components/ui/Item";
// import Items from '@/components/ui/Items'
import Search from "@/components/ui/Search";
// import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from "axios";

const page = () => {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:9000")
    .then((res) => {
      if (res.data.Status === "Success") {
        setAuth(true);
        setUserId(res.data.userId);
        console.log(res.data)
      } else {
        setAuth(false);
        setMessage(res.data.Error);
      }
    })
    .then(err => console.log(err));
  }, []);

  return (
    <>
      <Header auth={auth} setAuth={setAuth}/>
      <Search />
      <div className="px-12 lg:mx-48 flex flex-col md:flex-col md:justify-between lg:px-0 lg:justify-between lg:flex-row">
        <div className="flex lg:gap-10 flex-wrap mt-8 lg:w-3/4">
          {Array(10)
            .fill()
            .map((_, i) => (
              <Item key={i} />
            ))}
        </div>
        <div className="w-1/4 ">
          <Filter />
        </div>
      </div>
      <div>user id is {userId} and this is footer</div>
    </>
  );
};

export default page;
