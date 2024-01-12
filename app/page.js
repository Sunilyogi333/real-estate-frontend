"use client"
import Filter from '@/components/Filter'
import Header from '@/components/Header'
import Item from '@/components/Item'
import Items from '@/components/Items'
import Search from '@/components/Search'
import React from 'react'

const page = () => {
  return (
    <>
    <Header />
    <Search />
    <div className='px-12 lg:mx-48 flex flex-col md:flex-col md:justify-between lg:px-0 lg:justify-between lg:flex-row'>
    <div className='flex lg:gap-10 flex-wrap lg:w-3/4'>
    <Item />
    <Item />
    <Item />
    <Item />
    <Item />
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
