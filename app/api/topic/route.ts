import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const data = await prisma.topic.findMany({
        where: {
            news: {
                some: {}, // En az 1 haberi olanlar
            },
        },
        include: {
            news: true,
        },
    });

    return NextResponse.json(data);
}
