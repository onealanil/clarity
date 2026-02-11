import { loginSchema } from "../../validation/auth/loginSchema";
import { signupSchema } from "../../validation/auth/signupSchema";
import { AuthState } from "../user/user";
import * as yup from "yup";

export interface AuthContextType {
  user: AuthState["user"];
  accessToken: AuthState["accessToken"];
  setAuth: AuthState["setAuth"];
  logout: AuthState["logout"];
}

export type SignupFormData = yup.InferType<typeof signupSchema>;

export type LoginFormInputs = {
  email: string;
  password: string;
};

export type LoginFormData = yup.InferType<typeof loginSchema>;