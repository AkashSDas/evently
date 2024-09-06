"use client";

import { useTransition } from "react";
import { Button } from "./ui/button";
import { createNewEvent } from "@/actions/events";

export function CreateEventButton() {
    const [isPending, startTransition] = useTransition();

    return (
        <Button
            variant="outline"
            onClick={() => {
                startTransition(() => createNewEvent());
            }}
        >
            {isPending ? "Creating..." : "Create Event"}
        </Button>
    );
}
