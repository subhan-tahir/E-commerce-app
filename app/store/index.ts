// store.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import { loadCartFromStorage, saveCartToStorage } from "@/app/utils/cartFromLocalStorage";

const preloadedState = {
  cart: loadCartFromStorage(), // load cart items
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveCartToStorage(store.getState().cart); // Save on every update
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
