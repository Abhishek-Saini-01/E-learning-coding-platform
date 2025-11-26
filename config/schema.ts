import { time } from "console";
import { integer, json, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    points: integer().default(0),
    subscription: varchar()
});

export const courseTable = pgTable("courses", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    courseId: integer().notNull().unique(),
    title: varchar({ length: 255 }).notNull(),
    desc: varchar().notNull(),
    bannerImage: varchar().notNull(),
    level: varchar().default("Beginner"),
    tags: varchar(),
    editorType: varchar()
});

export const courseChaptersTable = pgTable("courseChapters", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    chapterId: integer(),
    courseId: integer().notNull(),
    name: varchar().notNull(),
    desc: varchar(),
    exercises: json(),
});

export const userEnrolledCoursesTable = pgTable("userEnrolledCourses", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: varchar().notNull(),
    courseId: integer().notNull(),
    enrolledDate: timestamp().defaultNow(),
    xpEarned: integer().default(0),
})

export const userCompletedExerciseTable = pgTable("userCompletedExercise", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: varchar().notNull(),
    courseId: integer().notNull(),
    chapterId: integer().notNull(),
    exerciseId: integer().notNull(),
})

export const exerciseTable = pgTable("exercises", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    courseId: integer(),
    chapterId: integer(),
    exerciseId: varchar(),
    exerciseContent: json(),
    exerciseName: varchar(),
})