"use client";

import Link from "next/link";
import { Prisma } from "@/generated/prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
type NewsWithRelations = Prisma.NewsGetPayload<{
    include: {
        topic_rs: true;
        author_rs: true;
    };
}>;

export default function News1() {
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7 px-3 lg:px-0">
            {data.map((item) => (
                <Link
                    key={item.id}
                    href={`/${item.topic_rs.slug}/${item.slug}`}
                    className="flex flex-col gap-2 cursor-pointer"
                >
                    <img
                        src={item.img ?? ""}
                        alt={item.title ?? ""}
                        title={item.title ?? ""}
                        className="object-cover w-full h-50 shadow-lg"
                    />
                    <div className="font-bold text-xl lg:text-lg line-clamp-3">
                        {item.title}
                    </div>
                </Link>
            ))}
        </div>
    );
}
