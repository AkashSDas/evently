import type React from "react";

import { Sidebar } from "./sidebar";

export function Shell(props: { children: React.JSX.Element }) {
    return (
        <div className="flex w-dvw h-[calc(100dvh-56px)]">
            <aside className="w-[200px] min-w-[200px] max-w-[200px] h-[calc(100dvh-56px)] border-r border-stone-800">
                <Sidebar />
            </aside>

            <div className="w-[calc(100dvw-200px)]">
                <main className="h-[calc(100dvh-56px)]">{props.children}</main>
            </div>
        </div>
    );
}
