"use client";

import { CartItem } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state shape
interface CartState {
    items: CartItem[];
    total: number; // price total
}

const initialState: CartState = {
    items: [],
    total: 0,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);

            if (existingItem) {
                // If item exists, increment quantity
                existingItem.quantity += 1;
            } else {
                // If not, add item with quantity 1
                state.items.push({ ...action.payload, quantity: 1 });
            }

            // Update total (optional)
            state.total = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        },

        // removeCart: (state, action: PayloadAction<CartItem>) => {
        //     state.items = state.items.filter(item => item.id !== action.payload.id);
        //     state.total = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        // }
        removeCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            state.total = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        }


    },
});

export const { addToCart, removeCart } = cartSlice.actions;

export default cartSlice.reducer;
