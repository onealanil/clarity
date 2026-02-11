import { useState } from "react";
import { TrendingUp, Tag, Heart, Plus, Sparkles, Target, Smile } from "lucide-react";
import AddExpenseModal from "../../components/modals/AddExpenseModal";
import { useAuthStore } from "../../store/useAuthStore";

const Dashboard = () => {
    const [expenses, setExpenses] = useState<
        { amount: number; category: string; description: string; mood: "Worth It" | "Neutral" | "Regret" }[]
    >([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const {user } = useAuthStore();
    console.log("Logged in user:", user);

    const monthlyIncome = 30000;
    const goal: "Awareness" | "Control" | "Peace" = "Awareness";

    const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const spendingPercentage = Math.min((totalSpent / monthlyIncome) * 100, 100);

    const handleAddExpense = (expense: {
        amount: number;
        category: string;
        description: string;
        mood: "Worth It" | "Neutral" | "Regret";
    }) => {
        setExpenses([...expenses, expense]);
    };

    const regretCategories = expenses.reduce((acc: any, exp) => {
        if (exp.mood === "Regret") {
            acc[exp.category] = (acc[exp.category] || 0) + 1;
        }
        return acc;
    }, {});

    const moodCounts = expenses.reduce((acc: any, exp) => {
        acc[exp.mood] = (acc[exp.mood] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-50 via-green-50/20 to-stone-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-12 animate-fade-in">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-clarity-green to-clarity-lightGreen flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-display font-semibold text-clarity-charcoal">
                                Welcome back, Anil
                            </h1>
                        </div>
                    </div>
                    <p className="text-stone-600 text-lg font-body ml-15">
                        Your journey to financial clarity continues
                    </p>
                    <div className="inline-flex items-center gap-2 mt-3 ml-15 px-4 py-2 bg-clarity-green/10 rounded-full">
                        <Target className="w-4 h-4 text-clarity-green" />
                        <span className="text-sm font-body font-medium text-clarity-green">
                            Goal: {goal}
                        </span>
                    </div>
                </div>

                {expenses.length === 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
                        <div className="bg-white p-8 rounded-3xl shadow-lg shadow-stone-200/50 border border-stone-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-clarity-green/10 flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-clarity-green" />
                                </div>
                                <h3 className="text-xl font-display font-semibold text-clarity-charcoal">
                                    Spending Pace
                                </h3>
                            </div>
                            <div className="w-full bg-stone-100 rounded-full h-3 mb-4">
                                <div className="bg-stone-300 h-3 rounded-full" style={{ width: "0%" }} />
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-2xl font-display font-bold text-clarity-charcoal">
                                    ₹0
                                </span>
                                <span className="text-sm font-body text-stone-400">
                                    of ₹{monthlyIncome.toLocaleString()}
                                </span>
                            </div>
                            <p className="text-stone-400 text-sm font-body leading-relaxed">
                                Add your first expense to start tracking your spending pace and see how you're doing this month.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-lg shadow-stone-200/50 border border-stone-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                    <Tag className="w-5 h-5 text-amber-500" />
                                </div>
                                <h3 className="text-xl font-display font-semibold text-clarity-charcoal">
                                    Regret Categories
                                </h3>
                            </div>
                            <div className="flex items-center justify-center h-32 mb-4">
                                <div className="text-center">
                                    <div className="text-5xl font-display font-bold text-stone-200 mb-2">
                                        0
                                    </div>
                                    <p className="text-sm font-body text-stone-400">categories tracked</p>
                                </div>
                            </div>
                            <p className="text-stone-400 text-sm font-body leading-relaxed">
                                Start logging expenses to identify patterns and categories where you might want to cut back.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-lg shadow-stone-200/50 border border-stone-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
                                    <Heart className="w-5 h-5 text-pink-500" />
                                </div>
                                <h3 className="text-xl font-display font-semibold text-clarity-charcoal">
                                    Mood Insights
                                </h3>
                            </div>
                            <div className="flex items-center justify-center h-32 mb-4">
                                <div className="text-center">
                                    <div className="text-5xl mb-2">
                                        <Smile className="w-12 h-12 text-stone-200 mx-auto" />
                                    </div>
                                    <p className="text-sm font-body text-stone-400">awaiting data</p>
                                </div>
                            </div>
                            <p className="text-stone-400 text-sm font-body leading-relaxed">
                                Track how your spending makes you feel. We'll show you patterns between your purchases and emotions.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
                        <div className="bg-white p-8 rounded-3xl shadow-lg shadow-stone-200/50 border border-stone-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-clarity-green/10 flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-clarity-green" />
                                </div>
                                <h3 className="text-xl font-display font-semibold text-clarity-charcoal">
                                    Spending Pace
                                </h3>
                            </div>
                            <div className="w-full bg-stone-100 rounded-full h-3 mb-4">
                                <div
                                    className="bg-gradient-to-r from-clarity-green to-clarity-lightGreen h-3 rounded-full transition-all duration-500"
                                    style={{ width: `${spendingPercentage}%` }}
                                />
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-2xl font-display font-bold text-clarity-charcoal">
                                    ₹{totalSpent.toLocaleString()}
                                </span>
                                <span className="text-sm font-body text-stone-500">
                                    of ₹{monthlyIncome.toLocaleString()}
                                </span>
                            </div>
                            <p className="text-stone-600 text-sm font-body">
                                {spendingPercentage < 50
                                    ? "You're doing great! Keep it up."
                                    : spendingPercentage < 80
                                        ? "Watch your pace, you're halfway there."
                                        : "Time to slow down on spending."}
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-lg shadow-stone-200/50 border border-stone-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                    <Tag className="w-5 h-5 text-amber-500" />
                                </div>
                                <h3 className="text-xl font-display font-semibold text-clarity-charcoal">
                                    Regret Categories
                                </h3>
                            </div>
                            <div className="space-y-3">
                                {Object.entries(regretCategories)
                                    .sort(([, a]: any, [, b]: any) => b - a)
                                    .slice(0, 3)
                                    .map(([category, count]: any) => (
                                        <div
                                            key={category}
                                            className="flex items-center justify-between p-3 bg-stone-50 rounded-xl"
                                        >
                                            <span className="font-body text-sm text-clarity-charcoal capitalize">
                                                {category}
                                            </span>
                                            <span className="font-body font-semibold text-sm text-amber-600">
                                                {count}
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-lg shadow-stone-200/50 border border-stone-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
                                    <Heart className="w-5 h-5 text-pink-500" />
                                </div>
                                <h3 className="text-xl font-display font-semibold text-clarity-charcoal">
                                    Mood Insights
                                </h3>
                            </div>
                            <div className="space-y-3">
                                {Object.entries(moodCounts)
                                    .sort(([, a]: any, [, b]: any) => b - a)
                                    .slice(0, 3)
                                    .map(([mood, count]: any) => (
                                        <div
                                            key={mood}
                                            className="flex items-center justify-between p-3 bg-stone-50 rounded-xl"
                                        >
                                            <span className="font-body text-sm text-clarity-charcoal capitalize">
                                                {mood}
                                            </span>
                                            <span className="font-body font-semibold text-sm text-pink-600">
                                                {count}
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                )}

                <button
                    className="fixed bottom-8 right-8 bg-clarity-green text-white p-5 rounded-full shadow-2xl shadow-clarity-green/30 hover:bg-clarity-green/90 hover:scale-110 active:scale-95 transition-all group"
                    onClick={() => setIsModalOpen(true)}
                >
                    <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                </button>
            </div>
            <AddExpenseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddExpense={handleAddExpense}
            />
        </div>
    );
};

export default Dashboard;