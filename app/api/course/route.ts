import { db } from '@/config/db';
import { courseChaptersTable, courseTable, userEnrolledCoursesTable } from '@/config/schema';
import { currentUser } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');
    const user = await currentUser();
    if (courseId) {
        const result = await db.select().from(courseTable).where(eq(
            courseTable.courseId, courseId
        ));

        const chapterResult = await db.select().from(courseChaptersTable).where(
            eq(courseChaptersTable.courseId, courseId)
        );

        const enrolledCourse = await db.select().from(userEnrolledCoursesTable).where(
            and(
                eq(userEnrolledCoursesTable.courseId, courseId),
                eq(userEnrolledCoursesTable.userId, user?.primaryEmailAddress?.emailAddress ?? "")
            )
        )
        const isEnrolledCourse = enrolledCourse.length > 0;
        return NextResponse.json({
            ...result[0],
            chapters: chapterResult,
            userEnrolled: isEnrolledCourse,
            courseEnrolledInfo: enrolledCourse[0]
        });
    }
    const result = await db.select().from(courseTable);
    return NextResponse.json(result);
}