"use client";

import Link from "next/link";
import { Prisma } from "@/generated/prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type NewsWithRelations = Prisma.newsGetPayload<{
    include: {
        topic_rs: true;
        author_rs: true;
    };
}>;

export default function New1() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["news"],
        queryFn: async () => {
            const res = await axios.get<NewsWithRelations[]>("/api/news");
            return res.data;
        },
        staleTime: Infinity,
    });

    if (isLoading) return <div>Yükleniyor...</div>;
    if (error) return <div>Hata oluştu!</div>;
    if (!data) return null;

    return (
        <div className="grid grid-cols-5 gap-3">
            {data.map((item) => (
                <Link
                    href={`/${item.topic_rs.slug}/${item.slug}`}
                    key={item.id}
                    className="border p-3"
                >
                    <div>{item.title}</div>
                    <div>{item.content}</div>
                </Link>
            ))}
        </div>
    );
}
