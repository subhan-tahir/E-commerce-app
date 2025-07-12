# Redux Setup for Next.js 13+ App Router

This document explains how Redux is properly configured for use with Next.js 13+ App Router and Server Components.

## Key Points

### 1. Server Components vs Client Components
- **Server Components** (default in Next.js 13+) cannot use Redux
- **Client Components** (marked with `"use client"`) can use Redux
- Always mark Redux-related files with `"use client"`

### 2. File Structure
```
app/
├── store/
│   └── index.ts              # Redux store configuration
├── features/
│   └── cartSlice.ts          # Cart slice with reducers
components/
├── providers/
│   └── ReduxProvider.tsx     # Client-side Redux Provider
└── ui/
    ├── CartCounter.tsx       # Example Redux component
    └── ProfileReduxExample.tsx # Comprehensive Redux example
lib/
└── hooks/
    └── redux.ts              # Typed Redux hooks
```

## Usage Examples

### 1. Using Redux in Components

```tsx
"use client";

import { useAppSelector, useAppDispatch } from "@/lib/hooks/redux";
import { addToCart } from "@/app/features/cartSlice";

export function MyComponent() {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <div>
      <p>Cart items: {cart.items.length}</p>
      <p>Total: ${cart.total}</p>
    </div>
  );
}
```

### 2. Available Cart Actions

```tsx
import { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart 
} from "@/app/features/cartSlice";

// Add item to cart
dispatch(addToCart({ ...product, quantity: 1 }));

// Remove item from cart
dispatch(removeFromCart(productId));

// Update item quantity
dispatch(updateQuantity({ id: productId, quantity: 2 }));

// Clear entire cart
dispatch(clearCart());
```

### 3. State Structure

```typescript
interface CartState {
  items: CartItem[];
  total: number;
}

interface CartItem extends Product {
  quantity: number;
}
```

## Common Issues and Solutions

### Issue 1: "This function is not supported in React Server Components"
**Solution**: Add `"use client"` at the top of any file that uses Redux hooks.

### Issue 2: "Store does not have a valid reducer"
**Solution**: Ensure reducers are properly exported and imported:

```typescript
// ✅ Correct
export default cartSlice.reducer;

// ✅ Correct import
import cartReducer from "../features/cartSlice";
```

### Issue 3: TypeScript errors with Redux hooks
**Solution**: Use the typed hooks from `@/lib/hooks/redux`:

```typescript
// ✅ Use these instead of plain useDispatch/useSelector
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
```

## Testing Redux

You can test the Redux setup by:

1. Adding the `CartCounter` component to any page
2. Adding the `ProfileReduxExample` component to the profile page
3. Using the browser's Redux DevTools extension

## Best Practices

1. **Always use `"use client"`** for Redux components
2. **Use typed hooks** (`useAppDispatch`, `useAppSelector`)
3. **Keep slices focused** on specific features
4. **Use proper TypeScript types** for state and actions
5. **Test Redux logic** with Redux Toolkit's built-in testing utilities

## Adding New Slices

To add a new slice:

1. Create a new file in `app/features/`
2. Export the reducer as default
3. Add it to the store configuration
4. Create typed selectors if needed

Example:
```typescript
// app/features/userSlice.ts
"use client";

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
```

Then add to store:
```typescript
// app/store/index.ts
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer, // Add new reducer
  },
});
``` 