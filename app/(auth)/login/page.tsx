"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginForm } from "@/schemas/auth.schema";

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = (data: LoginForm) => {
        console.log(data);
    };

    return (
        <div className="flex justify-center mt-10">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-96 gap-3"
            >
                <input
                    {...register("username")}
                    placeholder="Kullanıcı Adı"
                    className="border p-2 rounded"
                />

                {errors.username && (
                    <p className="text-red-500 text-sm">
                        {errors.username.message}
                    </p>
                )}

                <input
                    type="password"
                    {...register("password")}
                    placeholder="Şifre"
                    className="border p-2 rounded"
                />

                {errors.password && (
                    <p className="text-red-500 text-sm">
                        {errors.password.message}
                    </p>
                )}

                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded cursor-pointer"
                >
                    Giriş Yap
                </button>
            </form>
        </div>
    );
}
