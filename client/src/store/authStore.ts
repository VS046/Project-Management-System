import { create } from "zustand";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;

  login: (user: User, token: string) => void;
  logout: () => void;
  clearAuth: () => void;
}

const getStoredUser = (): User | null => {
  if (typeof window === "undefined") return null;

  const storedUser = localStorage.getItem("user");
  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser) as User;
  } catch {
    localStorage.removeItem("user");
    return null;
  }
};

const getStoredToken = (): string | null => {
  if (typeof window === "undefined") return null;

  return localStorage.getItem("token");
};

const persistAuth = (user: User, token: string) => {
  if (typeof window === "undefined") return;

  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

const removeAuth = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: getStoredUser(),
  token: getStoredToken(),

  login: (user, token) => {
    persistAuth(user, token);

    set({
      user,
      token,
    });
  },

  logout: () => {
    removeAuth();

    set({
      user: null,
      token: null,
    });
  },

  clearAuth: () => {
    removeAuth();

    set({
      user: null,
      token: null,
    });
  },
}));
