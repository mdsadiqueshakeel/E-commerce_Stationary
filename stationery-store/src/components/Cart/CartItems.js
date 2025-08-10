"use client";

import React from "react";
import { Trash2 } from "lucide-react";

const CartItems = ({ cartItems, updateQuantity, removeItem }) => {
  // Animation classes for items
  const itemEnterClass = "animate-fadeIn";
  
  return (
    <div className="lg:col-span-2 bg-gradient-to-br from-[#FFdcdc] to-[#FFf2eb] backdrop-blur-sm rounded-xl shadow-md p-6">
      <div className="flex flex-col divide-y text-[#2f153c]/100 divide-gray-200">
        {cartItems.map((item) => (
          <div 
            key={item.id} 
            id={`cart-item-${item.id}`}
            className={`py-6 flex flex-row sm:flex-row gap-4 ${itemEnterClass}`}
          >
            {/* Product Image */}
            <div className="flex-shrink-0 w-1/4 sm:w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Product Details */}
            <div className="flex flex-col sm:flex-row flex-grow gap-4">
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-[#2f153c]">{item.name}</h3>
                <p className="text-sm text-[#2f153c]/70">{item.variant}</p>
                <p className="text-base font-bold text-[#2f153c] mt-1">{item.price}</p>
              </div>
              
              {/* Quantity Controls */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#2f153c]/50 rounded-lg overflow-hidden">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-0.75 py-0.25 bg-gray-100 hover:bg-gray-200 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-1 py-0.25 text-center min-w-[2.5rem]">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-0.75 py-0.25 bg-gray-100 hover:bg-gray-200 transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                
                {/* Remove Button */}
                <button 
                  onClick={() => removeItem(item.id)}
                  className="text-[#2f153c]/70 hover:text-red-500 transition-colors p-1"
                  aria-label="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItems;