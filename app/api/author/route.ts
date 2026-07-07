import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const data = await prisma.author.findMany({
        include: {
            news: true,
        },
    });

    return NextResponse.json(data);
}
