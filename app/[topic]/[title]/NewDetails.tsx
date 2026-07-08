"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Prisma } from "@/generated/prisma/client";
import Link from "next/link";
import { useFormatDate } from "@/hooks/useFormatDate";

type NewsWithRelations = Prisma.newsGetPayload<{
    include: {
        topic_rs: true;
        author_rs: true;
    };
}>;

interface Props {
    title: string;
}

export default function NewDetails({ title }: Props) {
    const { formatDate } = useFormatDate();

    const { data, isLoading, error } = useQuery({
        queryKey: [title],
        queryFn: async () => {
            const res = await axios.get<NewsWithRelations>(
                `/api/news/${title}`
            );
            return res.data;
        },
        staleTime: Infinity,
    });

    if (isLoading) return <div>Yükleniyor...</div>;
    if (error) return <div>Hata oluştu!</div>;
    if (!data) return null;

    return (
        <div className="container mx-auto flex flex-col gap-4">
            {/* Topic and Author  */}
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-2">
                    <Link
                        href={`/${data.topic_rs.slug}`}
                        className="cursor-pointer"
                    >
                        {data.topic_rs.img && (
                            <img
                                src={data.topic_rs.img}
                                alt={data.topic_rs.name}
                                className="h-20 w-20"
                            />
                        )}
                        <div className="text-xl">
                            Haberler -{" "}
                            <span className="text-red-600 font-bold">
                                {data.topic_rs.name}
                            </span>
                        </div>
                    </Link>
                    <div className="flex flex-row gap-2 text-sm">
                        <div>{formatDate(data.createdAt)}</div>
                        {data.updatedAt && (
                            <div>{` | Güncelleme: ${formatDate(
                                data.updatedAt
                            )}`}</div>
                        )}
                    </div>
                </div>

                <Link
                    href={`/${data.author_rs.slug}`}
                    className="flex flex-row gap-2 cursor-pointer items-center"
                >
                    <div>{`${data.author_rs.name} ${data.author_rs.surname}`}</div>
                    {data.author_rs.img && (
                        <img
                            src={`/author/${data.author_rs.img}`}
                            alt={`${data.author_rs.name} ${data.author_rs.surname}`}
                            className="h-10 w-10 rounded-full"
                        />
                    )}
                </Link>
            </div>

            {/* New Details */}
            <div className="flex flex-col gap-3">
                <div className="font-bold text-4xl">{data.title}</div>
                <div className="text-xl">{data.description}</div>
                <div className="flex flex-row justify-between gap-10">
                    <div className="w-3/4">
                        <img
                            src={`/${data.img}`}
                            alt={data.title}
                            className="object-cover w-full max-h-125"
                        />
                        <div>{data.content}</div>
                    </div>
                    {/* Topic Menu */}
                    <div className="w-1/4">
                        <Link
                            href={`/${data.topic_rs.slug}`}
                            className="text-2xl font-bold cursor-pointer"
                        >{`${data.topic_rs.name} Haberleri`}</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
