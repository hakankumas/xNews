"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Prisma } from "@/generated/prisma/client";
import Link from "next/link";

type TopicWithRelations = Prisma.topicGetPayload<{
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
        <>
            <div className="container mx-auto grid grid-cols-4 gap-5">
                {data.news.map((item) => (
                    <Link
                        key={item.id}
                        className="flex flex-col cursor-pointer"
                        href={`/${data.slug}/${item.slug}`}
                    >
                        <img
                            src={item.img ?? ""}
                            alt={item.title ?? ""}
                            title={item.title ?? ""}
                            className="object-cover w-full h-50"
                        />
                        <div>{item.title}</div>
                    </Link>
                ))}
            </div>
            {/* <pre>{JSON.stringify(data, null, 2)}</pre>; */}
        </>
    );
}
