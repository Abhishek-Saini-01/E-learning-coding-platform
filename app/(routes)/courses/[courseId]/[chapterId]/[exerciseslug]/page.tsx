"use client";

import axios from 'axios';
import { useParams } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import { ChapterExerciseType, CompletedExercisesType } from '../../page';
import { type } from 'os';
import ContentSection from './_components/ContentSection';
import CodeEditor from './_components/CodeEditor';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export type ExerciseContentType = {
    content: string;
    hint: string;
    hintXp: number;
    output: string;
    regex: string;
    starterCode: any;
    task: string;
}
export type ExerciseDataType = {
    chapterId: number;
    courseId: number;
    exerciseId: string;
    exerciseName: string;
    exerciseContent: ExerciseContentType
}
export type CourseExerciseDataType = {
    chapterId: number;
    courseId: number;
    desc: string;
    name: string;
    exercises: ChapterExerciseType[];
    exerciseData: ExerciseDataType;
    completedExercise: CompletedExercisesType[]
}
const Playground = () => {
    const { courseId, chapterId, exerciseslug } = useParams();
    const [loading, setLoading] = useState(false);
    const [courseExerciseData, setCourseExerciseData] = useState<CourseExerciseDataType>()
    const [exerciseInfo, setExerciseInfo] = useState<ChapterExerciseType>();
    const [nextButtonRoute, setNextButtonRoute] = useState<string>()
    const [prevButtonRoute, setPrevButtonRoute] = useState<string>()
    // const [Splitter, setSplitter] = useState<any>(null);
    // useEffect(() => {
    //     let mounted = true;
    //     import("react-splitter-layout")
    //         .then((mod) => {
    //             if (mounted) setSplitter(() => mod.default ?? mod);
    //         })
    //         .catch((err) => {
    //             console.error("Failed to load react-splitter-layout:", err);
    //         });
    //     return () => { mounted = false; };
    // }, []);
    // 
    // if (!Splitter) return <div className="border-t-4">Loading...</div>;


    const getExerciseCourseDetails = async () => {
        setLoading(true);
        try {
            const result = await axios.post('/api/exercise', {
                courseId,
                chapterId,
                exerciseId: exerciseslug
            })
            setCourseExerciseData(result.data);
        } catch (error) {
            console.log("[GET_EXERCISE_DATA]", error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getExerciseCourseDetails();
    }, [courseId, chapterId, exerciseslug])

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        }
    }, [])


    const getExerciseDetails = () => {
        const exerciseInfo = courseExerciseData?.exercises.find((item) => item.slug === exerciseslug);
        setExerciseInfo(exerciseInfo);
    }

    useEffect(() => {
        courseExerciseData && getExerciseDetails();
    }, [courseExerciseData])
    useEffect(() => {
        courseExerciseData && getPrevNextButtonRoutes();
    }, [courseExerciseData])

    const getPrevNextButtonRoutes = () => {
        //current index of exercise
        const currentExerciseIndex = courseExerciseData?.exercises.findIndex((item) => item.slug == exerciseslug) ?? 0;
        const nextExercise = courseExerciseData?.exercises[currentExerciseIndex + 1]?.slug;
        const prevExercise = courseExerciseData?.exercises[currentExerciseIndex - 1]?.slug;

        setNextButtonRoute(nextExercise ? `/courses/${courseId}/${chapterId}/${nextExercise}` : undefined);
        setPrevButtonRoute(prevExercise ? `/courses/${courseId}/${chapterId}/${prevExercise}` : undefined);
    }
    return (
        <div className='border-t-4'>
            <SplitterLayout
                percentage
                primaryMinSize={40}
                secondaryInitialSize={60}
            >
                <div>
                    <ContentSection
                        courseExerciseData={courseExerciseData}
                        loading={loading}
                    />
                </div>
                <div>
                    <CodeEditor courseExerciseData={courseExerciseData} loading={loading} />
                </div>
            </SplitterLayout>
            <div className='font-game fixed bottom-0 w-full bg-zinc-900 flex p-4 justify-between items-center'>
                <Link href={prevButtonRoute ?? `/courses/${courseId}`}>
                    <Button variant="pixel" className='text-xl'>Previous</Button>
                </Link>
                <div className='flex items-center gap-2'>
                    <Image
                        src="/star.png"
                        alt="xp"
                        width={40}
                        height={40}
                    />
                    <h2 className='text-2xl'>You can earn <span className='text-4xl'>{exerciseInfo?.xp}</span> XP</h2>
                </div>
                <Link href={nextButtonRoute ?? `/courses/${courseId}`}>
                    <Button variant="pixel" className='text-xl'>Next</Button>
                </Link>
            </div>
        </div>
    )
}

export default Playground