"use client"
import React from 'react'

const dashboard = ({totalUsers}) => {


    return (
        // <div>dashboard</div>
        <>
            <div className='bg-gray-50 w-full h-full flex'>
               <div className='w-full h-full flex item-center justify-around mt-12'>
               <div className='bg-sky-300 w-56 h-28 border rounded-md flex justify-center items-center'>
                    <div className='flex flex-col items-center justify-center'>
                        <p className='text-2xl font-medium'>Total Users</p>
                        <p className='text-2xl font-medium'>{totalUsers.totalUsersNumber}</p>
                    </div>
                </div>
                <div className='bg-sky-300 w-56 h-28 border rounded-md flex justify-center items-center'>
                    <div className='flex flex-col items-center justify-center'>
                        <p className='text-2xl font-medium'>Verifed Users</p>
                        <p className='text-2xl font-medium'>{totalUsers.totalVerifiedUsers}</p>
                    </div>
                </div>
                <div className='bg-sky-300 w-56 h-28 border rounded-md flex justify-center items-center'>
                    <div className='flex flex-col items-center justify-center'>
                        <p className='text-2xl font-medium'>Total Sellers</p>
                        <p className='text-2xl font-medium'>{totalUsers.totalSellers}</p>
                    </div>
                </div>
                <div className='bg-sky-300 w-56 h-28 border rounded-md flex justify-center items-center'>
                    <div className='flex flex-col items-center justify-center'>
                        <p className='text-2xl font-medium'>Total listings</p>
                        <p className='text-2xl font-medium'>{totalUsers.totalListings}</p>
                    </div>
                </div>
               </div>
            </div >
        </>
    )
}

export default dashboard