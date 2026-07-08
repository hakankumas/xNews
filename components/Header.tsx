"use client";

import { topic } from "@/generated/prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

export default function Header() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["header"],
        queryFn: async () => {
            const res = await axios.get<topic[]>("/api/topic");
            return res.data;
        },
        staleTime: Infinity,
    });

    if (isLoading) return <div>Yükleniyor...</div>;
    if (error) return <div>Hata oluştu!</div>;
    if (!data) return null;

    return (
        <div>
            <div className="w-full bg-red-600 h-15 flex items-center ps-5">
                <Link href={"/"}>sondakikaaciklama.com</Link>
            </div>
            <div className="container mx-auto flex flex-row gap-5 justify-center">
                {data.map((item) => (
                    <Link
                        key={item.id}
                        href={`/${item.slug}`}
                        className="font-bold p-3 cursor-pointer hover:text-gray-500"
                    >
                        <div>{item.name.toLocaleUpperCase("tr")}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
