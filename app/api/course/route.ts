import { db } from '@/config/db';
import { courseChaptersTable, courseTable, userCompletedExerciseTable, userEnrolledCoursesTable } from '@/config/schema';
import { currentUser } from '@clerk/nextjs/server';
import { and, asc, desc, eq, inArray } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');
    const user = await currentUser();

    const userEmail = user?.primaryEmailAddress?.emailAddress ?? "";

    if (courseId && courseId !== "enrolled") {
        const result = await db.select().from(courseTable).where(eq(
            courseTable.courseId, Number(courseId)
        ));

        const chapterResult = await db.select().from(courseChaptersTable).where(
            eq(courseChaptersTable.courseId, Number(courseId))
        ).orderBy(asc(courseChaptersTable.chapterId));

        const enrolledCourse = await db.select().from(userEnrolledCoursesTable).where(
            and(
                eq(userEnrolledCoursesTable.courseId, Number(courseId)),
                eq(userEnrolledCoursesTable.userId, userEmail)
            )
        );
        const isEnrolledCourse = enrolledCourse.length > 0;

        const completedExercises = await db.select().from(userCompletedExerciseTable).where(
            and(
                eq(userCompletedExerciseTable.courseId, Number(courseId)),
                eq(userCompletedExerciseTable.userId, userEmail)
            )
        ).orderBy(
            desc(userCompletedExerciseTable.courseId),
            desc(userCompletedExerciseTable.exerciseId)
        );

        return NextResponse.json({
            ...result[0],
            chapters: chapterResult,
            userEnrolled: isEnrolledCourse,
            courseEnrolledInfo: enrolledCourse[0],
            completedExercises: completedExercises
        });
    } else if (courseId === "enrolled") {

        // 1️⃣ Fetch all enrolled courses for the user
        const enrolledCourses = await db
            .select()
            .from(userEnrolledCoursesTable)
            .where(eq(userEnrolledCoursesTable.userId, userEmail));

        if (enrolledCourses.length === 0) {
            return NextResponse.json([]);
        }

        // Extract courseIds and guard empty
        const courseIds = enrolledCourses.map(c => c.courseId).filter(Boolean);
        if (courseIds.length === 0) return NextResponse.json([]);

        // 2️⃣ Fetch all course details in one go
        const courses = await db
            .select()
            .from(courseTable)
            .where(inArray(courseTable.courseId, courseIds));

        // 3️⃣ Fetch chapters for all courses
        const chapters = await db
            .select()
            .from(courseChaptersTable)
            .where(inArray(courseChaptersTable.courseId, courseIds))
            .orderBy(asc(courseChaptersTable.chapterId));

        // 4️⃣ Fetch completed exercises for all courses
        const completed = await db
            .select()
            .from(userCompletedExerciseTable)
            .where(and(inArray(userCompletedExerciseTable.courseId, courseIds), eq(userCompletedExerciseTable.userId, userEmail)))
            .orderBy(
                desc(userCompletedExerciseTable.courseId),
                desc(userCompletedExerciseTable.exerciseId)
            );

        const finalResult = courses.map(course => {
            const courseEnrollInfo = enrolledCourses.find(e => e.courseId === course.courseId);

            return {
                ...course,
                chapters: chapters.filter(ch => ch.courseId === course.courseId),
                completedExercises: completed.filter(cx => cx.courseId === course.courseId),
                courseEnrolledInfo: courseEnrollInfo,
                userEnrolled: true
            };
        });

        // ⭐ Format output
        const formattedResult = finalResult.map(item => {
            const totalExercises = item.chapters.reduce((acc, chapter) => {
                const exercisesCount = Array.isArray((chapter as any).exercises) ? (chapter as any).exercises.length : 0;
                return acc + exercisesCount;
            }, 0);

            const completedExercises = item.completedExercises.length;

            return {
                courseId: item.courseId,
                title: item.title,
                bannerImage: item?.bannerImage,
                totalExercises,
                completedExercises,
                xpEarned: item.courseEnrolledInfo?.xpEarned || 0,
                level: item.level
            };
        });

        return NextResponse.json(formattedResult);


    }
    else {
        const result = await db.select().from(courseTable);
        return NextResponse.json(result);
    }
}