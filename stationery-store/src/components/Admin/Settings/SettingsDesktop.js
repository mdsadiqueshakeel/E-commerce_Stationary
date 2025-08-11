'use client';

import React, { useState } from 'react';
import { Upload, Store, CreditCard, Truck, Save } from 'lucide-react';

export default function SettingsPage() {
  // State for form data
  const [formData, setFormData] = useState({
    // Store Info
    storeName: 'Stationery Store',
    logo: '',
    email: 'contact@stationerystore.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Anytown, CA 94538',
    
    // Payment Settings
    razorpayKey: '',
    razorpaySecret: '',
    
    // Shipping Settings
    flatRate: 5.00,
    freeShippingThreshold: 50.00
  });
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) : value
    });
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would save to a database or API
    alert('Settings saved successfully!');
    console.log('Settings saved:', formData);
  };
  
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl md:text-3xl font-bold text-[#2f153c]">Admin Settings</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Store Info Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Store size={20} className="text-[#2f153c]" />
            <h2 className="text-xl font-semibold text-[#2f153c]">Store Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="storeName" className="block text-sm font-medium text-[#2f153c]/80 mb-1">
                Store Name *
              </label>
              <input
                type="text"
                id="storeName"
                name="storeName"
                value={formData.storeName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
              />
            </div>
            
            <div>
              <label htmlFor="logo" className="block text-sm font-medium text-[#2f153c]/80 mb-1">
                Store Logo
              </label>
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-300">
                  {formData.logo ? (
                    <img 
                      src={formData.logo} 
                      alt="Store logo" 
                      className="h-full w-full object-cover" 
                    />
                  ) : (
                    <Upload className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    id="logo"
                    name="logo"
                    value={formData.logo}
                    onChange={handleChange}
                    placeholder="Enter logo URL"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter a URL or upload an image (upload functionality would be implemented in a real app)</p>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#2f153c]/80 mb-1">
                Contact Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[#2f153c]/80 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-[#2f153c]/80 mb-1">
                Store Address *
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
              ></textarea>
            </div>
          </div>
        </div>
        
        {/* Payment Settings Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-2 mb-6">
            <CreditCard size={20} className="text-[#2f153c]" />
            <h2 className="text-xl font-semibold text-[#2f153c]">Payment Settings</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="razorpayKey" className="block text-sm font-medium text-[#2f153c]/80 mb-1">
                Razorpay API Key
              </label>
              <input
                type="text"
                id="razorpayKey"
                name="razorpayKey"
                value={formData.razorpayKey}
                onChange={handleChange}
                placeholder="Enter your Razorpay API key"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
              />
            </div>
            
            <div>
              <label htmlFor="razorpaySecret" className="block text-sm font-medium text-[#2f153c]/80 mb-1">
                Razorpay API Secret
              </label>
              <input
                type="password"
                id="razorpaySecret"
                name="razorpaySecret"
                value={formData.razorpaySecret}
                onChange={handleChange}
                placeholder="Enter your Razorpay API secret"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
              />
            </div>
            
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500 italic">
                Note: In a production environment, API keys and secrets should be stored securely on the server side.
              </p>
            </div>
          </div>
        </div>
        
        {/* Shipping Settings Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Truck size={20} className="text-[#2f153c]" />
            <h2 className="text-xl font-semibold text-[#2f153c]">Shipping Settings</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="flatRate" className="block text-sm font-medium text-[#2f153c]/80 mb-1">
                Flat Rate Shipping ($) *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                <input
                  type="number"
                  id="flatRate"
                  name="flatRate"
                  value={formData.flatRate}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="freeShippingThreshold" className="block text-sm font-medium text-[#2f153c]/80 mb-1">
                Free Shipping Threshold ($) *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                <input
                  type="number"
                  id="freeShippingThreshold"
                  name="freeShippingThreshold"
                  value={formData.freeShippingThreshold}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Orders above this amount will qualify for free shipping</p>
            </div>
          </div>
        </div>
        
        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-3 bg-[#2f153c] text-white rounded-lg hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-200"
          >
            <Save size={18} />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}