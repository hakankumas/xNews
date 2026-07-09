"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Prisma } from "@/generated/prisma/client";
import axios from "axios";

type TopicWithRelations = Prisma.TopicGetPayload<{
    include: {
        news: true;
    };
}>;

type Props = {
    topic: string;
    new_id: number;
};

export default function TopicMenu({ topic, new_id }: Props) {
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
            {data.news
                .filter((item) => item.id !== new_id)
                .map((item) => (
                    <Link
                        key={item.id}
                        href={`/${item.slug}/${item.slug}`}
                        className="text-lg flex flex-col gap-2 cursor-pointer"
                    >
                        <img
                            src={`/${item.img}`}
                            alt={item.title ?? ""}
                            className="border w-full h-50 lg:h-35 object-cover"
                        />
                        <div className="font-bold line-clamp-3">
                            {item.title}
                        </div>
                    </Link>
                ))}
            {/* <pre>{JSON.stringify(data, null, 2)}</pre>; */}
        </>
    );
}
