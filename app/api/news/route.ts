import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const data = await prisma.news.findMany({
        include: {
            author_rs: true,
            topic_rs: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return NextResponse.json(data);
}
