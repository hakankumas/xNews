"use client";
import { Prisma } from "@/generated/prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useFormatDate } from "@/hooks/useFormatDate";

type OpinionWithRelations = Prisma.OpinionGetPayload<{
    include: {
        topic_rs: true;
        author_rs: true;
    };
}>;

export default function KoseYazilari() {
    const { formatDate } = useFormatDate();

    const { data, isLoading, error } = useQuery({
        queryKey: ["kose-yazilari"],
        queryFn: async () => {
            const limit = 10;
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
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7 px-3 lg:px-0">
                {data.map((item) => (
                    <Link
                        key={item.id}
                        href={`/yazarlar/${item.author_rs.slug}/${item.slug}`}
                        className="flex flex-col cursor-pointer"
                    >
                        {item.img && (
                            <img
                                src={item.img}
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
                                {item.author_rs.img && (
                                    <img
                                        src={`/yazarlar/${item.author_rs.img}`}
                                        alt={`${item.author_rs.name} ${item.author_rs.surname}`}
                                        title={`${item.author_rs.name} ${item.author_rs.surname}`}
                                        className="object-cover w-8 h-8 rounded-full"
                                    />
                                )}
                                <div className="font-bold text-sm text-gray-700">{`${item.author_rs.name} ${item.author_rs.surname}`}</div>
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
        </div>
    );
}
