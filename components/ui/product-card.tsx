"use client";

import React from 'react';
import { Product } from '@/app/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/app/features/cartSlice';
import { toggleWishlist } from '@/app/features/wishlistSlice';
import { toast } from 'react-toastify';
import { RootState } from '@/app/store';
interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.wishlistItems);

  const isInWishlist = wishlist.some(item => item.id === Number(product.id));

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product as any));
    toast.success(`Added to cart!`);
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product as any));
    if (isInWishlist) {
      toast.info(`Removed from wishlist`);
    } else {
      toast.success(`Added to wishlist!`);
    }
  };

  return (
    <motion.div
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
              src={product.image}
              alt={product.title}
              className="object-contain h-full w-full p-4 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 bg-white/80 hover:bg-white shadow-sm"
                onClick={handleToggleWishlist}
              >
                <Heart
                  className={`h-4 w-4 ${isInWishlist ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                />
              </Button>
            </div>
            {product.discountPercentage > 0 && (
              <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                -{Math.round(product.discountPercentage)}%
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-4 flex-1 flex flex-col">
          <Link href={`/products/${product.id}`} className="flex-1 flex flex-col">
            <div className="mb-2">
              <Badge variant="secondary" className="text-xs mb-2">
                {product.category}
              </Badge>
            </div>

            <h3 className="font-semibold text-sm mb-2 line-clamp-2 min-h-[2.5rem] text-gray-900">
              {product.title}
            </h3>

            <p className="text-gray-500 text-xs mb-3 line-clamp-2 min-h-[2rem]">
              {product.description}
            </p>

            <div className="mt-auto">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-700">
                    {product.rating.rate}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({product.rating.count})
                  </span>
                </div>
                <span className="text-lg font-bold text-[#7837ff]">
                  ${product.price}
                </span>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2 mt-3">
            <Button
              className="flex-1 bg-[#7837ff] hover:bg-[#6636c7] text-white"
              onClick={() => handleAddToCart(product)}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>


    </motion.div>
  );
};

export default ProductCard; 