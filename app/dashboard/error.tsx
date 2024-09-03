"use client";

import { Button } from "@/components/ui/button";

export default function DashboardError(props: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="w-full h-full flex justify-center items-center italic">
            <div className="text-red-500">Something went wrong</div>
            <Button onClick={() => props.reset()}>Try again</Button>
        </div>
    );
}
