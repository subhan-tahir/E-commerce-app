import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const ProductCardSkeleton: React.FC = () => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white">
      <CardHeader className="p-0 relative">
        <div className="relative h-48 bg-gray-50 rounded-t-lg overflow-hidden">
          <Skeleton className="h-full w-full" />
        </div>
      </CardHeader>
      
      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="mb-2">
          <Skeleton className="h-5 w-16 mb-2" />
        </div>
        
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        
        <Skeleton className="h-3 w-full mb-3" />
        <Skeleton className="h-3 w-2/3 mb-3" />
        
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-3 w-12" />
            </div>
            <Skeleton className="h-6 w-16" />
          </div>
          
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCardSkeleton; 