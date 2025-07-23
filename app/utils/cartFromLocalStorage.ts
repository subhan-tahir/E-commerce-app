// utils/localStorage.ts
export const saveCartToStorage = (cart: any) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const loadCartFromStorage = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : undefined;
  } catch (err) {
    return undefined;
  }
};


//for wishlist
export const saveWishlistToStorage = (wishlist: any) => {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

export const loadWishlistFromStorage = () => {
  try {
    const wishlist = localStorage.getItem('wishlist');
    return wishlist ? JSON.parse(wishlist) : undefined;
  } catch (err) {
    return undefined;
  }
}