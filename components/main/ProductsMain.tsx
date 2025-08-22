// app/(buyer)/products/page.tsx or app/products/page.tsx

"use client";

import { api } from "@/app/lib/api";
import Container from "@/components/container";
import ProductCard from "@/components/ui/product-card";
import { useEffect, useState } from "react";
import { Product } from "@/app/types";
import ProductCardSkeleton from "@/components/ui/product-card-skeleton";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
export const metadata:Metadata = {
    title: "Products - E-store",
    description: "Browse our wide selection of products at E-store. Find the best deals on electronics, fashion, and lifestyle items. Shop now and enjoy free shipping on all orders!",
}
const ProductsMain = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getProducts = async () => {

        try {
            setLoading(true);
            const productsData = await api.getProducts();
            setProducts(productsData);
        } catch (error) {
            console.error("Failed to load products.", error);
            setError("Failed to load products.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <Container className="space-y-16 pb-16 max-w-[80rem]">
            <h1 className="text-2xl font-bold text-center">Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                    <>
                        {Array.from({ length: 8 }).map((_, index) => (
                            <ProductCardSkeleton key={index} />
                        ))}
                    </>
                ) : error ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="text-center">
                            <p className="text-red-500 text-lg">{error}</p>
                            <Button
                                onClick={() => window.location.reload()}
                                className="mt-4 bg-[#7837ff] hover:bg-[#6636c7]"
                            >
                                Try Again
                            </Button>
                        </div>
                    </div>
                ) : (
                    <>
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </>
                )}
            </div>
        </Container>
    );
};

export default ProductsMain;
