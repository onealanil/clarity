import * as Yup from "yup";

export const expenseSchema = Yup.object().shape({
    amount: Yup.number()
        .required("Amount is required")
        .positive("Amount must be positive")
        .max(1000000, "Amount seems too large"),
    category: Yup.string().required("Please select a category"),
    description: Yup.string().max(200, "Description is too long"),
    mood: Yup.string()
        .oneOf(["Worth It", "Neutral", "Regret"])
        .required("Please select how you feel about this purchase"),
});