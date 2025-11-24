import React from 'react'
import { CourseDetailsType } from '../page';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

type CourseDetailsBannerProps = {
    loading: boolean;
    courseDetails: CourseDetailsType | undefined;
}

const CourseDetailsBanner = ({
    loading,
    courseDetails
}: CourseDetailsBannerProps) => {
    return (
        <div>
            {
                !courseDetails ? (
                    <Skeleton className='w-full h-[300px] rounded-2xl' />
                ) : (
                    <div className='relative'>
                        <Image
                            src={courseDetails?.bannerImage}
                            alt={courseDetails?.title}
                            width={1400}
                            height={300}
                            className='w-full h-[350px] object-cover'
                        />
                        <div className="font-game absolute top-0 pt-20 p-10 md:px-24 lg:px-36 bg-linear-to-r from-black/80 to-white-50/50 h-full">
                            <h2 className='text-6xl'>{courseDetails?.title}</h2>
                            <p className='text-3xl mt-3 text-gray-300'>{courseDetails?.desc}</p>
                            <Button className='text-2xl mt-6' variant="pixel" size="lg">
                                Enroll Now
                            </Button>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default CourseDetailsBanner