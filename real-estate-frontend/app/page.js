"use client"
import Filter from '@/components/ui/Filter'
import Header from '@/components/shared/header'
import Item from '@/components/ui/Item'
// import Items from '@/components/ui/Items'
import Search from '@/components/ui/Search'
// import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import axios from 'axios'


const page = () => {

  useEffect(() =>{
    axios.get('http://localhost:9000/',{
      headers: {
        'access-token' : localStorage.getItem('token')
      }
    })
    .then(res =>{
      console.log(res)
    })
    .catch(err => console.log(err))
  },[])

    return (
    <>
    <Header />
    <Search />
    <div className='px-12 lg:mx-48 flex flex-col md:flex-col md:justify-between lg:px-0 lg:justify-between lg:flex-row'>
    <div className='flex lg:gap-10 flex-wrap lg:w-3/4'>
      {Array(10).fill().map((_, i) => 
      <Item key={i} />
      )}
     
 
    </div>
    <div className='w-1/4 '>
      <Filter />
    </div>
    </div>
    <div>
      footer
    </div>
    </>
  )
}

export default page
