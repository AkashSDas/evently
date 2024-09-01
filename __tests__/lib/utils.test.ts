import { describe, expect, it } from "vitest";

import { cn } from "@/lib/utils";

describe("cn function", () => {
    it("should combine multiple class names into a single string", () => {
        const result = cn("p-2", "text-lg", "bg-white");
        expect(result).toBe("p-2 text-lg bg-white");
    });

    it.each([
        { isActive: true, expected: "p-2 text-lg" },
        { isActive: false, expected: "p-2 text-sm" },
    ])(
        "should handle conditional class names with isActive = $isActive",
        ({ isActive, expected }) => {
            const result = cn("p-2", {
                "text-lg": isActive,
                "text-sm": !isActive,
            });
            expect(result).toBe(expected);
        }
    );

    it("should ignore falsy values", () => {
        const result = cn("p-2", null, undefined, false, "text-lg", 0, "");
        expect(result).toBe("p-2 text-lg");
    });

    it("should merge class names from arrays", () => {
        const result = cn(
            ["p-2", "text-lg"],
            ["bg-white", "hover:bg-gray-200"]
        );
        expect(result).toBe("p-2 text-lg bg-white hover:bg-gray-200");
    });

    it("should handle object-based class names", () => {
        const result = cn({
            "p-2": true,
            "text-lg": true,
            "bg-white": false,
            "hover:bg-gray-200": true,
        });
        expect(result).toBe("p-2 text-lg hover:bg-gray-200");
    });

    it("should merge Tailwind-specific conflicting classes", () => {
        const result = cn("p-2", "p-4", "text-lg", "text-sm");
        expect(result).toBe("p-4 text-sm");
    });

    it("should handle a mix of string, array, and object inputs", () => {
        const isActive = true;
        const result = cn(
            "p-2",
            ["text-lg", "bg-white"],
            { "hover:bg-gray-200": isActive, "hover:bg-gray-100": !isActive },
            "rounded-md"
        );
        expect(result).toBe(
            "p-2 text-lg bg-white hover:bg-gray-200 rounded-md"
        );
    });

    it("should return an empty string if no valid class names are provided", () => {
        const result = cn(null, undefined, false, 0, "", []);
        expect(result).toBe("");
    });
});
