import Link from "next/link";

import { Button } from "./ui/button";
import { CreateEventButton } from "./create-event-button";

export function Navbar() {
    return (
        <nav className="flex items-center justify-between gap-4 px-8 border-b border-b-stone-800 h-14">
            <span className="font-bold">Evently.</span>

            <div className="flex items-center gap-4">
                <CreateEventButton />

                <Link href="/login">
                    <Button variant="outline">Login</Button>
                </Link>

                <Link href="/signup">
                    <Button>Signup</Button>
                </Link>
            </div>
        </nav>
    );
}
