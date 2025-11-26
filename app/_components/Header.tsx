"use client"

import { Button } from '@/components/ui/button'
import Image from 'next/image'

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CourseType } from '../(routes)/courses/_components/CourseList';




const courses = [
    {
        id: 1,
        name: 'HTML',
        desc: 'Learn the fundamentals of HTML and build the structure of modern web pages.',
        path: '/course/1/detail'
    },
    {
        id: 2,
        name: 'CSS',
        desc: 'Master CSS to style and design responsive, visually appealing web layouts.',
        path: '/course/2/detail'
    },
    {
        id: 3,
        name: 'React',
        desc: 'Build dynamic and interactive web applications using the React JavaScript library.',
        path: '/course/3/detail'
    },
    {
        id: 4,
        name: 'React Advanced',
        desc: 'Deep dive into advanced React concepts including hooks, state management, performance optimization, and architectural patterns.',
        path: '/course/4/detail'
    },
    {
        id: 5,
        name: 'Python',
        desc: 'Learn Python programming from basics to intermediate level, covering logic building, functions, and real-world applications.',
        path: '/course/5/detail'
    },
    {
        id: 6,
        name: 'Python Advanced',
        desc: 'Master advanced Python concepts such as OOP, modules, APIs, data processing, and automation.',
        path: '/course/6/detail'
    },
    {
        id: 7,
        name: 'Generative AI',
        desc: 'Explore prompt engineering, LLMs, embeddings, image generation, and build GenAI-powered applications.',
        path: '/course/7/detail'
    },
    {
        id: 8,
        name: 'Machine Learning',
        desc: 'Understand ML concepts, algorithms, data preprocessing, model training, evaluation, and deployment.',
        path: '/course/8/detail'
    },
    {
        id: 9,
        name: 'JavaScript',
        desc: 'Learn core JavaScript concepts, asynchronous programming, DOM manipulation, and modern ES6+ features.',
        path: '/course/9/detail'
    }
];



const Header = () => {
    const { user } = useUser()
    const path = usePathname();
    const { exerciseslug } = useParams();
    const [courseList, setCourseList] = useState<CourseType[]>([]);
    const [loading, setLoading] = useState(false);

    const getAllCourses = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/course');
            setCourseList(res.data);
        } catch (error) {
            console.log("[COURSES_GET_ERROR]", error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getAllCourses();
    }, [])
    return (
        <div className='p-4 max-w-7xl flex justify-between items-center w-full'>
            <div className='flex gap-2 items-center'>
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={40}
                    height={40}
                />
                <h2 className='font-bold text-4xl font-game'>CodeBox</h2>
            </div>
            {!exerciseslug ? (
                <NavigationMenu>
                    <NavigationMenuList className='gap-8'>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className='grid md:grid-cols-2 gap-2 sm:w-[400px] md:w-[500px] lg:w-[600px]'>
                                    {courseList.map((course, index) => (
                                        <Link href={`/courses/${course.courseId}`} key={index}>
                                            <div className="p-2 hover:bg-accent rounded-md cursor-pointer">
                                                <h2>{course.title}</h2>
                                                <p className='text-sm text-gray-500 font-medium'>{course.desc}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink href='/projects'>
                                Projects
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/pricing">
                                Pricing
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/contact-us">
                                Contact Us
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            ) : (
                <h2 className='font-game text-2xl'>{exerciseslug?.toString().replaceAll("-", " ").toLocaleUpperCase()}</h2>
            )}
            {!user ? (
                <Link href="/sign-in">
                    <Button variant="pixel" className='font-game text-2xl'>
                        Signup
                    </Button>
                </Link>
            ) : (
                <div className='flex gap-4 items-center'>
                    <Link href="/dashboard">
                        <Button variant="pixel" className='font-game text-2xl'>
                            Dashboard
                        </Button>
                    </Link>
                    <UserButton />
                </div>
            )}
        </div>
    )
}

export default Header