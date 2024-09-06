import { and, asc, eq } from "drizzle-orm";
import { memoize } from "nextjs-better-unstable-cache";

import { db } from "@/db";
import { events } from "@/db/schema";

import { delay } from "./delay";

export const getEventsForDashboard = memoize<any, Promise<any>>(
    async function getEvents(userId: string) {
        await delay();

        const data = await db.query.events.findMany({
            where: eq(events.createdById, userId),
            columns: {
                id: true,
                name: true,
                startOn: true,
                status: true,
            },
            with: {
                rsvps: true,
            },
            limit: 5,
            orderBy: [asc(events.startOn)],
        });

        return data ?? [];
    },
    {
        persist: true,
        revalidateTags: () => ["dashboard:events"],
    }
);

export const getAllEvents = memoize<any, Promise<any>>(
    async function getEvents(userId: string) {
        await delay();
        return await db.query.events.findMany({
            where: eq(events.createdById, userId),
            orderBy: [asc(events.startOn)],
        });
    },
    {
        persist: true,
        revalidateTags: () => ["events"],
    }
);

export const getEvent = memoize<any, Promise<any>>(
    async function getEvent(userId: string, eventId: string) {
        await delay();
        return await db.query.events.findFirst({
            where: and(eq(events.id, eventId), eq(events.createdById, userId)),
        });
    },
    {
        persist: true,
        revalidateTags: (userId, eventId) => ["events", eventId],
    }
);
