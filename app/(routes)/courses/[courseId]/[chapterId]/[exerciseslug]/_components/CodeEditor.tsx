import React from 'react'
import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackPreview,
    useSandpack,
} from "@codesandbox/sandpack-react";
import SplitterLayout from 'react-splitter-layout';
import { CourseExerciseDataType } from '../page';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';

type CodeEditorProps = {
    courseExerciseData: CourseExerciseDataType | undefined;
    loading: boolean
}

const CodeEditorChildren = ({ onCompleteExercise, isCompleted }: any) => {
    const { sandpack } = useSandpack();
    return (
        <div className='font-game absolute bottom-40 flex gap-5 right-5'>
            <Button onClick={() => sandpack.runSandpack()} variant="pixel" size="lg" className='text-xl'>
                Run Code
            </Button>
            <Button disabled={isCompleted} onClick={() => onCompleteExercise()} variant="pixel" size="lg" className='bg-[#a3e534] text-xl'>
                {isCompleted ? "Already Completed" : "Mark Completed"}
            </Button>
        </div>
    )
}

const CodeEditor = ({
    courseExerciseData,
    loading
}: CodeEditorProps) => {
    const { exerciseslug } = useParams();
    const exerciseIndex = courseExerciseData?.exercises.findIndex((item) => item.slug == exerciseslug);

    const isCompleted = courseExerciseData?.completedExercise.find((item) => item.exerciseId == Number(exerciseIndex) + 1);

    const onCompleteExercise = async () => {
        if (exerciseIndex === undefined) return;
        try {
            const result = await axios.post('/api/exercise/complete', {
                courseId: courseExerciseData?.courseId,
                chapterId: courseExerciseData?.chapterId,
                exerciseId: exerciseIndex + 1,
                xpEarned: courseExerciseData?.exercises[exerciseIndex].xp
            })
            toast.success("Exercise Marked Completed!");
        } catch (error) {
            console.log("[COMPLETE_CHATER]", error);
        }
    }
    return (
        <div>
            <SandpackProvider
                template="static"
                theme={"auto"}
                style={{ height: '100vh' }}
                files={courseExerciseData?.exerciseData?.exerciseContent.starterCode}
                options={{
                    autorun: false,
                    autoReload: false
                }}
            >
                <SandpackLayout style={{ height: '100%' }}>
                    <SplitterLayout
                        percentage
                        primaryMinSize={30}
                        secondaryMinSize={30}
                        secondaryInitialSize={50}
                    >
                        <div className='relative h-full'>
                            <SandpackCodeEditor showTabs showRunButton={false} style={{ height: '100%' }} />
                            <CodeEditorChildren isCompleted={isCompleted} onCompleteExercise={onCompleteExercise} />
                        </div>

                        <SandpackPreview
                            showNavigator
                            showOpenInCodeSandbox={false}
                            showOpenNewtab
                            style={{ height: '100%' }} />
                    </SplitterLayout>
                </SandpackLayout>
            </SandpackProvider>
        </div>
    )
}

export default CodeEditor