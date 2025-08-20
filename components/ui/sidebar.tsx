"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';

interface SidebarProps {
  categories: string[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  onClose
}) => {
  return (
    <div className="h-full bg-white border-r border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-[#7837ff]" />
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="md:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
          <div className="space-y-2">
            <Button
              variant={selectedCategory === null ? "default" : "ghost"}
              className={`w-full justify-start ${
                selectedCategory === null 
                  ? "bg-[#7837ff] text-white" 
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => onCategorySelect(null)}
            >
              All Products
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                className={`w-full justify-start capitalize ${
                  selectedCategory === category 
                    ? "bg-[#7837ff] text-white" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => onCategorySelect(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100">
              Under $50
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100">
              $50 - $100
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100">
              $100 - $200
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100">
              Over $200
            </Button>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Rating</h3>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100">
              4★ & above
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100">
              3★ & above
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100">
              2★ & above
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 