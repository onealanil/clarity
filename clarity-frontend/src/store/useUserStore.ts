import { create } from "zustand";
import axiosInstance from "../utils/axios";
import { useAuthStore } from "./useAuthStore";
import { UpdateIncomeGoal, UserStore } from "../interfaces/user/user";

export const useUserStore = create<UserStore>((set) => ({
    loading: false,
    error: null,

    updateIncomeGoal: async (data: UpdateIncomeGoal) => {
        try {
            set({ loading: true, error: null });

            const res = await axiosInstance.patch(
                "/update-income-goal",
                data
            );

            const { accessToken } = useAuthStore.getState();
            useAuthStore.getState().setAuth(res.data.user, accessToken!);

            set({ loading: false });
        } catch (err: any) {
            set({
                loading: false,
                error:
                    err.response?.data?.message || "Something went wrong",
            });
        }
    }
}));