import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/axios";

export const useValidateAuth = () => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    const validateToken = async () => {
      // Only validate if token exists and user is already in store
      if (!token || !user) {
        return;
      }

      try {
        // Validate token with backend
        const response = await api.get("/auth/me");

        if (response.data.success && response.data.user) {
          // Token is valid, update user info if needed
          login(response.data.user, token);
        }
      } catch (error: any) {
        // If 401, token is expired or invalid
        if (error.response?.status === 401) {
          clearAuth();
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
        }
      }
    };

    validateToken();
  }, [token, user, login, clearAuth]);
};
