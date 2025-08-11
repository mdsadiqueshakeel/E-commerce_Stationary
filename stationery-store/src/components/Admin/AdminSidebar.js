'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingBag, Tag, Settings, ChevronRight, Menu, X } from 'lucide-react';

const AdminSidebar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Manage Products', href: '/admin/products', icon: Package },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Categories', href: '/admin/categories', icon: Tag },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="fixed bottom-4 right-4 md:hidden z-40">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-3 bg-[#2f153c] text-white rounded-full shadow-lg hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-200"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white shadow-md h-[calc(100vh-3.5rem)] sticky top-14">
        <div className="flex flex-col p-4 gap-2">
          {navigationItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive(item.href) 
                ? 'bg-[#FFE8CD] text-[#2f153c] font-semibold' 
                : 'text-[#2f153c]/80 hover:bg-[#FFE8CD]/50 hover:text-[#2f153c]'}`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
              {isActive(item.href) && <ChevronRight size={16} className="ml-auto" />}
            </Link>
          ))}
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <aside 
            className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col p-4 gap-2 mt-14">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive(item.href) 
                    ? 'bg-[#FFE8CD] text-[#2f153c] font-semibold' 
                    : 'text-[#2f153c]/80 hover:bg-[#FFE8CD]/50 hover:text-[#2f153c]'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                  {isActive(item.href) && <ChevronRight size={16} className="ml-auto" />}
                </Link>
              ))}
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;