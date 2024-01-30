import About from '@/components/ui/About'
import Header from '@/components/shared/header'
import Images from '@/components/ui/Images'
import Link from 'next/link'
import React from 'react'


const page = ({params}) => {
  // use params.id to make api call and display information
  
  return (
    <div>
      <Header />
      <Link className='mx-40 text-blue-500 font-medium' href='/'>Back to Homepage</Link>
      <h1 className='text-2xl font-bold text-gray-800 my-3 mx-40'>Roadside House {params.id}</h1>
      <p className="text-sm text-gray-500 mx-40">210 Nepal Highway, Bhaktapur, BAGMATI</p>
      <Images />
      <About />
    </div>
  )
}

export default page;
