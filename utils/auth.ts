import "server-only";

import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

import { db } from "@/db";
import { users } from "@/db/schema";

export async function getUserFromAccessToken(token: {
    name: string;
    value: string;
}) {
    const payload = jwt.verify(
        token.value,
        process.env.JWT_SECRET_KEY as string
    ) as {
        id: string;
    };

    const user = await db.query.users.findFirst({
        where: eq(users.id, payload.id),
        columns: {
            id: true,
            email: true,
            createdAt: true,
        },
    });

    return user;
}

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

export async function loginUser(payload: { email: string; password: string }) {
    const foundUser = await db.query.users.findFirst({
        where: eq(users.email, payload.email),
    });

    if (!foundUser) throw new Error("Invalid user");

    const isPasswordCorrect = await bcrypt.compare(
        payload.password,
        foundUser.password
    );
    if (!isPasswordCorrect) throw new Error("Invalid user");

    const token = createTokenForUser(foundUser.id);
    const user = { ...foundUser, password: undefined };
    delete user.password;

    return { token, user };
}

export function createTokenForUser(userId: string): string {
    const token = jwt.sign(
        { id: userId },
        process.env.JWT_SECRET_KEY as string
    );
    return token;
}
