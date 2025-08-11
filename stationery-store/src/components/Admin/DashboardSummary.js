'use client';

import React from 'react';
import { Package, ShoppingBag, FileText, Star } from 'lucide-react';

const DashboardSummary = () => {
  // Mock data - in a real app, this would come from an API
  const summaryData = [
    {
      title: 'Total Products',
      value: 124,
      icon: Package,
      color: 'bg-[#FFE8CD]',
      textColor: 'text-[#2f153c]',
      iconColor: 'text-[#2f153c]'
    },
    {
      title: 'Total Orders',
      value: 56,
      icon: ShoppingBag,
      color: 'bg-[#FFDCDC]',
      textColor: 'text-[#2f153c]',
      iconColor: 'text-[#2f153c]'
    },
    {
      title: 'Draft Products',
      value: 18,
      icon: FileText,
      color: 'bg-[#FFD6BA]',
      textColor: 'text-[#2f153c]',
      iconColor: 'text-[#2f153c]'
    },
    {
      title: 'Featured Products',
      value: 32,
      icon: Star,
      color: 'bg-[#FFF0E6]',
      textColor: 'text-[#2f153c]',
      iconColor: 'text-[#2f153c]'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {summaryData.map((item, index) => (
        <div 
          key={index}
          className={`${item.color} rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:scale-105`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-sm font-medium ${item.textColor}/70`}>{item.title}</p>
              <h3 className={`text-2xl font-bold mt-2 ${item.textColor}`}>{item.value}</h3>
            </div>
            <div className={`p-3 rounded-full ${item.color} ${item.iconColor}`}>
              <item.icon size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardSummary;