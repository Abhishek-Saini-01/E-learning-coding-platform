"use client";

import axios from 'axios';
import { useParams } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import { ChapterExerciseType } from '../../page';
import { type } from 'os';
import ContentSection from './_components/ContentSection';

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
}
const Playground = () => {
    const { courseId, chapterId, exerciseslug } = useParams();
    const [loading, setLoading] = useState(false);
    const [courseExerciseData, setCourseExerciseData] = useState<CourseExerciseDataType>()
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


    const getExerciseDetails = async () => {
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
        getExerciseDetails();
    }, [courseId, chapterId, exerciseslug])

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
                <div>Code Editor</div>
            </SplitterLayout>
        </div>
    )
}

export default Playground