import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "../../utils/axios";
import { useAuthStore } from "../../store/useAuthStore";
import { toast } from "react-hot-toast";
import { loginSchema } from "../../validation/auth/loginSchema";
import { LoginFormData } from "../../interfaces/auth/Auth";


const Login = (): React.ReactElement => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await axiosInstance.post("/login", data, { withCredentials: true });
      const { user, accessToken } = res.data;

      setAuth(user, accessToken);
      toast.success("Logged in successfully!");
      navigate("/onboarding");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 p-4">
      <div className="bg-white p-10 rounded-3xl w-full max-w-md shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-clarity-charcoal">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-clarity-green/50 ${errors.email ? "border-red-500" : ""
                }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-clarity-green/50 ${errors.password ? "border-red-500" : ""
                }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-clarity-green text-white py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-clarity-charcoal">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-clarity-green font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
