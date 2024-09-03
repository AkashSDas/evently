import { asc, eq } from "drizzle-orm";
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
        revalidateTags: () => ["dashboard:events"],
        persist: true,
    }
);
