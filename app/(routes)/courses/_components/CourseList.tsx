"use client"

import axios from "axios";
import { ChartNoAxesColumnIncreasingIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type CourseType = {
    id: number;
    courseId: string;
    title: string;
    desc: string;
    bannerImage: string;
    level: string;
    tags: string;
}
const CourseList = () => {
    const [courseList, setCourseList] = useState<CourseType[]>([]);
    const [loading, setLoading] = useState(false);

    const GetAllCourses = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/course');
            console.log(res.data);
            setCourseList(res.data);
        } catch (error) {
            console.log("[COURSES_GET_ERROR]", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        GetAllCourses();
    }, [])
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
            {courseList.map((course) => (
                <div key={course.id} className="border-4 rounded-xl hover:bg-zinc-900 cursor-pointer">
                    <Image
                        src={course.bannerImage}
                        alt={course.title}
                        width={400}
                        height={400}
                        className="w-full h-[200px] object-cover rounded-t-lg"
                    />

                    <div className="p-4">
                        <h2 className="font-game text-2xl">{course.title}</h2>
                        <p className="font-game text-xl text-gray-400 line-clamp-2">{course.desc}</p>
                        <h2 className="bg-zinc-800 gap-2 font-game p-1 mt-3 px-4 rounded-2xl items-center inline-flex">
                            <ChartNoAxesColumnIncreasingIcon className="h-4 w-4" /> {course.level}
                        </h2>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CourseList