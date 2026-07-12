import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Provider from "@/components/Provider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "sondakikaaciklama.com.tr",
    description: "Son Dakika Açıklamalar Burada!",
};

interface RootLayoutProps {
    children: React.ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html
            lang="tr"
            className={`${geistSans.variable} ${geistMono.variable}`}
        >
            <body className="flex flex-col">
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
