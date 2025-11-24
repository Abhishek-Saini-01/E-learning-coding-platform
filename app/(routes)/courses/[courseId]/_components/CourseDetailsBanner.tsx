"use client";
import { useState } from 'react'
import { CourseDetailsType } from '../page';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import { toast } from 'sonner';

type CourseDetailsBannerProps = {
    loading: boolean;
    courseDetails: CourseDetailsType | undefined;
    refreshData: () => void
}

const CourseDetailsBanner = ({
    loading,
    courseDetails,
    refreshData
}: CourseDetailsBannerProps) => {
    const [enrollLoading, setEnrollLoading] = useState(false);

    const enrolledCourse = async () => {
        try {
            setEnrollLoading(true);
            const result = await axios.post('/api/enroll-course', {
                courseId: courseDetails?.courseId
            });
            toast.success("Course Enrolled!")
            refreshData();
        } catch (error) {
            console.log("[ENROLL_COURSE_ERROR]", error);
        } finally {
            setEnrollLoading(false);
        }
    }

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
                            {!courseDetails.userEnrolled ? (
                                <Button onClick={enrolledCourse} disabled={enrollLoading || loading} className='text-2xl mt-6' variant="pixel" size="lg">
                                    {enrollLoading && <Loader2Icon className='animate-spin' />}
                                    Enroll Now
                                </Button>) : (
                                <Button className='text-2xl mt-6' variant="pixel" size="lg">
                                    Continue Learning...
                                </Button>
                            )}
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default CourseDetailsBanner