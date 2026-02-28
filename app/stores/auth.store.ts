import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  username: string | null;
  login: (token: string, username: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token:
        typeof window !== "undefined" ? localStorage.getItem("token") : null,
      username: null,
      login: (token, username) => {
        localStorage.setItem("token", token);
        set({ token, username });
      },
      logout: () => {
        localStorage.removeItem("token");
        set({ token: null, username: null });
      },
    }),
    {
      name: "auth-storage", // key in localStorage
    },
  ),
);
