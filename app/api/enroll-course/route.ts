import { and, eq } from 'drizzle-orm';
import { db } from "@/config/db";
import { userEnrolledCoursesTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { courseId } = await req.json();
    const user = await currentUser();

    const alreadyEnrolled = await db.select().from(userEnrolledCoursesTable).where(
        and(
            eq(userEnrolledCoursesTable.userId, user?.primaryEmailAddress?.emailAddress ?? ""),
            eq(userEnrolledCoursesTable.courseId, courseId)
        )
    );

    if (alreadyEnrolled.length > 0) {
        return NextResponse.json(alreadyEnrolled);
    }

    const result = await db.insert(userEnrolledCoursesTable).values({
        courseId: courseId,
        userId: user?.primaryEmailAddress?.emailAddress ?? "",
        xpEarned: 0
    }).returning();

    return NextResponse.json(result);

}