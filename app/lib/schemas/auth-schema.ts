import { ForgetPasswordFormTypes, LoginFormTypes, RegisterFormTypes, UpdateUser, ContactFormTypes } from "@/app/types";
import * as Yup from "yup";
export const registerSchema =  Yup.object().shape({
    username: Yup.string().required("Please enter your username"),
    email: Yup.string().email().required("Please enter your email address"),
    password: Yup.string().required("Please enter your password").min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string().required("Please confirm your password").oneOf([Yup.ref('password')], 'Passwords must match').nullable(),
    remember: Yup.boolean(),
}) as Yup.ObjectSchema<RegisterFormTypes>;

export const loginSchema = Yup.object().shape({
    email: Yup.string().email().required("Please enter your email address"),
    password: Yup.string().required("Please enter your password").min(6, "Password must be at least 6 characters"),
}) as Yup.ObjectSchema<LoginFormTypes>;

export const forgetPasswordSchema = Yup.object().shape( {
    email: Yup.string().email().required("Please enter your email address"),
}) as Yup.ObjectSchema<ForgetPasswordFormTypes>;

export const updateProfileSchema = Yup.object().shape({
    username: Yup.string().required("Please enter your username"),
    email: Yup.string().email().required("Please enter your email address"),
    phone: Yup.string().required("Please enter your phone number"),
    address: Yup.string().required("Please enter your address"),
    profileImage: Yup.string().url("Please enter a valid URL").nullable(),
}) as Yup.ObjectSchema<UpdateUser>;

export const resetPasswordSchema = Yup.object().shape({
    password: Yup.string().required("Please enter your new password").min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string().required("Please confirm your password").oneOf([Yup.ref('password')], 'Passwords must match'),
});

// Contact form schema
export const contactFormSchema = Yup.object().shape({
    fullName: Yup.string().required("Please enter your full name"),
    email: Yup.string().email("Please enter a valid email address").required("Please enter your email address"),
    message: Yup.string().required("Please enter your message"),
}) as Yup.ObjectSchema<ContactFormTypes>;