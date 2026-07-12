"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Panel from "@/app/panel/page";

interface Props {
    children: React.ReactNode;
}
export default function Provider({ children }: Props) {
    const [queryClient] = useState(() => new QueryClient());
    const pathname = usePathname();

    return (
        <QueryClientProvider client={queryClient}>
            <Toaster />
            {pathname.startsWith("/panel") ? (
                children
            ) : (
                <>
                    <Header />
                    <div className="flex justify-center h-full min-h-screen">
                        <div className="w-full lg:w-5xl">{children}</div>
                    </div>
                    <Footer />
                </>
            )}
        </QueryClientProvider>
    );
}
