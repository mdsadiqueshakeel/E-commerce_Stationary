'use client';

import React, { useState, useEffect } from 'react';
import { Search, Eye, ChevronDown, X, Truck, Package, CreditCard, MapPin, User, Calendar, DollarSign } from 'lucide-react';

export default function OrdersPage() {
  // State for orders
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Mock order data
  useEffect(() => {
    // In a real app, this would be an API call
    const mockOrders = [
      {
        id: 'ORD-5123',
        customer: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+1 (555) 123-4567',
          address: '123 Main St, Anytown, CA 94538'
        },
        date: '2023-06-15',
        amount: 124.00,
        paymentMethod: 'Credit Card',
        status: 'Delivered',
        items: [
          { id: 1, name: 'Premium Notebook', quantity: 2, price: 12.99, total: 25.98 },
          { id: 4, name: 'Fountain Pen', quantity: 1, price: 18.50, total: 18.50 },
          { id: 5, name: 'Sticky Notes Pack', quantity: 3, price: 5.99, total: 17.97 }
        ]
      },
      {
        id: 'ORD-5122',
        customer: {
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          phone: '+1 (555) 987-6543',
          address: '456 Oak Ave, Springfield, IL 62701'
        },
        date: '2023-06-14',
        amount: 86.50,
        paymentMethod: 'PayPal',
        status: 'Shipped',
        items: [
          { id: 2, name: 'Colored Pencil Set', quantity: 1, price: 8.99, total: 8.99 },
          { id: 3, name: 'Desk Organizer', quantity: 1, price: 24.99, total: 24.99 }
        ]
      },
      {
        id: 'ORD-5121',
        customer: {
          name: 'Robert Johnson',
          email: 'robert.johnson@example.com',
          phone: '+1 (555) 456-7890',
          address: '789 Pine Rd, Lakeside, WA 98033'
        },
        date: '2023-06-14',
        amount: 212.75,
        paymentMethod: 'Credit Card',
        status: 'Delivered',
        items: [
          { id: 6, name: 'Leather Journal', quantity: 2, price: 29.99, total: 59.98 },
          { id: 7, name: 'Watercolor Set', quantity: 1, price: 15.99, total: 15.99 },
          { id: 4, name: 'Fountain Pen', quantity: 2, price: 18.50, total: 37.00 }
        ]
      },
      {
        id: 'ORD-5120',
        customer: {
          name: 'Emily Davis',
          email: 'emily.davis@example.com',
          phone: '+1 (555) 234-5678',
          address: '321 Maple Dr, Hillcrest, NY 10023'
        },
        date: '2023-06-13',
        amount: 45.25,
        paymentMethod: 'PayPal',
        status: 'Pending',
        items: [
          { id: 5, name: 'Sticky Notes Pack', quantity: 2, price: 5.99, total: 11.98 },
          { id: 1, name: 'Premium Notebook', quantity: 1, price: 12.99, total: 12.99 }
        ]
      },
      {
        id: 'ORD-5119',
        customer: {
          name: 'Michael Wilson',
          email: 'michael.wilson@example.com',
          phone: '+1 (555) 876-5432',
          address: '654 Cedar Ln, Riverdale, TX 75001'
        },
        date: '2023-06-12',
        amount: 98.00,
        paymentMethod: 'Credit Card',
        status: 'Delivered',
        items: [
          { id: 3, name: 'Desk Organizer', quantity: 1, price: 24.99, total: 24.99 },
          { id: 2, name: 'Colored Pencil Set', quantity: 2, price: 8.99, total: 17.98 }
        ]
      },
      {
        id: 'ORD-5118',
        customer: {
          name: 'Sarah Brown',
          email: 'sarah.brown@example.com',
          phone: '+1 (555) 345-6789',
          address: '987 Elm St, Oakwood, GA 30566'
        },
        date: '2023-06-11',
        amount: 156.75,
        paymentMethod: 'PayPal',
        status: 'Cancelled',
        items: [
          { id: 6, name: 'Leather Journal', quantity: 1, price: 29.99, total: 29.99 },
          { id: 4, name: 'Fountain Pen', quantity: 1, price: 18.50, total: 18.50 }
        ]
      },
      {
        id: 'ORD-5117',
        customer: {
          name: 'David Miller',
          email: 'david.miller@example.com',
          phone: '+1 (555) 567-8901',
          address: '753 Birch Ave, Westfield, FL 33919'
        },
        date: '2023-06-10',
        amount: 74.95,
        paymentMethod: 'Credit Card',
        status: 'Shipped',
        items: [
          { id: 7, name: 'Watercolor Set', quantity: 1, price: 15.99, total: 15.99 },
          { id: 5, name: 'Sticky Notes Pack', quantity: 3, price: 5.99, total: 17.97 }
        ]
      }
    ];
    
    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  }, []);
  
  // Filter orders based on status
  useEffect(() => {
    if (currentFilter === 'All') {
      setFilteredOrders(orders.filter(order => 
        order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    } else {
      setFilteredOrders(orders.filter(order => 
        order.status === currentFilter && 
        (order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase()))
      ));
    }
    setCurrentPage(1); // Reset to first page when filter changes
  }, [currentFilter, orders, searchQuery]);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Open modal to view order details
  const handleViewOrder = (order) => {
    setCurrentOrder(order);
    setIsModalOpen(true);
  };
  
  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === id ? {...order, status: newStatus} : order
    );
    setOrders(updatedOrders);
  };
  
  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl md:text-3xl font-bold text-[#2f153c]">Orders Management</h1>
      
      {/* Filter and Search */}
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-6">
          {/* Filter tabs */}
          <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
            {['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'].map((filter) => (
              <button
                key={filter}
                onClick={() => setCurrentFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${currentFilter === filter 
                  ? 'bg-[#FFE8CD] text-[#2f153c]' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {filter}
              </button>
            ))}
          </div>
          
          {/* Search */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
        
        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-[#2f153c]/70 uppercase tracking-wider">Order ID</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-[#2f153c]/70 uppercase tracking-wider">Customer</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-[#2f153c]/70 uppercase tracking-wider">Date</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-[#2f153c]/70 uppercase tracking-wider">Total</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-[#2f153c]/70 uppercase tracking-wider">Payment</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-[#2f153c]/70 uppercase tracking-wider">Status</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-[#2f153c]/70 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {currentItems.length > 0 ? (
                currentItems.map((order) => (
                  <tr key={order.id} className="hover:bg-[#FFE8CD]/30 transition-colors duration-150">
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-[#2f153c]">{order.id}</div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="text-sm text-[#2f153c]">{order.customer.name}</div>
                      <div className="text-xs text-[#2f153c]/60">{order.customer.email}</div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="text-sm text-[#2f153c]">{order.date}</div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="text-sm text-[#2f153c]">${order.amount.toFixed(2)}</div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="text-sm text-[#2f153c]">{order.paymentMethod}</div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => handleViewOrder(order)}
                          className="text-[#2f153c]/70 hover:text-[#2f153c] transition-colors duration-200"
                          aria-label="View order details"
                        >
                          <Eye size={16} />
                        </button>
                        <div className="relative group">
                          <button 
                            className="text-[#2f153c]/70 hover:text-[#2f153c] transition-colors duration-200"
                            aria-label="Update order status"
                          >
                            <ChevronDown size={16} />
                          </button>
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                            {order.status !== 'Pending' && (
                              <button 
                                onClick={() => handleStatusChange(order.id, 'Pending')}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#FFE8CD]/50 transition-colors duration-200"
                              >
                                Set as Pending
                              </button>
                            )}
                            {order.status !== 'Shipped' && (
                              <button 
                                onClick={() => handleStatusChange(order.id, 'Shipped')}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#FFE8CD]/50 transition-colors duration-200"
                              >
                                Set as Shipped
                              </button>
                            )}
                            {order.status !== 'Delivered' && (
                              <button 
                                onClick={() => handleStatusChange(order.id, 'Delivered')}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#FFE8CD]/50 transition-colors duration-200"
                              >
                                Set as Delivered
                              </button>
                            )}
                            {order.status !== 'Cancelled' && (
                              <button 
                                onClick={() => handleStatusChange(order.id, 'Cancelled')}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#FFE8CD]/50 transition-colors duration-200"
                              >
                                Set as Cancelled
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-3 py-4 text-center text-sm text-gray-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 px-3 py-4 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                  <span className="font-medium">
                    {indexOfLastItem > filteredOrders.length ? filteredOrders.length : indexOfLastItem}
                  </span>{' '}
                  of <span className="font-medium">{filteredOrders.length}</span> results
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button
                    onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === number 
                        ? 'z-10 bg-[#FFE8CD] text-[#2f153c] focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f153c]' 
                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'}`}
                    >
                      {number}
                    </button>
                  ))}
                  <button
                    onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
            <div className="flex sm:hidden justify-between w-full">
              <button
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${currentPage === 1 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-[#2f153c] hover:bg-[#FFE8CD]/50'}`}
              >
                Previous
              </button>
              <button
                onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${currentPage === totalPages 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-[#2f153c] hover:bg-[#FFE8CD]/50'}`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Order Details Modal */}
      {isModalOpen && currentOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-[#2f153c]">
                Order Details - {currentOrder.id}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Order Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#FFE8CD]/30 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar size={18} className="text-[#2f153c]" />
                    <h3 className="font-medium text-[#2f153c]">Order Date</h3>
                  </div>
                  <p className="text-[#2f153c]/80">{currentOrder.date}</p>
                </div>
                
                <div className="bg-[#FFDCDC]/30 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign size={18} className="text-[#2f153c]" />
                    <h3 className="font-medium text-[#2f153c]">Total Amount</h3>
                  </div>
                  <p className="text-[#2f153c]/80">${currentOrder.amount.toFixed(2)}</p>
                </div>
                
                <div className="bg-[#FFD6BA]/30 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CreditCard size={18} className="text-[#2f153c]" />
                    <h3 className="font-medium text-[#2f153c]">Payment Method</h3>
                  </div>
                  <p className="text-[#2f153c]/80">{currentOrder.paymentMethod}</p>
                </div>
              </div>
              
              {/* Status */}
              <div className="flex items-center space-x-3">
                <h3 className="font-medium text-[#2f153c]">Status:</h3>
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(currentOrder.status)}`}>
                  {currentOrder.status}
                </span>
                <div className="relative ml-auto">
                  <select
                    value={currentOrder.status}
                    onChange={(e) => handleStatusChange(currentOrder.id, e.target.value)}
                    className="pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              
              {/* Customer Information */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-[#2f153c] mb-4 flex items-center">
                  <User size={18} className="mr-2" /> Customer Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-[#2f153c]/80">Name</p>
                    <p className="text-[#2f153c]">{currentOrder.customer.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#2f153c]/80">Email</p>
                    <p className="text-[#2f153c]">{currentOrder.customer.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#2f153c]/80">Phone</p>
                    <p className="text-[#2f153c]">{currentOrder.customer.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#2f153c]/80">Shipping Address</p>
                    <p className="text-[#2f153c]">{currentOrder.customer.address}</p>
                  </div>
                </div>
              </div>
              
              {/* Order Items */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-[#2f153c] mb-4 flex items-center">
                  <Package size={18} className="mr-2" /> Order Items
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-3 py-3 text-left text-xs font-medium text-[#2f153c]/70 uppercase tracking-wider">Product</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-[#2f153c]/70 uppercase tracking-wider">Price</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-[#2f153c]/70 uppercase tracking-wider">Quantity</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-[#2f153c]/70 uppercase tracking-wider">Total</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {currentOrder.items.map((item) => (
                        <tr key={item.id} className="hover:bg-[#FFE8CD]/30 transition-colors duration-150">
                          <td className="px-3 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-[#2f153c]">{item.name}</div>
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <div className="text-sm text-[#2f153c]">${item.price.toFixed(2)}</div>
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <div className="text-sm text-[#2f153c]">{item.quantity}</div>
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-[#2f153c]">${item.total.toFixed(2)}</div>
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50">
                        <td colSpan="3" className="px-3 py-4 text-right font-medium text-[#2f153c]">
                          Subtotal:
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap font-medium text-[#2f153c]">
                          ${currentOrder.items.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td colSpan="3" className="px-3 py-4 text-right font-medium text-[#2f153c]">
                          Shipping:
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap font-medium text-[#2f153c]">
                          $5.00
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td colSpan="3" className="px-3 py-4 text-right font-medium text-[#2f153c]">
                          Total:
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap font-medium text-[#2f153c]">
                          ${currentOrder.amount.toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 p-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}