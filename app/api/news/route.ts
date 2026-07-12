import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";
import slugify from "slugify";

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

// CREATE
export async function POST(req: Request) {
    const formData = await req.formData();
    const img = formData.get("img") as File;
    if (!(img instanceof File) || img.size === 0) {
        return NextResponse.json(
            { error: "Dosya bulunamadı" },
            { status: 400 }
        );
    }
    const bytes = await img.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = path.join(process.cwd(), "public");
    await fs.mkdir(uploadDir, { recursive: true });

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const topic = formData.get("topic") as string;

    const isExist = await prisma.news.findMany({
        where: {
            title,
        },
    });

    const slug = `${slugify(title, {
        lower: true,
        strict: true,
        locale: "tr",
    })}${isExist.length > 0 ? `-${isExist.length + 1}` : ""}`;

    const revisedName = `${slug}.${img.type.split("/")[1]}`;

    await prisma.news.create({
        data: {
            title,
            description,
            content,
            slug,
            seo_title: title,
            seo_description: description,
            img: revisedName,
            topic: parseInt(topic),
        },
    });

    const filePath = path.join(uploadDir, revisedName);
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ success: true });
}
