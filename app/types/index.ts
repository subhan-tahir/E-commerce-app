// app/types/index.ts
import { DefaultSession, DefaultUser } from "next-auth";

// ---------- Product & Ecommerce Types ----------
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  rate: number;
  count: number;
  quantity: number;
  discountPercentage: number;
  wishlist: boolean;
  stock: number;
  brand: string;
  thumbnail: string;
}

export interface CartItem extends Product {
  quantity: number;
  discountPercentage: number;
  wishlist: boolean;
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

// ---------- NextAuth Augmentation ----------
declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    username?: string | null;
    email?: string | null;
    profileImage?: string | null;
    phone?: string | null;
    address?: string | null;
    isVerified?: boolean;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      username?: string | null;
      email?: string | null;
      profileImage?: string | null;
      phone?: string | null;
      address?: string | null;
      isVerified?: boolean;
    };
    accessToken?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username?: string | null;
    email?: string | null;
    profileImage?: string | null;
    phone?: string | null;
    address?: string | null;
    isVerified?: boolean;
  }
}

// ---------- Form Types ----------
export type RegisterFormTypes = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  remember: boolean;
  phone: string;
  address: string;
};

export type LoginFormTypes = {
  email: string;
  password: string;
  remember: boolean;
};

export type ForgetPasswordFormTypes = {
  email: string;
};

export type ResetPasswordFormTypes = {
  password: string;
  confirmPassword: string;
};

// ---------- DB User Types ----------
export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  profileImage?: string | null;
  phone?: string | null;
  address?: string | null;
  isVerified?: boolean;
};

export type UpdateUser = {
  username: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  profileImage?: string | null;
  accessToken?: string | null;
};

// ---------- Email & Contact Types ----------
export type EmailOptions = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

export type ContactFormTypes = {
  fullName: string;
  email: string;
  message: string;
};
