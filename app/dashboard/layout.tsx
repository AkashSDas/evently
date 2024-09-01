"use client";

import { type ReactNode } from "react";

import { usePathname } from "next/navigation";

import { Shell } from "@/components/shell";

export default function DashboardLayout(props: {
    children: ReactNode;
    rsvps: ReactNode;
    events: ReactNode;
}) {
    const path = usePathname();

    return (
        <Shell>
            {path === "/dashboard" ? (
                <div className="flex w-full h-full">
                    <div className="w-1/2 border-r border-stone-800">
                        {props.rsvps}
                    </div>

                    <div className="w-1/2 flex flex-col">
                        <div className="border-b border-stone-800 w-full h-1/2">
                            {props.events}
                        </div>

                        <div className="w-full h-1/2">{props.children}</div>
                    </div>
                </div>
            ) : (
                <div>{props.children}</div>
            )}
        </Shell>
    );
}
