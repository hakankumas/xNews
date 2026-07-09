"use client";
import { Author } from "@/generated/prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

export default function Yazarlar() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["yazarlar"],
        queryFn: async () => {
            const res = await axios.get<Author[]>("/api/author/info");
            return res.data;
        },
        staleTime: Infinity,
    });

    if (isLoading) return <div>Yükleniyor...</div>;
    if (error) return <div>Hata oluştu!</div>;
    if (!data) return null;

    return (
        <div className="max-w-5xl mx-auto p-3 lg:px-0">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {data
                    .filter((item) => item.id !== 1)
                    .map((item) => (
                        <Link
                            key={item.id}
                            href={`/yazarlar/${item.slug}`}
                            className="flex flex-col gap-2 cursor-pointer"
                        >
                            <img
                                src={`/yazarlar/${item.img}`}
                                alt={`${item.name} ${item.surname}`}
                                className="object-cover w-50 h-50 flex mx-auto"
                            />
                            <div className="font-bold text-xl lg:text-lg line-clamp-3 text-center">
                                {`${item.name} ${item.surname}`}
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
}
