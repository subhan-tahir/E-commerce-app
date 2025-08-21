import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/app/features/cartSlice";
import { loadCartFromStorage, loadWishlistFromStorage } from "@/app/utils/cartFromLocalStorage";

const preloadedState = {
  cart: {
    items: loadCartFromStorage() || [],
    wishlistItems: loadWishlistFromStorage() || [],
    total: 0,
  },
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;