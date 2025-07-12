"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@/app/types";
import { api } from "@/app/lib/api";
import ProductCard from "@/components/ui/product-card";
import ProductCardSkeleton from "@/components/ui/product-card-skeleton";
import Sidebar from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerTrigger 
} from "@/components/ui/drawer";
import { Filter, Grid, List } from "lucide-react";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          api.getProducts(),
          api.getCategories()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      if (selectedCategory) {
        try {
          setLoading(true);
          const data = await api.getProductsByCategory(selectedCategory);
          setProducts(data);
        } catch (err) {
          setError("Failed to load products by category.");
        } finally {
          setLoading(false);
        }
      } else {
        // Reset to all products
        try {
          setLoading(true);
          const data = await api.getProducts();
          setProducts(data);
        } catch (err) {
          setError("Failed to load products.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProductsByCategory();
  }, [selectedCategory]);

  const handleAddToCart = (product: Product) => {
    console.log('Added to cart:', product);
    // TODO: Implement cart functionality
  };

  const handleAddToWishlist = (product: Product) => {
    console.log('Added to wishlist:', product);
    // TODO: Implement wishlist functionality
  };

  const filteredProducts = selectedCategory 
    ? products.filter(product => product.category === selectedCategory)
    : products;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#7837ff] to-[#6636c7] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to EStore
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Discover amazing products at unbeatable prices
          </p>
          <Button 
            size="lg" 
            className="bg-white text-[#7837ff] hover:bg-gray-100"
          >
            Shop Now
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header with Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory ? selectedCategory : 'All Products'}
            </h2>
            {selectedCategory && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="text-[#7837ff] border-[#7837ff] hover:bg-[#7837ff] hover:text-white"
              >
                Clear Filter
              </Button>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="flex items-center border border-gray-300 rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-[#7837ff] text-white' : ''}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-[#7837ff] text-white' : ''}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Filter Drawer */}
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Filters</DrawerTitle>
                </DrawerHeader>
                <div className="px-4 pb-4">
                  <Sidebar
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategorySelect={(category) => {
                      setSelectedCategory(category);
                      setIsDrawerOpen(false);
                    }}
                    onClose={() => setIsDrawerOpen(false)}
                  />
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <Sidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {Array.from({ length: 8 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
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
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onAddToWishlist={handleAddToWishlist}
                  />
                ))}
              </div>
            )}

            {!loading && !error && filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No products found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 