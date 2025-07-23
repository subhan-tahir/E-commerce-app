"use client";
import { CartItem } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
    items: CartItem[];
    wishlistItems: CartItem[]; // Optional wishlist items
    total: number; // price total
}
const initialState: CartState = {
    items: [],
    wishlistItems: [], // Initialize as an empty array
    total: 0,
};

// const wishlistSlice = createSlice({
//     name: "wishlist",
//     initialState,
//     reducers: {
//         addToWishlist: (state, action: PayloadAction<CartItem>) => {
//             const existingItem = state.wishlistItems.find(item => item.id === action.payload.id);

//             if (existingItem) {
//                 // If item exists, increment quantity
//                 existingItem.quantity += 1;
//             } else {
//                 // If not, add item with quantity 1
//                 state.wishlistItems.push({ ...action.payload, quantity: 1 });
//                 console.log('Added to wishlist:', action.payload);
//             }

//             // Update total (optional)
//             state.total = state.wishlistItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
//         },
//         removeFromWishlist: (state, action: PayloadAction<number>) => {
//             state.wishlistItems = state.wishlistItems.filter(item => item.id !== action.payload);
//             state.total = state.wishlistItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
//         },
//     },
// });

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.wishlistItems.find(item => item.id === action.payload.id);

      if (existingItem) {
        // Remove from wishlist
        state.wishlistItems = state.wishlistItems.filter(item => item.id !== action.payload.id);
        console.log('Removed from wishlist:', action.payload);
      } else {
        // Add to wishlist
        state.wishlistItems.push({ ...action.payload, quantity: 1  });
        console.log('Added to wishlist:', action.payload);
      }

      // Update total (optional)
      state.total = state.wishlistItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
  },
});



// export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
// export default wishlistSlice.reducer;

export const {toggleWishlist} = wishlistSlice.actions;
export default wishlistSlice.reducer;