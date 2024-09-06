import { getEvent } from "@/utils/events";
import { getCurrentUser } from "@/utils/users";

export default async function Event({ params }: { params: { id: string } }) {
    const user = await getCurrentUser();
    const event = await getEvent(user.id, params.id);

    return (
        <section className="p-2">
            <h2 className="font-bold text-xl">{event.name}</h2>
        </section>
    );
}
