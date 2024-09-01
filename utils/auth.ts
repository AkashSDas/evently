import "server-only";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { db } from "@/db";
import { users } from "@/db/schema";

export async function signupUser(payload: { email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const rows = await db
        .insert(users)
        .values({ email: payload.email, password: hashedPassword })
        .returning({
            id: users.id,
            email: users.email,
            createdAt: users.createdAt,
        });

    const user = rows[0];
    const token = createTokenForUser(user.id);

    return { token, user };
}

export function createTokenForUser(userId: string): string {
    const token = jwt.sign(
        { id: userId },
        process.env.JWT_SECRET_KEY as string
    );
    return token;
}
