"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Calendar,
  Edit,
  Save,
  X,
  Camera,
  MapPin,
  Phone,
  Shield,
  ShoppingBag,
  Heart,
  Settings,
  LogOut
} from "lucide-react";
import ProfileForm from "./ProfileForm";

const ProfilePage = () => {
  // const [isEditing, setIsEditing] = useState(false);
  // const [user, setUser] = useState({
  //   id: "1",
  //   username: "john_doe",
  //   email: "john.doe@example.com",
  //   avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  //   role: "customer",
  //   createdAt: "2024-01-15",
  //   phone: "+1 (555) 123-4567",
  //   address: "123 Main St, New York, NY 10001",
  //   orders: 12,
  //   wishlistItems: 8
  // });

  // const [formData, setFormData] = useState({
  //   username: user.username,
  //   email: user.email,
  //   phone: user.phone,
  //   address: user.address
  // });

  // const handleSave = () => {
  //   setUser(prev => ({ ...prev, ...formData }));
  //   setIsEditing(false);
  // };

  // const handleCancel = () => {
  //   setFormData({
  //     username: user.username,
  //     email: user.email,
  //     phone: user.phone,
  //     address: user.address
  //   });
  //   setIsEditing(false);
  // };

  // const handleInputChange = (field: string, value: string) => {
  //   setFormData(prev => ({ ...prev, [field]: value }));
  // };

  // const stats = [
  //   { label: "Total Orders", value: user.orders, icon: ShoppingBag, color: "bg-blue-500" },
  //   { label: "Wishlist Items", value: user.wishlistItems, icon: Heart, color: "bg-red-500" },
  //   { label: "Member Since", value: "Jan 2024", icon: Calendar, color: "bg-green-500" },
  //   { label: "Account Status", value: "Active", icon: Shield, color: "bg-purple-500" }
  // ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </motion.div>

        <div className="w-full">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <ProfileForm />
          </motion.div>

          {/* Main Content */}


          {/* Quick Actions */}
          {/* <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Access your account features</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="justify-start h-12">
                      <ShoppingBag className="h-5 w-5 mr-3" />
                      View Orders
                    </Button>
                    <Button variant="outline" className="justify-start h-12">
                      <Heart className="h-5 w-5 mr-3" />
                      My Wishlist
                    </Button>
                    <Button variant="outline" className="justify-start h-12">
                      <Settings className="h-5 w-5 mr-3" />
                      Account Settings
                    </Button>
                    <Button variant="outline" className="justify-start h-12 text-red-600 hover:text-red-700 hover:bg-red-50">
                      <LogOut className="h-5 w-5 mr-3" />
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card> */}

        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 