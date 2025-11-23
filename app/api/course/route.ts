import { db } from '@/config/db';
import { courseTable } from '@/config/schema';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const result = await db.select().from(courseTable);
    return NextResponse.json(result);
}