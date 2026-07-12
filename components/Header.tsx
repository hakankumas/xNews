"use client";

import { Topic } from "@/generated/prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import {
    FaPhoneAlt,
    FaFacebook,
    FaInstagram,
    FaYoutube,
    FaWhatsapp,
} from "react-icons/fa";
import { FaLocationDot, FaXTwitter, FaEnvelope } from "react-icons/fa6";

export default function Header() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["header"],
        queryFn: async () => {
            const res = await axios.get<Topic[]>("/api/topic/some");
            return res.data;
        },
        staleTime: Infinity,
    });

    if (isLoading) return <div>Yükleniyor...</div>;
    if (error) return <div>Hata oluştu!</div>;
    if (!data) return null;

    return (
        <div>
            <div className="w-full bg-red-600">
                <div className="max-w-5xl mx-auto flex flex-row h-15 justify-between items-center px-3 lg:px-0">
                    <Link
                        href={"/"}
                        className="font-bold text-white text-lg lg:text-xl"
                    >
                        sondakikaaciklama.com.tr
                    </Link>
                    <div className="flex flex-row gap-3 text-2xl text-white">
                        <Link
                            href="#"
                            target="_blank"
                            className="cursor-pointer hover:text-gray-200"
                        >
                            <FaXTwitter />
                        </Link>
                        <Link
                            href="#"
                            target="_blank"
                            className="cursor-pointer hover:text-gray-200"
                        >
                            <FaInstagram />
                        </Link>
                        <Link
                            href="#"
                            target="_blank"
                            className="cursor-pointer hover:text-gray-200"
                        >
                            <FaFacebook />
                        </Link>
                        <Link
                            href="#"
                            target="_blank"
                            className="cursor-pointer hover:text-gray-200"
                        >
                            <FaYoutube />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-full bg-gray-100">
                <div className="max-w-5xl mx-auto flex flex-row h-15 gap-5 items-center px-3 lg:px-0">
                    {data.map((item) => (
                        <Link
                            key={item.id}
                            href={`/${item.slug}`}
                            className="font-bold cursor-pointer hover:text-gray-700"
                        >
                            <div>{item.name.toLocaleUpperCase("tr")}</div>
                        </Link>
                    ))}
                    {/* <Link
                        href={`/yazarlar`}
                        className="font-bold cursor-pointer hover:text-gray-700"
                    >
                        <div>YAZARLAR</div>
                    </Link> */}
                    <Link
                        href={`/kose-yazilari`}
                        className="font-bold cursor-pointer hover:text-gray-700"
                    >
                        <div>KÖŞE YAZILARI</div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
