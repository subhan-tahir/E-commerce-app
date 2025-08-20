"use client"

import { RootState } from "@/app/store";
import { CartItem } from "@/types";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux"
import Container from "@/components/container";
import { addToCart } from "@/app/features/cartSlice";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { toggleWishlist } from "@/app/features/wishlistSlice";
import { toast } from "react-toastify";
import EmptyCard from "@/components/empty-card";



const WhishListPage = () => {

    const wishlistItems = useSelector((state: RootState) => state.wishlist.wishlistItems);

    const dispatch = useDispatch();



    const isInWishlist = (id: number) => {
        return wishlistItems.some(item => item.id === id);
    };

    const handleToggleWishlist = (product: CartItem) => {
        const isInWishlist = wishlistItems.some(item => item.id === product.id);
        dispatch(toggleWishlist(product));
        toast.info(isInWishlist ? `Removed from wishlist` : `Added to wishlist`);
    };


    return (
        <>
            {
                wishlistItems.length === 0 ? (

                    <EmptyCard title={"No Favourite Cart Items"} description={"You have no favourite cart items."} btnText={"Add Favourite cart"} />


                ) :
                    (

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
                                                    <Image
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                    )
            }
        </>
    )
}

export default WhishListPage