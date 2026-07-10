import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ limit: string }> }
) {
    const { limit } = await params;

    const data = await prisma.opinion.findMany({
        include: {
            author_rs: true,
            topic_rs: true,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: Number(limit),
    });

    return NextResponse.json(data);
}
