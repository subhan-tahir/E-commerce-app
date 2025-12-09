// "use client"

// import { RootState } from "@/app/store";
// import ProductCardSkeleton from "@/components/ui/product-card-skeleton";

// import { CartItem } from "@/types";
// import { Trash } from "lucide-react";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux"
// import Container from "@/components/container";
// import { removeCart } from "@/app/features/cartSlice";

// import { toast } from "react-toastify";
// import EmptyCard from "@/components/empty-card";
// const CartMain = () => {
//     const [carts, setCart] = useState<CartItem[]>([]);
//     const [loading, setLoading] = useState(true);
//     const cartItems = useSelector((state: RootState) => state.cart.items);
//     const dispatch = useDispatch();
//     useEffect(() => {
//         setLoading(true);
//         const timeout = setTimeout(() => {
//             setCart(cartItems);
//             setLoading(false);
//         }, 1000); // simulate loading delay
//         return () => clearTimeout(timeout);
//     }, [cartItems]);

//     //cart is empty

//     const handleRemoveFromCart = (productId: number) => {
//         dispatch(removeCart(productId as number));
//         toast.success(`Removed from cart!`);
//     }
//     if (loading) {
//         return (
//             <Container className="space-y-16 pb-16 max-w-[80rem]">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {[...Array(2)].map((_, i) => (
//                         <ProductCardSkeleton key={i} />
//                     ))}
//                 </div>
//             </Container>

//         )
//     }


//     return (
//         <>
//             {
//                 carts.length === 0 ? (
//                     <EmptyCard title="Your cart is empty" description="You have no items in your cart. Start shopping to add items to your cart." btnText="Start Shopping" />
//                 ) : (

//                     <Container className="space-y-16 pb-16 max-w-[80rem]">
//                         <div className="p-8">
//                             <h2 className="text-2xl font-semibold mb-4 text-center">{carts.length === 0 ? "" : "Your Cart Items"}</h2>
//                             {carts.map((item) => (
//                                 <div key={item.id} className="border p-4 mb-2 rounded-md shadow-sm">
//                                     <div className="relative">
//                                         <Image src={item.image} alt={item.title} width={200} height={200} />
//                                     </div>
//                                     <p className="font-medium">{item.title}</p>
//                                     <p>Price: ${item.price}</p>
//                                     <p>Quantity: {item.quantity}</p>
//                                     <button onClick={() => handleRemoveFromCart(item.id)} className="bg-destructive hover:bg-destructive/80 cursor-pointer text-white px-4 py-2 rounded-md mt-2 flex items-center text-sm">Remove Cart Item <span className="ml-2 text-sm"><Trash size={16} /></span></button>
//                                 </div>
//                             ))}
//                         </div>
//                     </Container>
//                 )
//             }
//         </>
//     )
// }

// export default CartMain

"use client";

import { RootState } from "@/app/store";
// import { CartItem } from "@/types";
import { Trash, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Container from "@/components/container";
import { toast } from "react-toastify";
import ProductCardSkeleton from "@/components/ui/product-card-skeleton";
import EmptyCard from "@/components/empty-card";
import { decreaseQuantity, increaseQuantity, removeCart } from "@/app/features/cartSlice";
import { Button } from "../ui/button";

export default function CartMain() {
  const [loading, setLoading] = useState(true);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timeout);
  }, []);

  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeCart(productId));
    toast.success("Removed from cart!");
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <Container className="max-w-[80rem] py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </Container>
    );
  }

  if (cartItems.length === 0) {
    return (
      <EmptyCard
        title="Your cart is empty"
        description="You have no items in your cart."
        btnText="Start Shopping"
      />
    );
  }

  return (
    <Container className="max-w-7xl py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Your Cart</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* LEFT SIDE - CART ITEMS */}
        <div className="md:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 p-4 border rounded-xl shadow-sm hover:shadow-md transition bg-white"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={120}
                height={120}
                className="rounded-md object-cover"
              />

              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{item.category}</p>

                <p className="font-bold text-lg mt-2">${item.price}</p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-3">
                  <button
                    
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    disabled={item.quantity === 1}
                
                    className={`p-1 cursor-pointer border rounded-md hover:bg-gray-100 ${item.quantity === 1 ? "disabled:opacity-50 disabled:cursor-not-allowed":""}`}
                  >
                    <Minus size={16} />
                  </button>

                  <span className="font-semibold">{item.quantity}</span>

                  <button
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    className="p-1 border cursor-pointer rounded-md hover:bg-gray-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Remove Button */}
                <Button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="flex items-center gap-2 mt-4 text-red-600 bg-red-300 hover:bg-red-500 hover:0. hover:text-red-800 text-sm"
                >
                  <Trash size={16} /> Remove
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE - SUMMARY */}
        <div className="p-6 h-fit border rounded-xl shadow-sm bg-white">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

          <div className="flex justify-between mb-3">
            <p className="text-gray-700">Subtotal</p>
            <p className="font-bold">${subtotal.toFixed(2)}</p>
          </div>

          <div className="flex justify-between mb-3">
            <p className="text-gray-700">Shipping</p>
            <p className="font-bold">$5.00</p>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-lg font-bold mb-6">
            <p>Total</p>
            <p>${(subtotal + 5).toFixed(2)}</p>
          </div>

          <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg">
            Checkout
          </button>
        </div>
      </div>
    </Container>
  );
}
