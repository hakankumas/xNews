import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ title: string }> }
) {
    const { title } = await params;
    const data = await prisma.news.findFirst({
        where: {
            slug: title,
        },
        include: {
            author_rs: true,
            topic_rs: true,
        },
    });

    return NextResponse.json(data);
}
