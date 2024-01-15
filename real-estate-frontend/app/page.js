"use client"


import Filter from '@/components/Filter'
import Header from '@/components/Header'
import Item from '@/components/Item'
import Items from '@/components/Items'
import Search from '@/components/Search'
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react'


const page = () => {

  useEffect(() =>{
    fetch('http://localhost:9000/').then
    (res => res.json())
    .then(data => console.log(data.message))
  },[])

  const [visible, setVisible] = useState(false)

  const onClick = () => {
    setVisible(!visible)
  }
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
