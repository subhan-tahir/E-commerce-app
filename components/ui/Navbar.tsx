'use client';

import React, { useEffect, useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, Heart, LogOut } from 'lucide-react';
import Link from 'next/link';
import { routes } from '@/app/lib/routes';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Input } from "@/components/ui/input"
import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import NextAuth from 'next-auth';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { Button } from './button';
import { toast } from 'react-toastify';
import { Skeleton } from './skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import defaultAvatar from '@/public/auth/default-avatar.png';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const navigate = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    console.log('session...', session, status);
  }, [session]);
  //select item from slice
  const items = useSelector((state: RootState) => state.cart.items);
  const cartQuantity = useSelector((state: RootState) =>
    state.cart.items.reduce((acc, item) => acc + item.quantity, 0)
  );
  const wishlistItems = useSelector((state: RootState) => state.wishlist.wishlistItems);
  console.log('wishlist items',wishlistItems)
  const wishlistQuantity = useSelector((state: RootState) =>
    state.wishlist.wishlistItems.reduce((acc, item) => acc + item.quantity, 0)
  );
  // useEffect(() => {
  //   console.log(items);
  //   console.log('wishlistItems', wishlistItems);
  //   console.log('cartQuantity', cartQuantity);
  //   console.log('wishlistQuantity', wishlistQuantity);
  // }, [items, wishlistItems, cartQuantity, wishlistQuantity]);
  useEffect(() => {
    console.log('items', items.length);

  })
  const { scrollY } = useScroll();
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (scrollY.get() > 50) {
  //       setScrolled(true);
  //     } else {
  //       setScrolled(false);
  //     }
  //   };

  //   scrollY.on("change", handleScroll);

  //   return () => {
  //     scrollY.removeEventListener("change", handleScroll);
  //   };
  // }, [scrollY]);
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest as number > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });


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
  ];
  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: '/auth/login' });
      navigate.push('/auth/login');
      toast.success('Logged out successfully');
    }
    catch (error) {
      console.error('Logout error:', error);
    };
  }
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
          {/* <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                  type="text" placeholder="Search..." className="w-full rounded-full bg-gray-100 px-4 py-2 pl-10 focus:outline-none focus:bg-white" />

                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </form>
          </div> */}
          <div className="hidden md:flex flex-1 max-w-md justify-end">

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* Wishlist */}
              <Link href={routes.wishlist}>
                <button className="p-2 text-gray-700 hover:text-secondary cursor-pointer transition-colors relative">
                  <Heart className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistQuantity}
                  </span>
                </button>
              </Link>

              {/* Cart */}
              <Link href={routes.cart}>
                <button className="p-2 text-gray-700 hover:text-secondary cursor-pointer transition-colors relative">
                  <ShoppingCart className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 bg-secondary  text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartQuantity}
                  </span>
                </button>
              </Link>
              {/* User Menu */}
              {/* <Link href={routes.profile} className="p-2 text-gray-700 hover:text-secondary cursor-pointer transition-colors">
                <User className="h-6 w-6" />
              </Link> */}

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
            {/*login and register btns*/}
            {/* {status === 'loading' ? (
              <Skeleton className="h-10 w-24 bg-gray-200 rounded-full" />
            ) :

              status === 'authenticated' ? (
                <Link href={routes.login}>

                  <Button
                    onClick={handleLogout}
                    className="transition-colors bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full"
                  >
                    Logout
                  </Button>
                </Link>
              ) : (
                <div className="hidden md:flex items-center space-x-4">
                  <Link href={routes.login} className=" hover:text-scondary hover:bg-secondary transition-colors bg-primary text-white px-6 py-2 rounded-full">
                    Login
                  </Link>
                  <Link href={routes.register} className=" transition-colors hover:bg-secondary  hover:text-white border-primary border-2 px-6 py-2 rounded-full min-h-[26px]">
                    Register
                  </Link>
                </div>
              )} */}
            {/*profile dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {
                  status === 'loading' ? (
                    <Skeleton className="h-8 w-8 rounded-full bg-gray-200" />
                  ) : (
                    <Button variant="ghost" className="relative border-0 p-0 w-8 h-8 cursor-pointer hover:bg-transparent focus-visible:ring-0" >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={(session?.user?.profileImage || session?.user?.image) ?? undefined} alt="User Avatar" />
                        <AvatarFallback>{session?.user?.name?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                    </Button>
                  )
                }
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-62">
                <DropdownMenuItem>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={(session?.user?.profileImage || session?.user?.image) ?? undefined} alt="User Avatar" />
                    <AvatarFallback>{session?.user?.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm font-medium">{session?.user?.name || 'User'}</span>
                    <span className="text-xs text-gray-500">{session?.user?.email || 'User Email'}</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {
                    // I want to when user login with github so hide this profile link
                    session?.user?.profileImage ? (
                      <Link href={routes.profile} className="w-full flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Profile
                      </Link>
                    ) : (null)
                  }
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={routes.login} className="w-full flex items-center gap-2" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
