import About from '@/components/About'
import Header from '@/components/ui/header'
import Images from '@/components/Images'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      <Header />
      <Link className='mx-40 text-blue-500 font-medium' href='/'>Back to Homepage</Link>
      <h1 className='text-2xl font-bold text-gray-800 my-3 mx-40'>Roadside House</h1>
      <p className="text-sm text-gray-500 mx-40">210 Nepal Highway, Bhaktapur, BAGMATI</p>
      <Images />
      <About />
    </div>
  )
}

export default page
