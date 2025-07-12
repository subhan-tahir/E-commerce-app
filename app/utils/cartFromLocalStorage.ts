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
