import { db } from '@/config/db';
import { courseChaptersTable, courseTable, userCompletedExerciseTable, userEnrolledCoursesTable } from '@/config/schema';
import { currentUser } from '@clerk/nextjs/server';
import { and, asc, desc, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');
    const user = await currentUser();
    if (courseId) {
        const result = await db.select().from(courseTable).where(eq(
            courseTable.courseId, Number(courseId)
        ));

        const chapterResult = await db.select().from(courseChaptersTable).where(
            eq(courseChaptersTable.courseId, Number(courseId))
        ).orderBy(asc(courseChaptersTable.chapterId));

        const enrolledCourse = await db.select().from(userEnrolledCoursesTable).where(
            and(
                eq(userEnrolledCoursesTable.courseId, Number(courseId)),
                eq(userEnrolledCoursesTable.userId, user?.primaryEmailAddress?.emailAddress ?? "")
            )
        )
        const isEnrolledCourse = enrolledCourse.length > 0;

        const completedExercises = await db.select().from(userCompletedExerciseTable).where(
            and(
                eq(userCompletedExerciseTable.courseId, Number(courseId)),
                eq(userCompletedExerciseTable.userId, user?.primaryEmailAddress?.emailAddress ?? "")
            )
        ).orderBy(
            desc(userCompletedExerciseTable.courseId),
            desc(userCompletedExerciseTable.exerciseId)
        )

        return NextResponse.json({
            ...result[0],
            chapters: chapterResult,
            userEnrolled: isEnrolledCourse,
            courseEnrolledInfo: enrolledCourse[0],
            completedExercises: completedExercises
        });
    }
    const result = await db.select().from(courseTable);
    return NextResponse.json(result);
}