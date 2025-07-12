"use client";

import { useAppSelector, useAppDispatch } from "@/lib/hooks/redux";
import { addToCart } from "@/app/features/cartSlice";
import { Product } from "@/types";
import { Button } from "./button";
import { ShoppingCart } from "lucide-react";

export function CartCounter() {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    const sampleProduct: Product = {
      id: 1,
      title: "Sample Product",
      price: 29.99,
      description: "A sample product for testing",
      category: "electronics",
      image: "https://via.placeholder.com/150",
      rating: {
        rate: 4.5,
        count: 120
      }
    };

    const cartItem = {
      ...sampleProduct,
      quantity: 1
    };

    dispatch(addToCart(cartItem));
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <ShoppingCart className="h-5 w-5 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">
          Cart Items: {cart.items.length}
        </span>
      </div>
      <div className="text-sm text-gray-600">
        Total: ${cart.total.toFixed(2)}
      </div>
      <Button 
        onClick={handleAddToCart}
        size="sm"
        className="bg-[#7837ff] hover:bg-[#6636c7]"
      >
        Add Sample Item
      </Button>
    </div>
  );
} 