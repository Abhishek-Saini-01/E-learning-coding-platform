import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    points: integer().default(0),
    subscription: varchar()
});

export const courseTable = pgTable("courses", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    courseId: varchar().notNull().unique(),
    title: varchar({ length: 255 }).notNull(),
    desc: varchar().notNull(),
    bannerImage: varchar().notNull(),
    level: varchar().default("Beginner"),
    tags: varchar()
});

