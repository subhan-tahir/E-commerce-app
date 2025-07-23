"use client"

import { RootState } from "@/app/store";
import emptycart from "@/public/auth/empty-card.webp";
import { CartItem } from "@/types";
import { DeleteIcon, Heart, ShoppingCart, Star, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import Container from "@/components/container";
import { addToCart, removeCart } from "@/app/features/cartSlice";
import { removeFromWishlist } from "@/app/features/cartSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { toggleWishlist } from "@/app/features/wishlistSlice";
import { Product } from "@/app/types";
import { toast } from "react-toastify";

interface ProductCardProps {
    product: Product;
    onAddToCart?: (product: Product) => void;
    onAddToWishlist?: (product: Product) => void;
}

const WhishListPage = () => {

    const [carts, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const wishlistItems = useSelector((state: RootState) => state.wishlist.wishlistItems);

    const dispatch = useDispatch();
    useEffect(() => {
        setLoading(true);
        const timeout = setTimeout(() => {
            setCart(wishlistItems);
            setLoading(false);
        }, 1000); // simulate loading delay
        return () => clearTimeout(timeout);
    }, [wishlistItems]);


    const isInWishlist = (id: number) => {
        return wishlistItems.some(item => item.id === id);
    };

    const handleToggleWishlist = (product: CartItem) => {
        const isInWishlist = wishlistItems.some(item => item.id === product.id);
        dispatch(toggleWishlist(product));
        toast.info(isInWishlist ? `Removed from wishlist` : `Added to wishlist`);
    };

    // if (loading) {
    //     return (
    //         // <Container className="space-y-16 pb-16 max-w-[80rem]">
    //         //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    //         //         {[...Array(2)].map((_, i) => (
    //         //             <itemCardSkeleton key={i} />
    //         //         ))}
    //         //     </div>
    //         // </Container>

    //     )
    // }
    // if (carts.length === 0) {
    //     return (
    //         //     <Container className="space-y-16 pb-16 max-w-[80rem]">  
    //         <>
    //             <Image src={emptycart} alt="empty cart" width={400} height={400} />
    //             <h2 className="text-2xl font-semibold mb-4 text-center">No Favourite Cart Items</h2>
    //             <p>You have no favourite cart items.</p>

    //             <Button className="mt-4">Add Favourite cart</Button>
    //         </>
    //         // </Container>
    //     )
    // }

    return (
        <>
            {
                wishlistItems.length === 0 && (
                    <div className="flex flex-col justify-center items-center py-5">
                        <h2 className="text-2xl font-semibold text-center">No Favourite Cart Items</h2>
                        {

                            <Image src={emptycart} alt="empty cart" width={400} height={400} className="mx-auto" />
                        }
                        <p>You have no favourite cart items.</p>
                        <Button className="mt-4">Add Favourite cart</Button>
                    </div>

                )
            }
            <Container className="space-y-16 pb-16 max-w-[80rem]">
                <h2 className="text-2xl font-semibold mb-4 text-center">{wishlistItems.length === 0 ? "" : "Favourite Cart Items"}</h2>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((item) => (
                        <motion.div
                            key={item.id}
                            whileTap={{ scale: 0.9 }}
                            whileHover={{ scale: 1.02 }}
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.2, ease: "easeInOut", type: "spring", stiffness: 100 }}
                            viewport={{ once: true, amount: 0.8 }}
                        >


                            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white">
                                <CardHeader className="p-0 relative">
                                    <div className="relative h-48 bg-gray-50 rounded-t-lg overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="object-contain h-full w-full p-4 group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute top-2 right-2 flex gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 bg-white/80 hover:bg-white shadow-sm"
                                                onClick={() => handleToggleWishlist(item)}

                                            ><Heart
                                                    className={`h-4 w-4 ${isInWishlist(item.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                                                />
                                            </Button>
                                        </div>
                                        {item.discountPercentage > 0 && (
                                            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                                                -{Math.round(item.discountPercentage)}%
                                            </Badge>
                                        )}
                                    </div>
                                </CardHeader>

                                <CardContent className="p-4 flex-1 flex flex-col">
                                    <Link href={`/items/${item.id}`} className="flex-1 flex flex-col">
                                        <div className="mb-2">
                                            <Badge variant="secondary" className="text-xs mb-2">
                                                {item.category}
                                            </Badge>
                                        </div>

                                        <h3 className="font-semibold text-sm mb-2 line-clamp-2 min-h-[2.5rem] text-gray-900">
                                            {item.title}
                                        </h3>

                                        <p className="text-gray-500 text-xs mb-3 line-clamp-2 min-h-[2rem]">
                                            {item.description}
                                        </p>

                                        <div className="mt-auto">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-1">
                                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                    <span className="text-sm font-medium text-gray-700">
                                                        {item.rating.rate}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        ({item.rating.count})
                                                    </span>
                                                </div>
                                                <span className="text-lg font-bold text-[#7837ff]">
                                                    ${item.price}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>

                                    <div className="flex items-center gap-2 mt-3">
                                        <Button
                                            className="flex-1 bg-[#7837ff] hover:bg-[#6636c7] text-white"
                                            onClick={() => dispatch(addToCart(item))}
                                        >
                                            <ShoppingCart className="h-4 w-4 mr-2" />
                                            Add to Cart
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>


                        </motion.div>
                    ))}
                </div>
            </Container>
        </>
    )
}

export default WhishListPage