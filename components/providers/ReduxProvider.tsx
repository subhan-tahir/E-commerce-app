"use client";

import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/app/store";
import { setCart, setWishlist } from "@/app/features/cartSlice";
import { loadCartFromStorage, loadWishlistFromStorage } from "@/app/utils/cartFromLocalStorage";

const ReduxInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cart = loadCartFromStorage();
    const wishlist = loadWishlistFromStorage();
    dispatch(setCart(cart || []));
    dispatch(setWishlist(wishlist || []));
  }, [dispatch]);

  return <>{children}</>;
};

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ReduxInitializer>{children}</ReduxInitializer>
    </Provider>
  );
}