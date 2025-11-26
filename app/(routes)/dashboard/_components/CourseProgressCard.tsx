import React from 'react'
import { EnrolledCoursesType } from './EnrolledCourses'
import Image from 'next/image'
import { Progress } from '@/components/ui/progress'

type CourseProgressCardProps = {
    enrolledCourse: EnrolledCoursesType
}
const CourseProgressCard = ({ enrolledCourse }: CourseProgressCardProps) => {
    return (
        <div className='border-4 rounded-2xl '>
            <Image
                src={enrolledCourse.bannerImage}
                alt={enrolledCourse.title}
                width={500}
                height={500}
                className='w-full h-[170px] rounded-t-xl object-cover'
            />
            <div className='font-game p-4'>
                <h2 className='text-lg font-light text-gray-500'>Course</h2>
                <h2 className='text-3xl'>{enrolledCourse.title}</h2>
                <h2 className='mt-3 text-lg text-gray-400'>{enrolledCourse.completedExercises} Completed <span>out {enrolledCourse.totalExercises}</span></h2>
                <Progress value={(enrolledCourse.completedExercises / enrolledCourse.totalExercises) * 100} />
            </div>

        </div>
    )
}

export default CourseProgressCard