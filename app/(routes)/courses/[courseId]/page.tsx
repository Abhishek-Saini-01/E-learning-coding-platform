"use client"
import { useParams } from "next/navigation"
import CourseDetailsBanner from "./_components/CourseDetailsBanner";
import axios from "axios";
import { useEffect, useState } from "react";
import CourseChapters from "./_components/CourseChapters";
import CourseStatus from "./_components/CourseStatus";
import UpgradeToPro from "../../dashboard/_components/UpgradeToPro";
import CommunityHelp from "./_components/CommunityHelp";
import { useAuth } from "@clerk/nextjs";

export type ChapterExerciseType = {
    name: string;
    slug: string;
    xp: number;
    difficulty: string;
}
export type CourseChapterType = {
    id: number;
    chapterId: number;
    courseId: number;
    name: string
    desc: string;
    exercises: ChapterExerciseType[];
}
export type CourseEnrolledInfoType = {
    enrolledDate: any;
    xpEarned: number
}
export type CompletedExercisesType = {
    courseId: number;
    chapterId: number;
    exerciseId: number;
}
export type CourseDetailsType = {
    id: number;
    courseId: number;
    title: string;
    desc: string;
    bannerImage: string;
    level: string;
    tags: string;
    chapters?: CourseChapterType[];
    userEnrolled?: boolean;
    courseEnrolledInfo: CourseEnrolledInfoType;
    completedExercises?: CompletedExercisesType[]
}

const CourseDetails = () => {
    const { has } = useAuth();
    const hasUnlimitedAccess = has && has({ plan: "unlimited" })
    const { courseId } = useParams();
    const [courseDetails, setCourseDetails] = useState<CourseDetailsType>();
    const [loading, setLoading] = useState(false);

    const getCourseDetails = async () => {
        try {
            setLoading(true);
            const result = await axios.get('/api/course?courseId=' + courseId);
            console.log(result.data);
            setCourseDetails(result.data);
        } catch (error) {
            console.log("[GET_COURSE_ERROR]", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCourseDetails();
    }, [courseId])
    return (
        <div>
            <CourseDetailsBanner
                loading={loading}
                courseDetails={courseDetails}
                refreshData={() => getCourseDetails()}
            />
            <div className="grid grid-cols-3 p-10 md:px-24 lg:px-36 gap-7">
                <div className="col-span-2">
                    <CourseChapters
                        loading={loading}
                        courseDetails={courseDetails}
                    />
                </div>
                <div>
                    <CourseStatus courseDetails={courseDetails} />
                    {!hasUnlimitedAccess && (<UpgradeToPro />)}
                    <CommunityHelp />
                </div>
            </div>
        </div>
    )
}

export default CourseDetails