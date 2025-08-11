'use client';

import React from 'react';
import Link from 'next/link';
import { LogOut } from 'lucide-react';

// Reusing the same Logo component from the main Navbar
const Logo = () => (
  <svg
    className="h-8 w-auto text-gray-800"
    viewBox="0 0 84 36"
    fill="currentColor"
    aria-label="Company Logo"
  >
    <path d="M22.1,29.5H17.6V13.7h4.5V29.5z M19.8,11.7c-1.4,0-2.6-1.2-2.6-2.6s1.2-2.6,2.6-2.6s2.6,1.2,2.6,2.6S21.2,11.7,19.8,11.7z"></path>
    <path d="M32.1,29.5h-4.5V13.7h4.5V29.5z"></path>
    <path d="M44.3,29.5h-4.5V13.7h4.5V29.5z"></path>
    <path d="M57.5,29.5h-4.5l-4.5-7.8V29.5h-4.5V13.7h4.5l4.5,7.8V13.7h4.5V29.5z"></path>
  </svg>
);

const AdminNavbar = () => {
  const handleLogout = () => {
    // Implement logout functionality
    window.location.href = '/';
  };

  return (
    <nav
      className="bg-[#FFDCDC] backdrop-blur-md shadow-sm fixed top-0 z-50 w-full"
      role="navigation"
      aria-label="Admin navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-14">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/admin" aria-label="Admin Dashboard">
              <Logo />
            </Link>
          </div>

          {/* Welcome Text */}
          <div className="hidden md:block">
            <h1 className="font-semibold text-[#2f153c]">Welcome Admin</h1>
          </div>

          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[#2f153c] text-white rounded-lg text-sm font-medium hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-200"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;