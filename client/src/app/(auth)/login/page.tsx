"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { loginUser } from "@/services/api";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const router = useRouter();

  const login = useAuthStore((state) => state.login);
  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginUser(data);

      // login method now handles token persistence
      login(response.user, response.token);

      toast.success("Login Successful");

      router.push("/dashboard");
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : undefined;
      toast.error(message || "Login Failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-300">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-2 text-center text-3xl font-bold text-slate-600">
          Welcome Back 👋
        </h1>

        <p className="mb-8 text-center text-gray-500">Login to your account</p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 text-gray-800"
        >
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm placeholder:text-slate-400 text-slate-800 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100"
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />

          <Button type="submit">Login</Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-slate-600">Don&apos;t have an account?</p>
          <button
            onClick={() => router.push("/register")}
            className="mt-2 inline-block rounded-lg bg-transparent px-4 py-2 text-sm font-medium text-cyan-600 hover:underline"
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
}
