import axios from 'axios';
import { ContactFormTypes, Product } from '@/app/types';
import { useSearchParams } from 'next/navigation';
import { error } from 'console';

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
  },
  createUser: async (user: any) => {
    try {
      const response = await axios.post(`/api/auth/register`, user);

      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  },
  loginUser: async (credentials: { email: string; password: string }) => {
    try {
      const response = await axios.post(`/api/auth/login`, credentials);
      return response.data;
    } catch (error) {
      console.error('Error logging in user:', error);
      throw new Error('Failed to log in user');
    }
  },
  verifyEmail: async (email: string, code: string) => {
    try {
      const response = await axios.post(`/api/auth/verify-email`, { email, code });
      return response.data;
    } catch (error) {
      console.error('Error verifying email:', error);
      throw new Error('Failed to verify email');
    }
  },
  updateUser: async ({ username, email, phone, address, accessToken }: any) => {
    try {
      const response = await axios.put(
        "/api/auth/update",
        { username, email, phone, address },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Update response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Error updating user:", error);
      throw new Error(error.response?.data?.message || "Failed to update user");
    }
  },
uploadProfileImage:  async (formData: FormData, accessToken?: string) => {
  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
      body: formData,
    });

    // Check if response is JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("Non-JSON response:", text);
      throw new Error("Server returned non-JSON response");
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to upload image");
    }

    return data;
  } catch (error: any) {
    console.error("API error:", error);
    throw error;
  }
},
contactUs: async (formData: ContactFormTypes) => {
  try {
    const response = await axios.post('/api/contact-us', formData);
    return response.data;
  } catch (error) {
    console.error('Error sending contact message:', error);
    throw new Error('Failed to send contact message');
  }
}
  };
