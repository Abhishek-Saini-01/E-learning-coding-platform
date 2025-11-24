import { Progress } from '@/components/ui/progress'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { CourseDetailsType } from '../page';

type CourseStatusProps = {
    courseDetails: CourseDetailsType | undefined;
}

const CourseStatus = ({
    courseDetails
}: CourseStatusProps) => {
    const [counts, setCounts] = useState<{
        totalExercises: number;
        totalXP: number;
    }>();
    const GetCounts = () => {
        let totalExercises = 0;
        let totalXP = 0;
        courseDetails?.chapters?.forEach(chapter => {
            totalExercises += chapter.exercises.length;
            chapter.exercises.forEach(exercise => {
                totalXP += exercise.xp;
            })
        });
        setCounts({
            totalExercises,
            totalXP,
        })
    }
    useEffect(() => {
        courseDetails && GetCounts();
    }, [courseDetails])

    const updateProgress = (currentValue?: number, totalValue?: number) => {
        if (currentValue && totalValue) {
            return Math.round((currentValue / totalValue) * 100);
        }
        return 0;
    }
    return (
        <div className='font-game p-4 border-4 rounded-2xl w-full'>
            <h2 className='text-3xl'>Course Progress</h2>
            <div className="flex items-center gap-5 mt-4 w-full">
                <Image
                    src="/book.png"
                    alt='book'
                    width={50}
                    height={50}
                />
                <div className="w-full">
                    <h2 className='text-2xl flex justify-between items-center'>Excerises
                        <span className='text-gray-400'>1/{counts?.totalExercises}</span>
                    </h2>
                    <Progress value={37} className='mt-2' />
                </div>
            </div>
            <div className="flex items-center gap-5 mt-4 w-full">
                <Image
                    src="/star.png"
                    alt='star'
                    width={50}
                    height={50}
                />
                <div className="w-full">
                    <h2 className='text-2xl flex justify-between items-center'>XP Earned
                        <span className='text-gray-400'>{courseDetails?.courseEnrolledInfo.xpEarned}/{counts?.totalXP}</span>
                    </h2>

                    <Progress value={updateProgress(courseDetails?.courseEnrolledInfo.xpEarned, counts?.totalXP)} className='mt-2' />
                </div>
            </div>
        </div>
    )
}

export default CourseStatus