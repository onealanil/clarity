import { create } from "zustand";
import axiosInstance from "../utils/axios";
import { ExpenseState } from "../interfaces/expense/IExpense";
import toast from "react-hot-toast";

export const useExpenseStore = create<ExpenseState>((set, get) => ({
    expenses: [],
    loading: false,

    fetchExpenses: async () => {
        try {
            set({ loading: true });

            const res = await axiosInstance.get("/expenses");

            set({ expenses: res.data.expenses });
        } catch (err: any) {
            toast.error("Failed to fetch expenses");
        } finally {
            set({ loading: false });
        }
    },

    addExpense: async (data) => {
        try {
            const res = await axiosInstance.post("/expenses", data);

            set({
                expenses: [res.data.expense, ...get().expenses],
            });

            toast.success("Expense added");
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to add expense");
        }
    },

    deleteExpense: async (id) => {
        try {
            await axiosInstance.delete(`/expenses/${id}`);

            set({
                expenses: get().expenses.filter((exp) => exp._id !== id),
            });

            toast.success("Expense deleted");
        } catch (err: any) {
            toast.error("Failed to delete expense");
        }
    },

    clearExpenses: () => set({ expenses: [] }),
}));
