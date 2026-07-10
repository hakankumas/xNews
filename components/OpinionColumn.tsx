"use client";

import { Prisma } from "@/generated/prisma/client";
import { useFormatDate } from "@/hooks/useFormatDate";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

type OpinionWithRelations = Prisma.OpinionGetPayload<{
    include: {
        author_rs: true;
        topic_rs: true;
    };
}>;

export default function OpinionColumn() {
    const { formatDate } = useFormatDate();

    const { data, isLoading, error } = useQuery({
        queryKey: ["opinion-column"],
        queryFn: async () => {
            const limit = 3;
            const res = await axios.get<OpinionWithRelations[]>(
                `/api/opinion/limit/${limit}`
            );
            return res.data;
        },
        staleTime: Infinity,
    });

    if (isLoading) return <div>Yükleniyor...</div>;
    if (error) return <div>Hata oluştu!</div>;
    if (!data) return null;

    return (
        <div className="flex flex-col px-3 lg:px-0">
            <Link
                href="/kose-yazilari"
                className="font-bold text-2xl pt-1 text-center"
            >
                Köşe Yazıları
            </Link>
            {data.map((item) => (
                <Link
                    key={item.id}
                    href={`/yazarlar/${item.author_rs.slug}/${item.slug}`}
                    className="flex flex-col gap-2 cursor-pointer shadow-lg rounded-lg p-5"
                >
                    <div className="flex flex-row gap-2 items-center">
                        <img
                            src={`/yazarlar/${item.author_rs.img}`}
                            alt={`${item.author_rs.name} ${item.author_rs.surname}`}
                            title={`${item.author_rs.name} ${item.author_rs.surname}`}
                            className="object-cover w-10 h-10 rounded-full"
                        />
                        <div className="line-clamp-1">{`${item.author_rs.name} ${item.author_rs.surname}`}</div>
                    </div>

                    <div className="font-bold text-xl lg:text-lg line-clamp-2">
                        {item.title}
                    </div>
                    <div className="text-sm">
                        {formatDate(
                            `${
                                item.updatedAt ? item.updatedAt : item.createdAt
                            }`
                        )}
                    </div>
                </Link>
            ))}
        </div>
    );
}
