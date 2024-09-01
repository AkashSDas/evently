"use client";

import { useFormState } from "react-dom";

import { signup } from "@/actions/auth";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { SubmitButton } from "./submit-button";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const initialState = { message: "" };

export function SignupForm() {
    const [form, action, pending] = useFormState(signup, initialState);

    return (
        <form
            action={action}
            className="flex flex-col w-full max-w-lg gap-4 p-3 mx-auto my-12 border rounded-sm shadow-lg bg-stone-900 border-stone-800"
        >
            <h2 className="text-2xl font-bold">Signup</h2>

            {form.message !== "" ? (
                <Alert variant="destructive">
                    <ExclamationTriangleIcon className="w-4 h-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{form.message}</AlertDescription>
                </Alert>
            ) : null}

            <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    placeholder="example@gmail.com"
                    required
                    type="text"
                    name="email"
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    placeholder="Secret"
                    required
                    minLength={8}
                    type="password"
                    name="password"
                />
            </div>

            <SubmitButton label="Submit" isPending={pending} className="mt-2" />
        </form>
    );
}
