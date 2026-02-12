import { create } from "zustand";
import { AuthState } from "../interfaces/user/user";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  setAuth: (user, token) =>
    set({
      user,
      accessToken: token,
    }),
  logout: () => set({ user: null, accessToken: null }),
}));
