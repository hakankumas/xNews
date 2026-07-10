"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Prisma } from "@/generated/prisma/client";
import Link from "next/link";
import { useFormatDate } from "@/hooks/useFormatDate";
import TopicMenu from "@/components/TopicMenu";

type OpinionWithRelations = Prisma.OpinionGetPayload<{
    include: {
        topic_rs: true;
        author_rs: true;
    };
}>;

interface Props {
    title: string;
}

export default function OpinionDetails({ title }: Props) {
    const { formatDate } = useFormatDate();

    const { data, isLoading, error } = useQuery({
        queryKey: ["opinion-title", title],
        queryFn: async () => {
            const res = await axios.get<OpinionWithRelations>(
                `/api/opinion/${title}`
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
            <div className="flex flex-col gap-5 p-3 lg:p-0">
                {/* Topic and Author  */}
                <div className="flex flex-row justify-between items-center lg:pt-3">
                    <div className="flex flex-col gap-2">
                        <Link
                            href={`/${data.topic_rs.slug}`}
                            className="cursor-pointer"
                            title={`${data.topic_rs.name} Haberleri`}
                        >
                            {data.topic_rs.img && (
                                <img
                                    src={data.topic_rs.img}
                                    alt={data.topic_rs.name}
                                    className="h-20 w-20"
                                />
                            )}
                            <div className="text-xl">
                                Köşe Yazıları -{" "}
                                <span className="text-red-600 font-bold">
                                    {data.topic_rs.name}
                                </span>
                            </div>
                        </Link>
                        <div className="flex flex-col lg:flex-row gap-2 text-sm">
                            <div>{formatDate(data.createdAt)}</div>
                            {data.updatedAt && (
                                <div>{` | Güncelleme: ${formatDate(
                                    data.updatedAt
                                )}`}</div>
                            )}
                        </div>
                    </div>

                    {/* Author */}
                    <Link
                        href={`/yazarlar/${data.author_rs.slug}`}
                        className="flex flex-row gap-2 cursor-pointer items-center"
                    >
                        <div>{`${data.author_rs.name} ${data.author_rs.surname}`}</div>
                        {data.author_rs.img && (
                            <img
                                src={`/yazarlar/${data.author_rs.img}`}
                                alt={`${data.author_rs.name} ${data.author_rs.surname}`}
                                className="h-10 w-10 rounded-full"
                            />
                        )}
                    </Link>
                </div>

                {/* Opinion Details - Title and Description */}
                <div className="flex flex-col gap-3">
                    <div className="font-bold text-3xl lg:text-4xl">
                        {data.title}
                    </div>
                    <div className="text-2xl">{data.description}</div>
                </div>

                <div className="flex flex-col lg:flex-row lg:justify-between gap-3 lg:gap-10">
                    {/* Opinion Details - IMG and Content */}
                    <div className="flex flex-col gap-3 lg:w-3/4">
                        {data.img && (
                            <img
                                src={`/${data.img}`}
                                alt={data.title}
                                className="object-cover w-full max-h-125 shadow-lg"
                            />
                        )}
                        <div className="text-lg">{data.content}</div>
                    </div>
                    {/* Topic Menu */}
                    <div className="lg:w-1/4 flex flex-col gap-5 lg:gap-3">
                        <Link
                            href={`/${data.topic_rs.slug}`}
                            className="text-2xl font-bold cursor-pointer"
                        >{`${data.topic_rs.name} Haberleri`}</Link>
                        <TopicMenu
                            topic={data.topic_rs.slug}
                            item_id={data.id}
                        />
                    </div>
                </div>
            </div>
            <pre>{JSON.stringify(data, null, 2)}</pre>;
        </>
    );
}
