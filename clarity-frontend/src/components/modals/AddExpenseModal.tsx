import { useState } from "react";
import { X, FileText, AlertCircle } from "lucide-react";
import { expenseSchema } from "../../validation/expenses/expenseSchema";
import { AddExpenseModalProps } from "../../interfaces/expense/IExpense";
import { categories } from "../../utils/add-expense/categories";
import { moods } from "../../utils/add-expense/moods";

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  isOpen,
  onClose,
  onAddExpense,
}) => {
  const [amount, setAmount] = useState<number | "">("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [mood, setMood] = useState<"Worth It" | "Neutral" | "Regret" | "">("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validateField = async (field: string, value: any) => {
    try {
      await expenseSchema.validateAt(field, { [field]: value });
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    } catch (err: any) {
      setErrors((prev) => ({ ...prev, [field]: err.message }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const formData = {
      amount: Number(amount),
      category,
      description,
      mood: mood as "Worth It" | "Neutral" | "Regret",
    };

    try {
      await expenseSchema.validate(formData, { abortEarly: false });

      onAddExpense(formData);

      setAmount("");
      setCategory("");
      setDescription("");
      setMood("");
      setErrors({});
      setTouched({});
      onClose();
    } catch (err: any) {
      const validationErrors: Record<string, string> = {};
      err.inner.forEach((error: any) => {
        if (error.path) {
          validationErrors[error.path] = error.message;
        }
      });
      setErrors(validationErrors);
      setTouched({
        amount: true,
        category: true,
        mood: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setAmount("");
    setCategory("");
    setDescription("");
    setMood("");
    setErrors({});
    setTouched({});
    onClose();
  };


  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl shadow-stone-900/20 animate-slide-up overflow-hidden max-h-[90vh] flex flex-col">
        <div className="bg-gradient-to-r from-clarity-green to-clarity-lightGreen p-6 relative flex-shrink-0">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-2xl font-display font-semibold text-white">
            Add Expense
          </h2>
          <p className="text-white/80 font-body text-sm mt-1">
            Track your spending and how it makes you feel
          </p>
        </div>

        <div className="p-6 space-y-5 overflow-y-auto">
          <div>
            <label className="block text-sm font-body font-medium text-clarity-charcoal mb-2">
              Amount *
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <span className="w-5 h-5 text-stone-400" >R.S </span> 
              </div>
              <input
                type="number"
                placeholder="0.00"
                className={`w-full border-2 rounded-2xl pl-12 pr-4 py-3 text-lg font-body focus:outline-none transition-colors ${touched.amount && errors.amount
                  ? "border-rose-500 focus:border-rose-500"
                  : "border-stone-200 focus:border-clarity-green"
                  }`}
                value={amount}
                onChange={(e) => {
                  const value = e.target.value === "" ? "" : Number(e.target.value);
                  setAmount(value);
                  if (touched.amount) {
                    validateField("amount", value);
                  }
                }}
                onBlur={() => {
                  handleBlur("amount");
                  validateField("amount", amount);
                }}
              />
            </div>
            {touched.amount && errors.amount && (
              <div className="flex items-center gap-1 mt-2 text-rose-500 text-sm font-body">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.amount}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-body font-medium text-clarity-charcoal mb-2">
              Category *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`px-4 py-3 rounded-xl border-2 font-body text-sm transition-all ${category === cat
                    ? "border-clarity-green bg-clarity-green/10 text-clarity-green font-medium"
                    : touched.category && errors.category
                      ? "border-rose-500 text-stone-600 hover:border-rose-400"
                      : "border-stone-200 text-stone-600 hover:border-stone-300"
                    }`}
                  onClick={() => {
                    setCategory(cat);
                    setTouched((prev) => ({ ...prev, category: true }));
                    validateField("category", cat);
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            {touched.category && errors.category && (
              <div className="flex items-center gap-1 mt-2 text-rose-500 text-sm font-body">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.category}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-body font-medium text-clarity-charcoal mb-2">
              Description (optional)
            </label>
            <div className="relative">
              <div className="absolute left-4 top-3">
                <FileText className="w-5 h-5 text-stone-400" />
              </div>
              <input
                type="text"
                placeholder="What did you buy?"
                className={`w-full border-2 rounded-2xl pl-12 pr-4 py-3 font-body focus:outline-none transition-colors ${touched.description && errors.description
                  ? "border-rose-500 focus:border-rose-500"
                  : "border-stone-200 focus:border-clarity-green"
                  }`}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (touched.description) {
                    validateField("description", e.target.value);
                  }
                }}
                onBlur={() => {
                  handleBlur("description");
                  validateField("description", description);
                }}
              />
            </div>
            {touched.description && errors.description && (
              <div className="flex items-center gap-1 mt-2 text-rose-500 text-sm font-body">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.description}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-body font-medium text-clarity-charcoal mb-3">
              How do you feel about this purchase? *
            </label>
            <div className="grid grid-cols-3 gap-3">
              {moods.map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.value}
                    type="button"
                    className={`p-4 rounded-2xl border-2 transition-all ${mood === m.value
                      ? `${m.activeBg} border-transparent text-white shadow-lg`
                      : touched.mood && errors.mood
                        ? "border-rose-500 hover:border-rose-400"
                        : "border-stone-200 hover:border-stone-300"
                      }`}
                    onClick={() => {
                      setMood(m.value as "Worth It" | "Neutral" | "Regret");
                      setTouched((prev) => ({ ...prev, mood: true }));
                      validateField("mood", m.value);
                    }}
                  >
                    <Icon
                      className={`w-8 h-8 mx-auto mb-2 ${mood === m.value ? "text-white" : m.color
                        }`}
                    />
                    <div
                      className={`text-xs font-body font-medium ${mood === m.value ? "text-white" : "text-stone-600"
                        }`}
                    >
                      {m.value}
                    </div>
                  </button>
                );
              })}
            </div>
            {touched.mood && errors.mood && (
              <div className="flex items-center gap-1 mt-2 text-rose-500 text-sm font-body">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.mood}</span>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              className="flex-1 px-6 py-3 rounded-2xl border-2 border-stone-200 font-body font-medium text-stone-600 hover:bg-stone-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="button"
              className="flex-1 px-6 py-3 rounded-2xl bg-clarity-green text-white font-body font-medium hover:bg-clarity-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Expense"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpenseModal;