"use client"

import { RootState } from "@/app/store";
import ProductCardSkeleton from "@/components/ui/product-card-skeleton";
import emptycart from "@/public/auth/empty-card.webp";
import { CartItem } from "@/types";
import { DeleteIcon, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import Container from "@/components/container";
import { removeCart } from "@/app/features/cartSlice";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import EmptyCard from "@/components/empty-card";
const cartPage = () => {
    const [carts, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();
    useEffect(() => {
        setLoading(true);
        const timeout = setTimeout(() => {
            setCart(cartItems);
            setLoading(false);
        }, 1000); // simulate loading delay
        return () => clearTimeout(timeout);
    }, [cartItems]);

    //cart is empty

    const handleRemoveFromCart = (productId: number) => {
        dispatch(removeCart(productId as any));
        toast.success(`Removed from cart!`);
    }
    if (loading) {
        return (
            <Container className="space-y-16 pb-16 max-w-[80rem]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(2)].map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>
            </Container>

        )
    }
 

    return (
        <>
        {
            carts.length === 0 && (
                <EmptyCard title="Your cart is empty" description="You have no items in your cart. Start shopping to add items to your cart." btnText="Start Shopping" />
            )
        }
        <Container className="space-y-16 pb-16 max-w-[80rem]">
            <div className="p-8">
                <h2 className="text-2xl font-semibold mb-4 text-center">Cart Items</h2>
                {carts.map((item) => (
                    <div key={item.id} className="border p-4 mb-2 rounded-md shadow-sm">
                        <div className="relative">
                            <Image src={item.image} alt={item.title} width={200} height={200} />
                        </div>
                        <p className="font-medium">{item.title}</p>
                        <p>Price: ${item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <button onClick={() => handleRemoveFromCart(item.id)} className="bg-destructive hover:bg-destructive/80 cursor-pointer text-white px-4 py-2 rounded-md mt-2 flex items-center text-sm">Remove Cart Item <span className="ml-2 text-sm"><Trash size={16} /></span></button>
                    </div>
                ))}
            </div>
        </Container>
        </>
    )
}

export default cartPage