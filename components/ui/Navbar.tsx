'use client';

import React, { useEffect, useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, Heart } from 'lucide-react';
import Link from 'next/link';
import { routes } from '@/app/lib/routes';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input"
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  //select item from slice
  const items = useSelector((state: RootState) => state.cart.items);
  const cartQuantity = useSelector((state: RootState) =>
    state.cart.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  useEffect(() => {
    console.log(items);
  }, [items]);
  useEffect(() => {
    console.log(items.length);

  })
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Searching for:', searchQuery);
  };

  const navItems = [
    {
      label: 'Home',
      href: routes.home,
    },
    {
      label: 'Products',
      href: routes.products,
    },
    {
      label: 'Categories',
      href: routes.categories,
    },
    {
      label: 'About',
      href: routes.about,
    },
    {
      label: 'Contact',
      href: routes.contact,
    }
  ]
  return (
    <motion.header
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}

      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}

      className={`bg-white shadow-sm border-b sticky  z-50 md:w-[85%] w-[90%] mx-auto my-4 transition-all duration-300 rounded-lg ${scrolled ? ' bg-white/90 backdrop-blur shadow-md top-5' : "bg-transparent top-0"}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={routes.home} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-bold text-gray-900">EStore</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className={`text-gray-700 hover:text-secondary transition-colors ${pathname === item.href ? 'text-secondary' : ''}`}>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                  type="text" placeholder="Search..." className="w-full rounded-full bg-gray-100 px-4 py-2 pl-10 focus:outline-none focus:bg-white" />

                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </form>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <button className="p-2 text-gray-700 hover:text-blue-600 transition-colors relative">
              <Heart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </button>

            {/* Cart */}
            <Link href={routes.cart}>
              <button className="p-2 text-gray-700 hover:text-blue-600 transition-colors relative">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartQuantity}
                </span>
              </button>
            </Link>
            {/* User Menu */}
            <Link href={routes.profile} className="p-2 text-gray-700 hover:text-blue-600 transition-colors">
              <User className="h-6 w-6" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-8 h-8 flex items-center justify-center md:hidden group cursor-pointer"
              aria-label="Toggle Menu"
            >
              <span
                className={`absolute w-6 h-0.5 bg-gray-800 transition-transform duration-300 ${isMenuOpen ? 'rotate-45 top-1/2' : 'top-2'
                  }`}
              />
              <span
                className={`absolute w-6 h-0.5 bg-gray-800 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'top-1/2'
                  }`}
              />
              <span
                className={`absolute w-6 h-0.5 bg-gray-800 transition-transform duration-300 ${isMenuOpen ? '-rotate-45 top-1/2' : 'bottom-2'
                  }`}
              />
            </button>

          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden py-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Input type="text" placeholder="Search..." className="w-full rounded-full bg-gray-100 px-4 py-2 pl-10 !focus:visible-ring-primary focus:ring-4 focus:bg-white" />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </form>
        </div>

        {/* Mobile Menu */}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : -20 }}
          transition={{ duration: 0.3, ease: "easeInOut", type: "spring", stiffness: 100 }}
          className={` py-4  transition-all md:hidden  duration-300 border-gray-200 ${isMenuOpen ? "block opacity-100" : "hidden opacity-0"}`}>
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-secondary transition-colors">
                {item.label}
              </Link>
            ))}
            <div className="flex items-center space-x-4">
              <Link href={routes.profile} className="p-2 text-gray-700 hover:text-secondary cursor-pointer transition-colors">
                <User className="h-6 w-6" />
              </Link>
            </div>
          </nav>
        </motion.div>

      </div>
    </motion.header>
  );
};

export default Navbar;
