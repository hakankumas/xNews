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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7 p-3 lg:px-0">
            {data
                .filter((item) => item.id !== 1)
                .map((item) => (
                    <Link
                        key={item.id}
                        href={`/yazarlar/${item.slug}`}
                        className="flex flex-row lg:flex-col gap-5 lg:gap-3 items-center cursor-pointer shadow-lg p-3"
                    >
                        {item.img && (
                            <img
                                src={`/yazarlar/${item.img}`}
                                alt={`${item.name} ${item.surname}`}
                                className="object-cover w-20 h-20 lg:w-40 lg:h-40"
                            />
                        )}
                        <div className="font-bold text-2xl lg:text-lg line-clamp-3 text-center">
                            {`${item.name} ${item.surname}`}
                        </div>
                    </Link>
                ))}
        </div>
    );
}
