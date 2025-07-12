import axios from 'axios';
import { Product } from '@/app/types';

const API_BASE_URL = 'https://fakestoreapi.com';

export const api = {
  // Get all products
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  },

  // Get products by category
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/category/${category}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw new Error('Failed to fetch products by category');
    }
  },

  // Get all categories
  getCategories: async (): Promise<string[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/categories`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Failed to fetch categories');
    }
  },

  // Get single product
  getProduct: async (id: string): Promise<Product> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Failed to fetch product');
    }
  }
}; 