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

export default function Slider() {
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
        <Swiper slidesPerView={1} className="shadow-lg">
            {data.map((item) => (
                <SwiperSlide key={item.id}>
                    <Link href={`/${item.topic_rs.slug}/${item.slug}`}>
                        <img
                            src={item.img ?? ""}
                            alt={item.title ?? ""}
                            title={item.title ?? ""}
                            className="w-full h-[450px] object-cover"
                        />
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
