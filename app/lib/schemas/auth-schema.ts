import { RegisterFormTypes } from "@/app/types";
import * as Yup from "yup";
export const registerSchema =  Yup.object().shape({
    username: Yup.string().required("Please enter your username"),
    email: Yup.string().email().required("Please enter your email address"),
    password: Yup.string().required("Please enter your password").min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string().required("Please confirm your password").oneOf([Yup.ref('password'), null], 'Passwords must match'),
    remember: Yup.boolean(),
}) as Yup.ObjectSchema<RegisterFormTypes>;

export const loginSchema = {
    email: Yup.string().email().required("Please enter your email address"),
    password: Yup.string().required("Please enter your password").min(6, "Password must be at least 6 characters"),
};

export const forgetPasswordSchema = {
    email: Yup.string().email().required("Please enter your email address"),
};

