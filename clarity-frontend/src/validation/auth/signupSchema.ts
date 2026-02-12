import * as yup from "yup";

export const signupSchema = yup.object().shape({
    username: yup.string().required("Username is required").min(3, "Username must be at least 3 characters"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});