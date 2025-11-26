"use client"
import { UserDetailsContext } from '@/context/UserDetailsContext'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React, { use, useContext } from 'react'

const UserStatus = () => {
    const { user } = useUser();
    const { userDetails, setUserDetails } = useContext(UserDetailsContext);
    return (
        <div className='p-4 border-4 rounded-2xl'>
            <div className='flex gap-3 items-center'>
                <Image
                    src="/alex_walk.gif"
                    alt="Alex walking"
                    width={70}
                    height={70}
                />
                <h2 className='font-game text-2xl'>{user?.primaryEmailAddress?.emailAddress}</h2>
            </div>
            <div className="grid grid-cols-2 gap-5">
                <div className='flex gap-3 items-center'>
                    <Image
                        src="/star.png"
                        alt="Star"
                        width={35}
                        height={35}
                    />
                    <div>
                        <h2 className='font-game text-3xl'>{userDetails?.points}</h2>
                        <h2 className='font-game text-xl text-gray-500'>Total Rewards</h2>
                    </div>
                </div>
                <div className='flex gap-3 items-center'>
                    <Image
                        src="/badge.png"
                        alt="Badge"
                        width={35}
                        height={35}
                    />
                    <div>
                        <h2 className='font-game text-3xl'>3</h2>
                        <h2 className='font-game text-xl text-gray-500'>Badge</h2>
                    </div>
                </div>
                <div className='flex gap-3 items-center'>
                    <Image
                        src="/fire.png"
                        alt="fire"
                        width={35}
                        height={35}
                    />
                    <div>
                        <h2 className='font-game text-3xl'>7</h2>
                        <h2 className='font-game text-xl text-gray-500'>Daily Streak</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserStatus