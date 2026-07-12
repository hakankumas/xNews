import { z } from "zod";

export const newSchema = z.object({
    title: z.string().min(1, "Başlık zorunludur"),

    description: z.string().min(1, "Açıklama zorunludur"),

    content: z.string().min(1, "İçerik zorunludur"),

    img: z
        .instanceof(File)
        .refine(
            (file) => file.size <= 5 * 1024 * 1024,
            "Dosya en fazla 5 MB olabilir"
        )
        .refine(
            (file) =>
                ["image/jpeg", "image/png", "image/webp"].includes(file.type),
            "Sadece JPG, PNG veya WEBP yükleyebilirsiniz."
        ),

    topic: z
        .number({
            message: "Konu seçmelisiniz",
        })
        .int()
        .positive("Konu seçmelisiniz"),
});

export type NewForm = z.infer<typeof newSchema>;
