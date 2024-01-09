"use client"
import Header from '@/components/Header'
import Items from '@/components/Items'
import Search from '@/components/Search'
import React from 'react'
const page = () => {
  return (
    <>
    <Header />
    <hr/>
    <Search />
    <div className='flex justify-between flex-wrap'>
    <Items />
    <Items />
    <Items />
    <Items />
    </div>
    <div>
      footer
    </div>
    </>
  )
}

export default page
