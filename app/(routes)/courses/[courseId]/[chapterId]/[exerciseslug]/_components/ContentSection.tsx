import React from 'react'
import { CourseExerciseDataType } from '../page'
import { Skeleton } from '@/components/ui/skeleton';
import { LightbulbIcon } from 'lucide-react';

type ContentSectionProps = {
    courseExerciseData: CourseExerciseDataType | undefined;
    loading: boolean
}

const ContentSection = ({
    courseExerciseData,
    loading
}: ContentSectionProps) => {
    const contentInfo = courseExerciseData?.exerciseData;
    return (
        <div className='p-10 mb-28'>
            {loading || !contentInfo ? (
                <Skeleton className="h-full w-full m-10 rounded-2xl" />
            ) : (
                <div>
                    <h2 className='font-game text-3xl my-3'>{courseExerciseData?.exerciseData.exerciseName}</h2>
                    <div dangerouslySetInnerHTML={{ __html: contentInfo?.exerciseContent.content }}></div>
                    <div>
                        <h2 className='font-game text-3xl mt-4'>Task</h2>
                        <div className='p-4 border rounded-2xl bg-zinc-800' dangerouslySetInnerHTML={{ __html: contentInfo?.exerciseContent.task }}></div>
                    </div>
                    <div>
                        <h2 className='font-game text-3xl mt-4 flex gap-2 items-center text-yellow-400'><LightbulbIcon /> Hint</h2>
                        <div className='p-4 border rounded-2xl bg-zinc-800' dangerouslySetInnerHTML={{ __html: contentInfo?.exerciseContent.hint }}></div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ContentSection