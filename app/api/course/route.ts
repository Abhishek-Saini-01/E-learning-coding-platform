import { db } from '@/config/db';
import { courseChaptersTable, courseTable } from '@/config/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');

    if (courseId) {
        const result = await db.select().from(courseTable).where(eq(
            courseTable.courseId, courseId
        ));

        const chapterResult = await db.select().from(courseChaptersTable).where(
            eq(courseChaptersTable.courseId, courseId)
        );
        return NextResponse.json({
            ...result[0],
            chapters: chapterResult
        });
    }
    const result = await db.select().from(courseTable);
    return NextResponse.json(result);
}