"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Prisma } from "@/generated/prisma/client";
import Link from "next/link";

type TopicWithRelations = Prisma.TopicGetPayload<{
    include: {
        news: true;
    };
}>;

interface Props {
    topic: string;
}

export default function TopicList({ topic }: Props) {
    const { data, isLoading, error } = useQuery({
        queryKey: [topic],
        queryFn: async () => {
            const res = await axios.get<TopicWithRelations>(
                `/api/topic/${topic}`
            );
            return res.data;
        },
        staleTime: Infinity,
    });

    if (isLoading) return <div>Yükleniyor...</div>;
    if (error) return <div>Hata oluştu!</div>;
    if (!data) return null;

    return (
        <div className="max-w-5xl mx-auto flex flex-col">
            <div className="text-2xl font-bold text-red-600 p-3 lg:px-0">{`${data.name} Haberleri`}</div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 px-3 lg:px-0">
                {data.news.map((item) => (
                    <Link
                        key={item.id}
                        href={`/${data.slug}/${item.slug}`}
                        className="flex flex-col gap-2 cursor-pointer"
                    >
                        <img
                            src={item.img ?? ""}
                            alt={item.title ?? ""}
                            title={item.title ?? ""}
                            className="object-cover w-full h-50 border"
                        />
                        <div className="font-bold text-xl lg:text-lg line-clamp-3">
                            {item.title}
                        </div>
                    </Link>
                ))}
            </div>
            {/* <pre>{JSON.stringify(data, null, 2)}</pre>; */}
        </div>
    );
}
