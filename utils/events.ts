import { asc, eq } from "drizzle-orm";

import { db } from "@/db";
import { events } from "@/db/schema";

import { delay } from "./delay";

export async function getEventsForDashboard(userId: string) {
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
}
