"use client";

import axios from "axios";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/axios";

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = useAuthStore((state) => state.token);
  const login = useAuthStore((state) => state.login);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    if (!token) return;

    const validatePersistedToken = async () => {
      try {
        const { data } = await api.get("/auth/me");

        if (data.success && data.user) {
          login(data.user, token);

          if (
            window.location.pathname === "/login" ||
            window.location.pathname === "/register" ||
            window.location.pathname === "/"
          ) {
            window.location.replace("/dashboard");
          }
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          clearAuth();

          if (window.location.pathname !== "/login") {
            window.location.replace("/login");
          }
        }
      }
    };

    validatePersistedToken();
  }, [token, login, clearAuth]);

  return <>{children}</>;
}
