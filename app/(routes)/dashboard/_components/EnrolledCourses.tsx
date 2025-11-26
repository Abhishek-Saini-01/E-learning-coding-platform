"use client"
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react'
import CourseProgressCard from './CourseProgressCard';

export type EnrolledCoursesType = {
    bannerImage: string;
    completedExercises: number;
    courseId: number;
    level: string;
    title: string;
    totalExercises: number;
    xpEarned: number;
}

const EnrolledCourses = () => {
    const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCoursesType[]>([]);
    const [loading, setLoading] = useState(false);
    const getEnrolledCourse = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/course?courseId=enrolled');
            setEnrolledCourses(res.data);
        } catch (error) {
            console.log("[ENROLLED_COURSES_ERROR]", error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getEnrolledCourse();
    }, [])
    return (
        <div className='mt-8'>
            <h2 className='text-4xl mb-2 font-game'>Your Enrolled Courses</h2>
            {loading && (
                <Skeleton className='w-full rounded-2xl my-5' />
            )}
            {enrolledCourses.length === 0 ? (
                <div className='flex flex-col items-center gap-3 p-7 border rounded-2xl bg-zinc-900'>
                    <Image
                        src="/books.png"
                        alt='book'
                        width={90}
                        height={90}
                    />
                    <h2 className='font-game text-2xl'>You Don&apos;t have any enrolled courses</h2>
                    <Link href="/courses">
                        <Button variant="pixel" className='font-game text-lg' size="lg">Browse All Courses</Button>
                    </Link>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    {enrolledCourses.map((course, index) => (
                        <Link href={`/courses/${course.courseId}`} key={index}>
                            <CourseProgressCard
                                enrolledCourse={course}
                            />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default EnrolledCourses