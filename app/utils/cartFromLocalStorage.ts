// utils/localStorage.ts
"use client";
import { CartItem } from "@/types";

export const saveCartToStorage = (cart: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const loadCartFromStorage = (): CartItem[] | undefined => {
  if (typeof window !== "undefined") {
    try {
      const cart = localStorage.getItem("cart");
      return cart ? JSON.parse(cart) : [];
    } catch (err) {
      console.error("Error loading cart from local storage:", err);
      return [];
    }
  }
  return []; // Return empty array during SSR
};

export const saveWishlistToStorage = (wishlist: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
};

export const loadWishlistFromStorage = (): CartItem[] | undefined => {
  if (typeof window !== "undefined") {
    try {
      const wishlist = localStorage.getItem("wishlist");
      return wishlist ? JSON.parse(wishlist) : [];
    } catch (err) {
      console.error("Error loading wishlist from local storage:", err);
      return [];
    }
  }
  return []; // Return empty array during SSR
};