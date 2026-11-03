import { PricingTable } from '@clerk/nextjs'
import React from 'react'

const Pricing = () => {
    return (
        <div className=' mt-20 flex flex-col items-center justify-center w-full px-72' >
            <h2 className='font-game text-4xl text-center mt-20'>Pricing</h2>
            <h2 className='font-game text-xl text-center'>Join For Unlimited access to all features and courses</h2>
            <PricingTable />
        </div>
    )
}

export default Pricing