// src/store/authStore.ts
import { create } from "zustand";

type User = {
  id: string;
  username: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  login: (token, user) => set({ token, user }),

  logout: () => set({ token: null, user: null }),
}));
