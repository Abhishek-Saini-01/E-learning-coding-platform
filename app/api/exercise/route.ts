import { db } from "@/config/db";
import { courseChaptersTable, exerciseTable } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { courseId, chapterId, exerciseId } = await req.json();

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
    return NextResponse.json({
        ...courseResult[0],
        exerciseData: exerciseResult[0]
    });
}