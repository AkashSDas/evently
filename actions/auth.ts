"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { signupUser } from "@/utils/auth";

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export async function signup(prevState: any, data: FormData) {
    const parsed = signupSchema.parse(Object.fromEntries(data));

    try {
        const { token, user } = await signupUser(parsed);
        cookies().set(process.env.JWT_SECRET_KEY_COOKIE_KEY as string, token);
    } catch (e) {
        console.error(e);
        return { message: "Failed to signup user" };
    }

    redirect("/dashboard");
}
