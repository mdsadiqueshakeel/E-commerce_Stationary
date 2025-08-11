'use client';

import React from 'react';
import DashboardSummary from '../../components/Admin/DashboardSummary';
import SalesChart from '../../components/Admin/SalesChart';
import RecentOrders from '../../components/Admin/RecentOrders';

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl md:text-3xl font-bold text-[#2f153c]">Dashboard Overview</h1>
      
      <DashboardSummary />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-4 md:p-6">
          <h2 className="text-xl font-semibold text-[#2f153c] mb-4">Sales Last 7 Days</h2>
          <SalesChart />
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
          <h2 className="text-xl font-semibold text-[#2f153c] mb-4">Recent Orders</h2>
          <RecentOrders />
        </div>
      </div>
    </div>
  );
}