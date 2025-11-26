import { db } from "@/config/db";
import { userCompletedExerciseTable, userEnrolledCoursesTable, usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { courseId, chapterId, exerciseId, xpEarned } = await req.json();
    const user = await currentUser();
    const alreadyCompleted = await db.select().from(userCompletedExerciseTable).where(
        and(
            eq(userCompletedExerciseTable.userId, user?.primaryEmailAddress?.emailAddress ?? ""),
            eq(userCompletedExerciseTable.courseId, courseId),
            eq(userCompletedExerciseTable.chapterId, chapterId),
            eq(userCompletedExerciseTable.exerciseId, exerciseId)
        )
    )
    if (alreadyCompleted.length > 0) {
        return NextResponse.json(alreadyCompleted[0]);
    }
    const result = await db.insert(userCompletedExerciseTable).values({
        courseId: courseId,
        chapterId: chapterId,
        exerciseId: exerciseId,
        userId: user?.primaryEmailAddress?.emailAddress ?? "",
    }).returning();

    //Update Course XP Earned
    await db.update(userEnrolledCoursesTable).set({
        xpEarned: sql`${userEnrolledCoursesTable.xpEarned} + ${xpEarned}`
    }).where(
        and(
            eq(userEnrolledCoursesTable.courseId, courseId),
            eq(userEnrolledCoursesTable.userId, user?.primaryEmailAddress?.emailAddress ?? "")
        )
    )
    //Update User XP Points
    await db.update(usersTable).set({
        points: sql`${usersTable.points} + ${xpEarned}`
    }).where(
        and(
            eq(usersTable.email, user?.primaryEmailAddress?.emailAddress ?? "")
        )
    )
    return NextResponse.json(result[0]);
}