"use client"

import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs';
import Image from 'next/image'
import Link from 'next/link';

const Hero = () => {
    const { user } = useUser();
    return (
        <div className='w-full relative h-screen overflow-hidden'>
            <Image
                src="/hero.gif"
                alt="Hero Image"
                width={1000}
                height={1000}
                className='w-full h-full object-cover absolute inset-0'
            />

            <div className='absolute w-full flex flex-col items-center mt-24'>
                <h2 className='font-bold text-7xl font-game'>Start Your</h2>
                <h2
                    className='font-bold text-8xl font-game text-yellow-400'
                    style={{
                        textShadow: "2px 2px 0 #000, -2px -2px 0 #000, -2px 2px 0 #000"
                    }}
                >Coding Journey</h2>
                <h2 className='mt-5 font-game text-3xl'>Beginner friendly coding courses and projects</h2>
                {!user ? (
                    <Link href="/sign-up">
                        <Button className='font-game text-3xl  p-6 mt-7' variant="pixel">
                            Get Started
                        </Button>
                    </Link>
                ) : (
                    <Link href="/dashboard">
                        <Button className='font-game text-3xl  p-6 mt-7' variant="pixel">
                            Go to Dashboard
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Hero