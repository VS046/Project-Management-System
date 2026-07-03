import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const getToken = () => {
  const storeToken = useAuthStore.getState().token;

  if (storeToken || typeof window === "undefined") {
    return storeToken;
  }

  return localStorage.getItem("token");
};

const isPublicAuthRoute = (url?: string) =>
  url?.includes("/auth/login") || url?.includes("/auth/register");

api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token && !isPublicAuthRoute(config.url)) {
      config.headers = config.headers || {};
      if (typeof config.headers.set === "function") {
        config.headers.set("Authorization", `Bearer ${token}`);
      } else {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      typeof window !== "undefined" &&
      error?.response?.status === 401 &&
      !isPublicAuthRoute(error.config?.url)
    ) {
      const { clearAuth } = useAuthStore.getState();

      clearAuth();

      if (window.location.pathname !== "/login") {
        window.location.replace("/login");
      }
    }

    return Promise.reject(error);
  },
);

export default api;
