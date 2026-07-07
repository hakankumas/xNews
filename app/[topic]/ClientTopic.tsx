"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Prisma } from "@/generated/prisma/client";

type NewsWithRelations = Prisma.newsGetPayload<{
    include: {
        topic_rs: true;
        author_rs: true;
    };
}>;

interface Props {
    topic: string;
}

export default function ClientTopic({ topic }: Props) {
    const { data, isLoading, error } = useQuery({
        queryKey: [topic],
        queryFn: async () => {
            const res = await axios.get<NewsWithRelations[]>(
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
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>;
        </div>
    );
}
