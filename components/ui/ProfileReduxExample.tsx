"use client";

import { useAppSelector, useAppDispatch } from "@/lib/hooks/redux";
import { addToCart, removeFromCart, clearCart } from "@/app/features/cartSlice";
import { Product } from "@/types";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";

export function ProfileReduxExample() {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const sampleProducts: Product[] = [
    {
      id: 1,
      title: "Wireless Headphones",
      price: 99.99,
      description: "High-quality wireless headphones",
      category: "electronics",
      image: "https://via.placeholder.com/150",
      rating: { rate: 4.5, count: 120 }
    },
    {
      id: 2,
      title: "Smart Watch",
      price: 199.99,
      description: "Feature-rich smartwatch",
      category: "electronics",
      image: "https://via.placeholder.com/150",
      rating: { rate: 4.3, count: 89 }
    }
  ];

  const handleAddToCart = (product: Product) => {
    const cartItem = {
      ...product,
      quantity: 1
    };
    dispatch(addToCart(cartItem));
  };

  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Redux Cart Example
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Cart Summary */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4">
            <Badge variant="secondary">
              {cart.items.length} items
            </Badge>
            <span className="font-semibold text-lg">
              Total: ${cart.total.toFixed(2)}
            </span>
          </div>
          {cart.items.length > 0 && (
            <Button
              onClick={handleClearCart}
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          )}
        </div>

        {/* Sample Products */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Sample Products</h4>
          {sampleProducts.map((product) => (
            <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-12 h-12 rounded object-cover"
                />
                <div>
                  <h5 className="font-medium text-sm">{product.title}</h5>
                  <p className="text-sm text-gray-600">${product.price}</p>
                </div>
              </div>
              <Button
                onClick={() => handleAddToCart(product)}
                size="sm"
                className="bg-[#7837ff] hover:bg-[#6636c7]"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          ))}
        </div>

        {/* Cart Items */}
        {cart.items.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Cart Items</h4>
            {cart.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <h5 className="font-medium text-sm">{item.title}</h5>
                    <p className="text-sm text-gray-600">
                      ${item.price} × {item.quantity}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => handleRemoveFromCart(item.id)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Minus className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}

        {cart.items.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Your cart is empty</p>
            <p className="text-sm">Add some products to get started!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 