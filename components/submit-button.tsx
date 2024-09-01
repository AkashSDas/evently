"use client";

import { ComponentProps } from "react";

import { Button } from "./ui/button";

type Props = {
    label: string;
    isPending?: boolean;
} & ComponentProps<typeof Button>;

export function SubmitButton({ label, isPending, ...btnProps }: Props) {
    return (
        <Button {...btnProps} aria-disabled={isPending} type="submit">
            {label}
        </Button>
    );
}
