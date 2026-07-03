"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { registerUser } from "@/services/api";
import { useAuthStore } from "@/store/authStore";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const { register, handleSubmit } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await registerUser(data);

      login(response.user, response.token);

      toast.success(response.message || "Registration Successful");

      router.push("/dashboard");
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : undefined;
      toast.error(message || "Registration Failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            Create Account 🚀
          </h1>

          <p className="mt-2 text-gray-500">
            Register to start managing your projects
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 text-gray-400"
        >
          <Input
            label="Full name"
            placeholder="Enter your full name"
            {...register("name")}
            className="placeholder:text-slate-400 text-slate-800"
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className="placeholder:text-slate-400 text-slate-800"
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />

          <Button type="submit">Create Account</Button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-slate-600">Already have an account?</p>
          <button
            onClick={() => router.push("/login")}
            className="mt-2 inline-block rounded-lg bg-transparent px-4 py-2 text-sm font-medium text-cyan-600 hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

