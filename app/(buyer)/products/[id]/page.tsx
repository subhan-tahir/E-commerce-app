"use client";

import { api } from "@/app/lib/api";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import ProductDetailSkeleton from "@/components/ui/product-detail-skeleton";
import { Product } from "@/app/types";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Star, ShoppingCart, Heart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CartItem } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, toggleWishlist } from "@/app/features/cartSlice";
import { toast } from "react-toastify";
import { RootState } from "@/app/store";
const ProductDetailPage = () => {
    const params = useParams();
    const productId = params.id as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string>("");
    const [quantity, setQuantity] = useState(1);
        const wishlistItems = useSelector((state: RootState) => state.cart.wishlistItems);

const dispatch = useDispatch();
    const getProduct = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const productData = await api.getProduct(productId);
            setProduct(productData);
            setSelectedImage(productData.image);
        } catch (error) {
            console.error("Failed to fetch product", error);
            setError("Failed to load product details");
        } finally {
            setLoading(false);
        }
    }, [productId]);

    useEffect(() => {
        if (productId) {
            getProduct();
        }
    }, [productId, getProduct]);

   const handleAddToCart = (product: Product) => {
     const cartItem: CartItem = {
       ...product,
       id: Number(product.id),
       quantity: 1,
       discountPercentage: 0,
       
     };
     dispatch(addToCart(cartItem));
     toast.success("Added to cart!");
   };

    const handleToggleWishlist = (product: CartItem) => {
          const isInWishlist = wishlistItems.some(item => item.id === product.id);
          dispatch(toggleWishlist(product));
          toast.info(isInWishlist ? `Removed from wishlist` : `Added to wishlist`);
      };

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
            setQuantity(newQuantity);
        }
    };

    if (loading) {
        return (
            <Container className="py-8 !container-md">
                <ProductDetailSkeleton />
            </Container>
        );
    }

    if (error || !product) {
        return (
            <Container className="py-8 !max-w-[90rem]">
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <p className="text-red-500 text-lg">
                            {error || "Product not found"}
                        </p>
                        <div className="flex gap-4 mt-4">
                            <Button
                                onClick={() => window.location.reload()}
                                className="bg-[#7837ff] hover:bg-[#6636c7]"
                            >
                                Try Again
                            </Button>
                            <Link href="/products">
                                <Button variant="outline">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back to Products
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }

    return (
        <Container className="py-8 !max-w-[80rem]">
            {/* Breadcrumb */}
            <div className="mb-6">
                <Link href="/products">
                    <Button variant="ghost" className="text-white  bg-primary hover:bg-secondary ">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Products
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Section */}
                <div className="space-y-4">
                    <div className="relative h-96 bg-gray-50 rounded-lg overflow-hidden">
                        <Image
                            src={selectedImage}
                            alt={product.title}
                            fill
                            className="object-contain h-full w-full p-4"
                        />
                        {product.discountPercentage > 0 && (
                            <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                                -{Math.round(product.discountPercentage)}%
                            </Badge>
                        )}
                    </div>

                    {/* Thumbnail Images */}
                    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 mt-4">
                        {[product.image].map((img: string, index: number) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(img)}
                                className={`relative h-20 w-full rounded-md border-2 p-1 transition-all duration-300 
        ${selectedImage === img ? "border-primary ring-2 ring-primary/50" : "border-gray-200 hover:border-gray-400"}`}
                                aria-label={`View image ${index + 1}`}
                            >
                                <div className="relative w-full h-full overflow-hidden rounded-md">
                                    <Image
                                        src={img}
                                        alt={`${product.title} - ${index + 1}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover rounded-md"
                                    />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Section */}
                <div className="space-y-6">
                    {/* Category and Title */}
                    <div className="space-y-3">
                        <Badge variant="secondary" className="text-sm">
                            {product.category}
                        </Badge>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {product.title}
                        </h1>
                        <p className="text-lg font-semibold text-[#7837ff]">
                            ${product.price}
                        </p>
                    </div>

                    {/* Rating and Stock */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium text-gray-700">
                                    {product.rating.rate}
                                </span>
                                <span className="text-gray-500">
                                    ({product.rating.count} reviews)
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Badge
                                variant={product.stock > 0 ? "default" : "destructive"}
                                className={product.stock > 0 ? "bg-green-500" : ""}
                            >
                                {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
                            </Badge>
                            <span className="text-sm text-gray-600">
                                Brand: {product.brand}
                            </span>
                        </div>
                       
                    </div>

                    {/* Description */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-gray-900">Description</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    {/* Quantity and Actions */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border rounded-lg">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleQuantityChange(quantity - 1)}
                                    disabled={quantity <= 1}
                                    className="h-10 w-10"
                                >
                                    -
                                </Button>
                                <span className="px-4 py-2 font-medium">{quantity}</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleQuantityChange(quantity + 1)}
                                    disabled={quantity >= product.stock}
                                    className="h-10 w-10"
                                >
                                    +
                                </Button>
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                            onClick={() => handleToggleWishlist(product)}
                                className="h-10 w-10 border"
                            >
                                <Heart className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* <Button
                            className="w-full bg-[#7837ff] hover:bg-[#6636c7] text-white h-12"
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                        >
                            <ShoppingCart className="h-5 w-5 mr-2" />
                            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                        </Button> */}
                         <div className="flex items-center gap-2 mt-3">
                            <Button
                                className="flex-1 bg-[#7837ff] hover:bg-[#6636c7] text-white"
                                onClick={() => handleAddToCart(product)}
                            >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Add to Cart
                            </Button>
                        </div>
                    </div>

                    {/* Product Details */}
                    <Card>
                        <CardContent className="pt-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Product Details
                            </h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Category:</span>
                                    <span className="font-medium">{product.category}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Brand:</span>
                                    <span className="font-medium">{product.brand}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Rating:</span>
                                    <span className="font-medium">{product.rating.rate}/5</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Reviews:</span>
                                    <span className="font-medium">{product.rating.count}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Stock:</span>
                                    <span className="font-medium">{product.stock} units</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Discount:</span>
                                    <span className="font-medium">
                                        {product.discountPercentage > 0
                                            ? `${Math.round(product.discountPercentage)}%`
                                            : "None"
                                        }
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Container>
    );
};

export default ProductDetailPage;