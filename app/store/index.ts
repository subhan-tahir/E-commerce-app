// store.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import wishlistReducer from "../features/wishlistSlice";
import { loadCartFromStorage, loadWishlistFromStorage, saveCartToStorage, saveWishlistToStorage } from "@/app/utils/cartFromLocalStorage";

const preloadedState = {
  cart: loadCartFromStorage(),
  wishlist: loadWishlistFromStorage(), // load cart items
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer, // Add wishlist reducer

  },
  preloadedState,
});

store.subscribe(() => {
  saveCartToStorage(store.getState().cart); // Save on every update
});

store.subscribe(()=>{
  saveWishlistToStorage(store.getState().wishlist);
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
