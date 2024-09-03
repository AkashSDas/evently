import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { getRsvpsForDashboard } from "@/utils/rsvps";
import { getCurrentUser } from "@/utils/users";

export default async function RsvpsPage() {
    const user = await getCurrentUser();
    const data = await getRsvpsForDashboard(user.id);

    return (
        <section className="p-2">
            <h2 className="font-bold text-xl">RSVPs</h2>

            <div className="flex flex-col gap-2">
                {data.map(function ({ attendees, events, rsvps }: any) {
                    return (
                        <div
                            key={rsvps?.id}
                            className="flex items-center gap-2 p-2 border border-stone-800 rounded"
                        >
                            <span>{attendees.name}</span>
                            <Badge variant="secondary">{rsvps?.status}</Badge>
                            <span>
                                <Link href={`/dashboard/events/${events?.id}`}>
                                    <Badge variant="secondary">
                                        {events?.name}
                                    </Badge>
                                </Link>
                            </span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
