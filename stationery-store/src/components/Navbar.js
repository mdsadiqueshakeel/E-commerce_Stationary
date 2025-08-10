"use client"; // This is the fix for the error. It marks the component for client-side rendering.

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart } from "lucide-react";
import { getCart } from "../utils/cartUtils";

// --- Reusable SVG Logo ---
// Replaced the complex, multi-image logo with a single, clean SVG.
const Logo = () => (
  <svg
    className="h-8 w-auto text-gray-800"
    viewBox="0 0 84 36"
    fill="currentColor"
    aria-label="Company Logo"
  >
    {/* This is a placeholder SVG path. Replace with your actual logo's path data if you have it. */}
    <path d="M22.1,29.5H17.6V13.7h4.5V29.5z M19.8,11.7c-1.4,0-2.6-1.2-2.6-2.6s1.2-2.6,2.6-2.6s2.6,1.2,2.6,2.6S21.2,11.7,19.8,11.7z"></path>
    <path d="M32.1,29.5h-4.5V13.7h4.5V29.5z"></path>
    <path d="M44.3,29.5h-4.5V13.7h4.5V29.5z"></path>
    <path d="M57.5,29.5h-4.5l-4.5-7.8V29.5h-4.5V13.7h4.5l4.5,7.8V13.7h4.5V29.5z"></path>
  </svg>
);

// --- Main Navigation Bar Component ---
const NavigationBarSection = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from localStorage
  useEffect(() => {
    const updateCartItems = () => {
      const items = getCart();
      setCartItems(items);
    };

    // Initial load
    updateCartItems();

    // Listen for storage events to update cart count when cart changes
    window.addEventListener('storage', updateCartItems);
    
    // Custom event for cart updates within the same window
    window.addEventListener('cartUpdated', updateCartItems);

    return () => {
      window.removeEventListener('storage', updateCartItems);
      window.removeEventListener('cartUpdated', updateCartItems);
    };
  }, []);

  const navigationItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/product" },
    { label: "Categories", href: "/categories" },
  ];

  return (
    <nav
      className="bg-[#FFDCDC] backdrop-blur-md shadow-sm fixed top-0 z-50 w-full"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-14">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" aria-label="Company logo - Go to homepage">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-semibold text-[#2f153c] hover:text-[#2f153c] hover:bg-[#FFE8CD]/70 px-3 py-2 rounded-md transition-all duration-200 hover:scale-105"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Cart Icon and Login Button */}
          <div className="hidden md:flex md:items-center md:gap-4">
            {cartItems.length > 0 && (
              <Link 
                href="/cart" 
                className="relative p-2 hover:bg-[#FFE8CD]/70 rounded-full transition-all duration-200"
                aria-label={`View cart with ${cartItems.length} items`}
              >
                <ShoppingCart className="h-5 w-5 text-[#2f153c]" />
                <span className="absolute -top-1 -right-1 bg-[#2f153c] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              </Link>
            )}
            <Link
              href="/login"
              className="px-5 py-2 bg-[#2f153c] text-white font-semibold rounded-lg shadow-sm hover:bg-[#FFD6BA] hover:text-[#2f153c] hover:scale-105 transition-all duration-300"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#2f153c] hover:text-[#2f153c] hover:bg-[#FFE8CD]/70 focus:outline-none focus:ring-2 focus:ring-[#FFD6BA] transition-all duration-200 hover:scale-105"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">
                {isMobileMenuOpen ? "Close menu" : "Open menu"}
              </span>
              {isMobileMenuOpen ? (
                <X className="block h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-[#FFF2EB] to-[#FFD6BA] backdrop-blur-md shadow-md transition-all duration-300 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`} 
        id="mobile-menu"
      >
        <div className="px-4 pt-2 pb-4 space-y-2">
          {navigationItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block px-4 py-3 rounded-md text-base font-medium text-[#2f153c] hover:text-[#2f153c] hover:bg-[#FFE8CD]/70 transition-all duration-200 active:bg-[#FFE8CD] hover:scale-105"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {cartItems.length > 0 && (
            <Link
              href="/cart"
              className="flex items-center justify-between px-4 py-3 rounded-md text-base font-medium text-[#2f153c] hover:text-[#2f153c] hover:bg-[#FFE8CD]/70 transition-all duration-200 active:bg-[#FFE8CD] hover:scale-105"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Cart
              </span>
              <span className="bg-[#2f153c] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            </Link>
          )}
          <Link
            href="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full text-left px-4 py-3 mt-2 rounded-md text-base font-medium text-white bg-[#2f153c] hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-200 hover:scale-105"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBarSection;
