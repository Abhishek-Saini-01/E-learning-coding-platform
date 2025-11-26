import React from 'react'
import CourseList from '../../courses/_components/CourseList'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const ExploreMoreCourse = () => {
    return (
        <div>
            <div className='mt-7 flex items-center justify-between'>
                <h2 className='text-4xl mb-2 font-game'>Explore Other Courses</h2>
                <Link href="/courses">
                    <Button className='font-game text-lg' variant="pixel">View All</Button>
                </Link>
            </div>
            <CourseList smallerCard={true} maxLimit={5} />

        </div>
    )
}

export default ExploreMoreCourse