import React from 'react'
import { CourseDetailsType } from '../page';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type CourseChaptersProps = {
    loading: boolean;
    courseDetails: CourseDetailsType | undefined;
}
const CourseChapters = ({
    loading,
    courseDetails
}: CourseChaptersProps) => {
    return (
        <div>
            {courseDetails?.chapters?.length === 0 ? (
                <div>
                    <Skeleton className='w-full mt-5 h-[100px] rounded-xl' />
                    <Skeleton className='w-full mt-5 h-[100px] rounded-xl' />
                    <Skeleton className='w-full mt-5 h-[100px] rounded-xl' />
                    <Skeleton className='w-full mt-5 h-[100px] rounded-xl' />
                </div>
            ) : (
                <div className='p-5 border-4 rounded-2xl'>
                    {courseDetails?.chapters?.map((chapter, index) => (
                        <Accordion type="single" collapsible key={chapter.chapterId}>
                            <AccordionItem value="item-1">
                                <AccordionTrigger className='p-3 hover:bg-zinc-800 font-game text-4xl'>
                                    <div className='flex gap-10'>
                                        <h2 className='h-10 w-10 bg-zinc-800 rounded text-center'>{index + 1}</h2>
                                        <h2> {chapter.name}</h2>
                                    </div>

                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className='p-7 bg-zinc-900 rounded-2xl'>
                                        {chapter.exercises.map((exercise, indexExc) => (
                                            <div key={indexExc} className='flex items-center justify-between my-7'>
                                                <div className='flex items-center gap-10 font-game'>
                                                    <h2 className='text-3xl'>Exercise {index * chapter.exercises.length + indexExc + 1}</h2>
                                                    <h2 className='text-3xl'>{exercise.name}</h2>
                                                </div>
                                                {/* <Button variant="pixel">{exercise.xp} XP</Button> */}
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button variant="pixelDisabled">???</Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p className='font-game text-lg'>Please Enroll first </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CourseChapters