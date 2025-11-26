import { db } from "@/config/db";
import { courseChaptersTable, courseTable, exerciseTable, userCompletedExerciseTable } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { courseId, chapterId, exerciseId } = await req.json();

    const courseInfo = await db.select().from(courseTable).where(
        eq(courseTable.courseId, courseId)
    );

    const courseResult = await db.select().from(courseChaptersTable).where(
        and(
            eq(courseChaptersTable.courseId, courseId),
            eq(courseChaptersTable.chapterId, chapterId)
        )
    )

    const exerciseResult = await db.select().from(exerciseTable).where(
        and(
            eq(exerciseTable.courseId, courseId),
            eq(exerciseTable.exerciseId, exerciseId),
        )
    )

    const completedExercise = await db.select().from(userCompletedExerciseTable).where(
        and(
            eq(userCompletedExerciseTable.courseId, courseId),
            eq(userCompletedExerciseTable.chapterId, chapterId)
        )
    )
    return NextResponse.json({
        ...courseResult[0],
        exerciseData: exerciseResult[0],
        completedExercise: completedExercise,
        editorType: courseInfo[0].editorType
    });
}