import "server-only";

import { eq, sql } from "drizzle-orm";
import { memoize } from "nextjs-better-unstable-cache";

import { db } from "@/db";
import { attendees, events, rsvps } from "@/db/schema";

import { delay } from "./delay";

export const getAttendeesCountForDashboard = memoize<any, Promise<number>>(
    async function getCount(userId: string): Promise<number> {
        await delay();

        const counts = await db
            .select({
                totalAttendees: sql`count(distinct ${attendees.id})`,
            })
            .from(events)
            .leftJoin(rsvps, eq(rsvps.eventId, events.id))
            .leftJoin(attendees, eq(attendees.id, rsvps.attendeeId))
            .where(eq(events.createdById, userId))
            .groupBy(events.id)
            .execute();

        const total = counts.reduce((acc, count) => {
            if (typeof count.totalAttendees === "number") {
                return acc + count.totalAttendees;
            } else {
                return acc;
            }
        }, 0);

        return total;
    },
    {
        persist: true,
        revalidateTags: () => ["dashboard:attendees"],
        suppressWarnings: true,
        log: ["datacache", "verbose", "dedupe"],
        logid: "dashboard:attendees",
    }
);
