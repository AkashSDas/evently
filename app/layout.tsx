import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";

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
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Navbar />
                    {props.children}
                </ThemeProvider>
            </body>
        </html>
    );
}
