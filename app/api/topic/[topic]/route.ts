import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ topic: string }> }
) {
    const { topic } = await params;
    const data = await prisma.topic.findFirst({
        where: {
            slug: topic,
        },
        include: {
            news: true,
        },
    });

    return NextResponse.json(data);
}
