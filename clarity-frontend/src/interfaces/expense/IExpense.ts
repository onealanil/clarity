export interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddExpense: (expense: {
    amount: number;
    category: string;
    description: string;
    mood: "Worth It" | "Neutral" | "Regret";
  }) => void;
}

export interface IExpense {
  _id: string;
  amount: number;
  category: string;
  description: string;
  mood: "Worth It" | "Neutral" | "Regret";
  date: string;
}


export interface ExpenseState {
    expenses: IExpense[];
    loading: boolean;
    fetchExpenses: () => Promise<void>;
    addExpense: (data: Omit<IExpense, "_id" | "date">) => Promise<void>;
    deleteExpense: (id: string) => Promise<void>;
    clearExpenses: () => void;
}