import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";

import { login, signup } from "@/actions/auth";
import { loginUser, signupUser } from "@/utils/auth";

vi.mock("server-only", () => {
    return {};
});
vi.mock("next/navigation", () => ({
    redirect: vi.fn(),
}));
vi.mock("next/headers", () => ({
    cookies: vi.fn(),
}));
vi.mock("@/utils/auth");

describe("auth actions", () => {
    const mockCookies = {
        set: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
        (cookies as any).mockReturnValue(mockCookies);
    });

    describe("signup action", () => {
        it("should signup the user, set the cookie, and redirect", async () => {
            const mockFormData = new FormData();
            mockFormData.append("email", "test@example.com");
            mockFormData.append("password", "password123");

            const mockToken = "mockToken";
            const mockUser = { id: 1, email: "test@example.com" };

            (signupUser as Mock).mockResolvedValue({
                token: mockToken,
                user: mockUser,
            });

            const result = await signup({}, mockFormData);

            expect(signupUser).toHaveBeenCalledWith({
                email: "test@example.com",
                password: "password123",
            });
            expect(mockCookies.set).toHaveBeenCalledWith(
                process.env.JWT_SECRET_KEY_COOKIE_KEY,
                mockToken
            );
            expect(redirect).toHaveBeenCalledWith("/dashboard");
            expect(result).toBeUndefined();
        });

        it("should handle signup errors", async () => {
            const mockFormData = new FormData();
            mockFormData.append("email", "test@example.com");
            mockFormData.append("password", "password123");

            (signupUser as Mock).mockRejectedValue(new Error("Signup failed"));

            const result = await signup({}, mockFormData);

            expect(signupUser).toHaveBeenCalled();
            expect(mockCookies.set).not.toHaveBeenCalled();
            expect(redirect).not.toHaveBeenCalled();
            expect(result).toEqual({ message: "Failed to signup user" });
        });
    });

    describe("login action", () => {
        it("should login the user, set the cookie, and redirect", async () => {
            const mockFormData = new FormData();
            mockFormData.append("email", "test@example.com");
            mockFormData.append("password", "password123");

            const mockToken = "mockToken";

            (loginUser as Mock).mockResolvedValue({ token: mockToken });

            const result = await login({}, mockFormData);

            expect(loginUser).toHaveBeenCalledWith({
                email: "test@example.com",
                password: "password123",
            });
            expect(mockCookies.set).toHaveBeenCalledWith(
                process.env.JWT_SECRET_KEY_COOKIE_KEY,
                mockToken
            );
            expect(redirect).toHaveBeenCalledWith("/dashboard");
            expect(result).toBeUndefined();
        });

        it("should handle login errors", async () => {
            const mockFormData = new FormData();
            mockFormData.append("email", "test@example.com");
            mockFormData.append("password", "password123");

            (loginUser as Mock).mockRejectedValue(new Error("Login failed"));

            const result = await login({}, mockFormData);

            expect(loginUser).toHaveBeenCalled();
            expect(mockCookies.set).not.toHaveBeenCalled();
            expect(redirect).not.toHaveBeenCalled();
            expect(result).toEqual({ message: "Failed to login user" });
        });
    });
});
