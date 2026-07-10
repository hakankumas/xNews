"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Prisma } from "@/generated/prisma/client";
import Link from "next/link";
import { useFormatDate } from "@/hooks/useFormatDate";
import TopicMenu from "@/components/TopicMenu";

type AuthorWithRelations = Prisma.AuthorGetPayload<{
    include: {
        opinion: true;
    };
}>;

interface Props {
    slug: string;
}

export default function YazarDetails({ slug }: Props) {
    const { formatDate } = useFormatDate();

    const { data, isLoading, error } = useQuery({
        queryKey: ["yazar-slug", slug],
        queryFn: async () => {
            const res = await axios.get<AuthorWithRelations>(
                `/api/author/${slug}`
            );
            return res.data;
        },
        staleTime: Infinity,
    });

    if (isLoading) return <div>Yükleniyor...</div>;
    if (error) return <div>Hata oluştu!</div>;
    if (!data) return null;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7 px-3 lg:px-0">
            {data.opinion.map((item) => (
                <Link
                    key={item.id}
                    href={`/yazarlar/${data.slug}/${item.slug}`}
                    className="flex flex-col cursor-pointer"
                >
                    {item.img && (
                        <img
                            src={`/${item.img}`}
                            alt={item.title}
                            title={item.title}
                            className="object-cover w-full h-50 shadow-lg"
                        />
                    )}
                    <div className="flex flex-col gap-2 shadow-lg p-3">
                        <div className="font-bold text-xl lg:text-lg line-clamp-3">
                            {item.title}
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            {data.img && (
                                <img
                                    src={`/yazarlar/${data.img}`}
                                    alt={`${data.name} ${data.surname}`}
                                    title={`${data.name} ${data.surname}`}
                                    className="object-cover w-8 h-8 rounded-full"
                                />
                            )}
                            <div className="font-bold text-sm text-gray-700">{`${data.name} ${data.surname}`}</div>
                        </div>
                        <div className="text-sm text-gray-700">
                            {formatDate(
                                `${
                                    item.updatedAt
                                        ? item.updatedAt
                                        : item.createdAt
                                }`
                            )}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
