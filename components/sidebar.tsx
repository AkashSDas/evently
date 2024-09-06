"use client";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import Link from "next/link";

const links = [
    { route: "/dashboard", name: "Home" },
    { route: "/dashboard/events", name: "Events" },
    { route: "/dashboard/guests", name: "Guests" },
    { route: "/dashboard/activity", name: "Activity" },
    { route: "/dashboard/settings", name: "Settings" },
];

function isActive(path: string, route: string): boolean {
    if (route === "/dashboard") {
        return path === "/dashboard";
    } else {
        return path.includes(route);
    }
}

export function Sidebar() {
    const path = usePathname();
    const activeClass = "bg-stone-700 text-stone-100 hover:bg-stone-700";

    return (
        <div className="relative w-full h-full px-3 py-4">
            <div>
                {links.map((link) => {
                    return (
                        <Link
                            key={link.route}
                            href={link.route}
                            className="w-full"
                        >
                            <div
                                className={cn(
                                    "w-full h-full py-2 px-2 hover:bg-stone-800 active:bg-stone-700 rounded-lg cursor-pointer ",
                                    isActive(path, link.route)
                                        ? activeClass
                                        : ""
                                )}
                            >
                                {link.name}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
