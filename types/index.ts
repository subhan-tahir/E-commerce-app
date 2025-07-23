export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}


export interface CartItem extends Product {
  quantity: number;
  discountPercentage: number; // Optional property for discount percentage
  whishlist: boolean; // Optional property for wishlist items
}

export interface Category {
  id: number;
  name: string;
  image: string;
} 