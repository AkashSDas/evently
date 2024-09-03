import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { getEventsForDashboard } from "@/utils/events";
import { getCurrentUser } from "@/utils/users";

export default async function EventsPage() {
    const user = await getCurrentUser();
    const events = await getEventsForDashboard(user.id);

    return (
        <section className="p-2">
            <h2 className="font-bold text-xl mb-3">Latest Events</h2>

            <div className="flex flex-col gap-2">
                {events.map((event: any) => {
                    return (
                        <div
                            key={event.id}
                            className="flex items-center gap-2 px-2 py-2 border border-stone-800 rounded-sm"
                        >
                            <Link href={`/dashboard/events/${event.id}`}>
                                <span className="font-semibold">
                                    {event.name}
                                </span>
                            </Link>

                            <Badge variant="outline">{event.status}</Badge>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
