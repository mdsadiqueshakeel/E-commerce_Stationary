'use client';

import React from 'react';
import Link from 'next/link';

const RecentOrders = () => {
  // Mock data - in a real app, this would come from an API
  const recentOrders = [
    {
      id: 'ORD-5123',
      customer: 'John Doe',
      date: '2023-06-15',
      amount: '$124.00',
      status: 'Completed'
    },
    {
      id: 'ORD-5122',
      customer: 'Jane Smith',
      date: '2023-06-14',
      amount: '$86.50',
      status: 'Processing'
    },
    {
      id: 'ORD-5121',
      customer: 'Robert Johnson',
      date: '2023-06-14',
      amount: '$212.75',
      status: 'Completed'
    },
    {
      id: 'ORD-5120',
      customer: 'Emily Davis',
      date: '2023-06-13',
      amount: '$45.25',
      status: 'Shipped'
    },
    {
      id: 'ORD-5119',
      customer: 'Michael Wilson',
      date: '2023-06-12',
      amount: '$98.00',
      status: 'Completed'
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-[#2f153c]/70 uppercase tracking-wider">Order</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-[#2f153c]/70 uppercase tracking-wider">Customer</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-[#2f153c]/70 uppercase tracking-wider">Status</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-[#2f153c]/70 uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {recentOrders.map((order) => (
              <tr key={order.id} className="hover:bg-[#FFE8CD]/30 transition-colors duration-150">
                <td className="px-3 py-3 whitespace-nowrap">
                  <Link href={`/admin/orders/${order.id}`} className="text-sm font-medium text-[#2f153c] hover:underline">
                    {order.id}
                  </Link>
                  <div className="text-xs text-[#2f153c]/60">{order.date}</div>
                </td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <div className="text-sm text-[#2f153c]">{order.customer}</div>
                </td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-[#2f153c]">
                  {order.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-center">
        <Link 
          href="/admin/orders" 
          className="text-sm font-medium text-[#2f153c] hover:text-[#2f153c]/70 hover:underline"
        >
          View All Orders
        </Link>
      </div>
    </div>
  );
};

export default RecentOrders;