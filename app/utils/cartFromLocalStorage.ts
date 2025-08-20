import { CartItem } from "@/types";

// utils/localStorage.ts
export const saveCartToStorage = (cart: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const loadCartFromStorage = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : undefined;
  } catch (err) {
    console.error('Error loading cart from local storage:', err);
    return undefined;
  }
};


//for wishlist
export const saveWishlistToStorage = (wishlist:CartItem[] ) => {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

export const loadWishlistFromStorage = () => {
  try {
    const wishlist = localStorage.getItem('wishlist');
    return wishlist ? JSON.parse(wishlist) : undefined;
  } catch (err) {
    console.error('Error loading wishlist from local storage:', err);
    return undefined;
  }
}