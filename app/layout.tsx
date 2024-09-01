import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Evently",
    description: "Organize and share your events with friends and colleagues.",
};

export default function RootLayout(
    props: Readonly<{
        children: React.ReactNode;
    }>
) {
    return (
        <html lang="en">
            <body className={inter.className}>{props.children}</body>
        </html>
    );
}
