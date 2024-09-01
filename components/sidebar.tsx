"use client";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

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
    const activeClass = "bg-stone-950 text-stone-100 hover:bg-stone-950";

    return (
        <div className="relative w-full h-full px-3">
            <div>
                {links.map((link) => {
                    return (
                        <div key={link.route} className="w-full">
                            <div
                                className={cn(
                                    "w-full h-full py-2 px-2 hover:bg-content1 rounded-lg",
                                    isActive(path, link.route)
                                        ? activeClass
                                        : ""
                                )}
                            >
                                {link.name}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
