import React from 'react'

const dashboard = () => {
    return (
        // <div>dashboard</div>
        <>
            <div className='bg-gray-50 w-full h-full flex'>
               <div className='w-full h-full flex item-center justify-around mt-12'>
               <div className='bg-sky-300 w-56 h-28 border rounded-md flex justify-center items-center'>
                    <div className='flex flex-col items-center justify-center'>
                        <p className='text-2xl font-medium'>Total Users</p>
                        <p className='text-2xl font-medium'>50</p>
                    </div>
                </div>
                <div className='bg-sky-300 w-56 h-28 border rounded-md flex justify-center items-center'>
                    <div className='flex flex-col items-center justify-center'>
                        <p className='text-2xl font-medium'>Verifed Users</p>
                        <p className='text-2xl font-medium'>50</p>
                    </div>
                </div>
                <div className='bg-sky-300 w-56 h-28 border rounded-md flex justify-center items-center'>
                    <div className='flex flex-col items-center justify-center'>
                        <p className='text-2xl font-medium'>Total Sellers</p>
                        <p className='text-2xl font-medium'>50</p>
                    </div>
                </div>
                <div className='bg-sky-300 w-56 h-28 border rounded-md flex justify-center items-center'>
                    <div className='flex flex-col items-center justify-center'>
                        <p className='text-2xl font-medium'>Total Buyers</p>
                        <p className='text-2xl font-medium'>50</p>
                    </div>
                </div>
               </div>
            </div >
        </>
    )
}

export default dashboard