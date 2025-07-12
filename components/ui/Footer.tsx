'use client';

import React from 'react';
import Link from 'next/link';
import { routes } from '@/app/lib/routes';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  ArrowUp,
  Heart
} from 'lucide-react';
import { Button } from './button';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', href: routes.about },
      { label: 'Contact', href: routes.contact },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' }
    ],
    support: [
      { label: 'Help Center', href: '/help' },
      { label: 'Returns', href: '/returns' },
      { label: 'Shipping', href: '/shipping' },
      { label: 'Size Guide', href: '/size-guide' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'GDPR', href: '/gdpr' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold text-gray-900">EStore</span>
            </div>
            <p className="text-gray-600 mb-6 max-w-md">
              Discover amazing products at unbeatable prices. We're committed to providing the best shopping experience with quality products and excellent customer service.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="h-4 w-4" />
                <span>support@estore.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>123 Main St, New York, NY 10001</span>
              </div>
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-[#7837ff] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-[#7837ff] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-[#7837ff] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Section
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <div className="max-w-md">
            <h3 className="font-semibold text-gray-900 mb-2">Stay Updated</h3>
            <p className="text-gray-600 mb-4">Subscribe to our newsletter for the latest updates and exclusive offers.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7837ff] focus:border-transparent"
              />
              <Button className="bg-[#7837ff] hover:bg-[#6636c7]">
                Subscribe
              </Button>
            </div>
          </div>
        </motion.div> */}
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-gray-600">
              <span>© {currentYear} EStore. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">Made with</span>
              <Heart className="h-4 w-4 text-red-500 hidden md:inline" />
              <span className="hidden md:inline">by EStore Team</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-600 hover:text-[#7837ff] hover:bg-[#7837ff]/10 rounded-lg transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* Back to Top */}
            <Button
              onClick={scrollToTop}
              variant="outline"
              size="sm"
              className="text-[#7837ff] border-[#7837ff] hover:bg-[#7837ff] hover:text-white"
            >
              <ArrowUp className="h-4 w-4 mr-2" />
              Back to Top
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 