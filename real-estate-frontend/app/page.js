"use client"
import Filter from '@/components/hero/Filter'
import Header from '@/components/shared/header'
import Item from '@/components/hero/Item'
// import Items from '@/components/ui/Items'
import Search from '@/components/hero/Search'
// import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import Footer from '@/components/shared/footer'


const page = () => {
  const dummyData1={
    price:"200000",
    name:"Bardaghat Villa 1",
    location:{city:"bardaghat",zone:"lumbini"},
    util:{bed:"4",bath:"5"},
    dimension:{length:"7",width:"30"},
  }
  const dummyData2={
    price:"200000",
    name:"Bardaghat Villa 2",
    location:{city:"bardaghat",zone:"lumbini"},
    util:{bed:"4",bath:"5"},
    dimension:{length:"7",width:"30"},
  }
  const dummyData3={
    price:"200000",
    name:"Bardaghat Villa 3",
    location:{city:"bardaghat",zone:"lumbini"},
    util:{bed:"4",bath:"5"},
    dimension:{length:"7",width:"30"},
  }
  const dummyData4={
    price:"200000",
    name:"Bardaghat Villa 4",
    location:{city:"bardaghat",zone:"lumbini"},
    util:{bed:"4",bath:"5"},
    dimension:{length:"7",width:"30"},
  }
  const arrayDummyData=[dummyData1,dummyData2,dummyData3,dummyData4]

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
      {arrayDummyData.map((data)=> <Item data={data}></Item>)}
     
 
    </div>
    <div className='w-1/4 '>
      <Filter />
    </div>
    </div>
    <Footer></Footer>
    </>
  )
}

export default page
