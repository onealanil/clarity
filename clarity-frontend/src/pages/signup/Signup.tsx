import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../utils/axios";
import { useAuthStore } from "../../store/useAuthStore";
import { SignupFormData } from "../../interfaces/auth/Auth";
import { signupSchema } from "../../validation/auth/signupSchema";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await axiosInstance.post("/signup", data);
      const { user, accessToken } = response.data;

      setAuth(user, accessToken);

      toast.success("Signup successful!, redirecting to login...");
      setTimeout(() => navigate('/login'), 2000);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Toaster position="top-right" />
      <div className="bg-white p-10 rounded-3xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-center text-clarity-charcoal">
          Create Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="Username"
              {...register("username")}
              className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-clarity-green/50 ${errors.username ? "border-red-500" : ""
                }`}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-clarity-green/50 ${errors.email ? "border-red-500" : ""
                }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-clarity-green/50 ${errors.password ? "border-red-500" : ""
                }`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-clarity-green text-white py-3 rounded-xl hover:opacity-90 transition"
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-clarity-charcoal">
          Already have an account?{" "}
          <Link to="/login" className="text-clarity-green font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
