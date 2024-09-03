import "server-only";

import { cache } from "react";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getUserFromAccessToken } from "./auth";

/** This should in a request since it'll need access to cookies. */
export const getCurrentUser = cache(async function getCurrentUser() {
    console.log("🛜 Getting current user");

    const token = cookies().get(
        process.env.JWT_SECRET_KEY_COOKIE_KEY as string
    );
    if (!token) redirect("/login");

    const user = await getUserFromAccessToken(token);
    if (!user) redirect("/login");

    return user;
});
