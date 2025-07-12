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

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    id: "1",
    username: "john_doe",
    email: "john.doe@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    role: "customer",
    createdAt: "2024-01-15",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    orders: 12,
    wishlistItems: 8
  });

  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    phone: user.phone,
    address: user.address
  });

  const handleSave = () => {
    setUser(prev => ({ ...prev, ...formData }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      username: user.username,
      email: user.email,
      phone: user.phone,
      address: user.address
    });
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const stats = [
    { label: "Total Orders", value: user.orders, icon: ShoppingBag, color: "bg-blue-500" },
    { label: "Wishlist Items", value: user.wishlistItems, icon: Heart, color: "bg-red-500" },
    { label: "Member Since", value: "Jan 2024", icon: Calendar, color: "bg-green-500" },
    { label: "Account Status", value: "Active", icon: Shield, color: "bg-purple-500" }
  ];

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-8">
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-2 right-2 bg-[#7837ff] text-white p-2 rounded-full hover:bg-[#6636c7] transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <CardTitle className="text-xl">{user.username}</CardTitle>
                <CardDescription className="flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </CardDescription>
                <Badge variant="secondary" className="mt-2">
                  {user.role}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{user.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{user.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${stat.color}`}>
                          <stat.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                          <p className="text-sm text-gray-600">{stat.label}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Profile Information */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      className="text-[#7837ff] border-[#7837ff] hover:bg-[#7837ff] hover:text-white"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSave}
                        className="bg-[#7837ff] hover:bg-[#6636c7]"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <Input
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      disabled={!isEditing}
                      className="bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                      className="bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                      className="bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <Input
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      disabled={!isEditing}
                      className="bg-gray-50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
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
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 