"use client";

import { CartItem } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveCartToStorage, saveWishlistToStorage } from "@/app/utils/cartFromLocalStorage";

interface CartState {
  items: CartItem[];
  wishlistItems: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  wishlistItems: [],
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      saveCartToStorage(state.items); // Persist to localStorage
    },
    removeCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.total = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      saveCartToStorage(state.items); // Persist to localStorage
    },
    addToWishlist: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.wishlistItems.find((item) => item.id === action.payload.id);
      if (!existingItem) {
        state.wishlistItems.push({ ...action.payload, quantity: 1 });
      }
      saveWishlistToStorage(state.wishlistItems); // Persist to localStorage
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.wishlistItems = state.wishlistItems.filter((item) => item.id !== action.payload);
      saveWishlistToStorage(state.wishlistItems); // Persist to localStorage
    },
    toggleWishlist: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.wishlistItems.find((item) => item.id === action.payload.id);
      if (existingItem) {
        state.wishlistItems = state.wishlistItems.filter((item) => item.id !== action.payload.id);
      } else {
        state.wishlistItems.push({ ...action.payload, quantity: 1 });
      }
      saveWishlistToStorage(state.wishlistItems); // Persist to localStorage
    },
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.total = action.payload.reduce((acc, item) => acc + item.price * item.quantity, 0);
      saveCartToStorage(state.items);
    },
    setWishlist: (state, action: PayloadAction<CartItem[]>) => {
      state.wishlistItems = action.payload;
      saveWishlistToStorage(state.wishlistItems);
    },
  },
});

export const { addToCart, removeCart, addToWishlist, removeFromWishlist, toggleWishlist, setCart, setWishlist } = cartSlice.actions;

export default cartSlice.reducer;