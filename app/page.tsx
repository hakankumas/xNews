"use client";

import { Prisma } from "@/generated/prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type NewsWithRelations = Prisma.newsGetPayload<{
    include: {
        topic_rs: true;
        author_rs: true;
    };
}>;

export default function App() {
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
        <div className="w-full h-full">
            <div className="flex flex-col">
                {data.map((item) => (
                    <div key={item.id}>
                        <a href={`/${item.topic_rs.slug}/${item.slug}`}>
                            {item.slug}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
