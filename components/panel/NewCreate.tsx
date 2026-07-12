"use client";

import { Topic } from "@/generated/prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newSchema, NewForm } from "@/schemas/new.schema";

export default function NewCreate() {
    const queryClient = useQueryClient();

    const {
        data: topics,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["topic"],
        queryFn: async () => {
            const res = await axios.get<Topic[]>("/api/topic");
            return res.data;
        },
        staleTime: Infinity,
    });

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<NewForm>({
        resolver: zodResolver(newSchema),
        defaultValues: {
            title: "",
            description: "",
            content: "",
            img: undefined,
            topic: 0,
        },
    });

    const createMutation = useMutation({
        mutationFn: (formData: FormData) => {
            return axios.post(`/api/news`, formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["news"],
            });
            toast.success("İşlem tamamlandı.");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const onSubmit = async (values: NewForm) => {
        const formData = new FormData();

        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("content", values.content);
        formData.append("img", values.img);
        formData.append("topic", values.topic.toString());

        await createMutation.mutateAsync(formData);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
                <label htmlFor="title">Başlık</label>

                <textarea
                    {...register("title")}
                    id="title"
                    className="border"
                />

                {errors.title && (
                    <p className="text-sm text-red-500">
                        {errors.title.message}
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-3">
                <label htmlFor="description">Kısa Açıklama</label>

                <textarea
                    {...register("description")}
                    id="description"
                    className="border"
                />

                {errors.description && (
                    <p className="text-sm text-red-500">
                        {errors.description.message}
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-3">
                <label htmlFor="content">İçerik</label>

                <textarea
                    {...register("content")}
                    id="content"
                    className="border"
                />

                {errors.content && (
                    <p className="text-sm text-red-500">
                        {errors.content.message}
                    </p>
                )}
            </div>

            <div>
                <Controller
                    name="img"
                    control={control}
                    render={({ field: { onChange, ref } }) => (
                        <input
                            ref={ref}
                            type="file"
                            id="img"
                            accept="image/*"
                            hidden
                            onChange={(event) => {
                                onChange(event.target.files?.[0]);
                            }}
                        />
                    )}
                />

                <label
                    htmlFor="img"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white transition-colors duration-200 hover:bg-blue-700"
                >
                    📁 Dosya Seç
                </label>

                {errors.img && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.img.message}
                    </p>
                )}
            </div>

            <div className="flex w-fit flex-col gap-3">
                <label htmlFor="topic">Konu</label>

                <select
                    {...register("topic", {
                        valueAsNumber: true,
                    })}
                    id="topic"
                    className="rounded border p-2"
                    disabled={isLoading}
                >
                    <option value={0}>
                        {isLoading ? "Yükleniyor..." : "Konu seçin"}
                    </option>

                    {topics?.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>

                {error && (
                    <p className="text-sm text-red-500">Konular yüklenemedi.</p>
                )}

                {errors.topic && (
                    <p className="text-sm text-red-500">
                        {errors.topic.message}
                    </p>
                )}
            </div>

            <div className="w-fit self-end">
                <button
                    type="submit"
                    disabled={createMutation.isPending}
                    className="cursor-pointer rounded bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {createMutation.isPending
                        ? "Kaydediliyor..."
                        : "Haberi Kaydet"}
                </button>
            </div>
        </form>
    );
}
