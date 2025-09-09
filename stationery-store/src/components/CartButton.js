"use client";
import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart, updateCartItemQuantity } from '../utils/cartUtils';

const CartButton = () => {
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart items from localStorage
  useEffect(() => {
    const updateCartItems = () => {
      const items = getCart();
      setCartItems(items);
      
      // Calculate total quantity
      const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
      setQuantity(totalQuantity);
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

  const handleIncrement = (item) => {
    // Update the specific cart item quantity
    updateCartItemQuantity(item.id, item.quantity + 1, item.variant);
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      // Decrease the quantity
      updateCartItemQuantity(item.id, item.quantity - 1, item.variant);
    } else {
      // Remove the item if quantity would be 0
      updateCartItemQuantity(item.id, 0, item.variant);
    }
  };

  return (
    <div className="fixed top-16 right-4 z-40 flex flex-col items-end">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-3 bg-[#2f153c] text-white rounded-full shadow-lg hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-300"
        aria-label="View cart"
      >
        <ShoppingCart className="h-6 w-6" />
        {quantity > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#FFD6BA] text-[#2f153c] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {quantity}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="mt-2 bg-white rounded-lg shadow-xl p-4 w-64 animate-fadeIn">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-[#2f153c]">Cart</h3>
            <span className="text-sm text-[#2f153c]/70">{cartItems.length} items</span>
          </div>
          
          {cartItems.length > 0 ? (
            <>
              <div className="max-h-60 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-2 py-2 border-b border-gray-100">
                    <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-[#2f153c] line-clamp-1">{item.name}</p>
                      <p className="text-xs text-[#2f153c]/70">${parseFloat(item.price).toFixed(2)} × {item.quantity}</p>
                    </div>
                    <div className="flex items-center border  text-[#2f153c]/70 border-[#2f153c]/20 rounded">
                      <button 
                        onClick={() => handleDecrement(item)}
                        className="px-1 text-xs bg-gray-50 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs text-[#2f153c]">{item.quantity}</span>
                      <button 
                        onClick={() => handleIncrement(item)}
                        className="px-1 text-xs bg-gray-50 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-3 pt-2 border-t border-gray-100">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#2f153c]/70">Subtotal:</span>
                  <span className="font-medium text-[#2f153c]">
                    ${cartItems.reduce((sum, item) => {
                      const price = typeof item.price === 'string' ? parseFloat(item.price.replace('$', '')) : item.price;
                      return sum + (price * item.quantity);
                    }, 0).toFixed(2)}
                  </span>
                </div>
                
                <a 
                  href="/cart" 
                  className="block w-full text-center py-2 bg-[#2f153c] text-white rounded-lg text-sm font-medium hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-200"
                >
                  View Cart
                </a>
              </div>
            </>
          ) : (
            <div className="py-4 text-center">
              <p className="text-[#2f153c]/70 text-sm">Your cart is empty</p>
              <a 
                href="/product" 
                className="mt-2 inline-block text-[#2f153c] text-sm underline hover:text-[#FFD6BA]"
              >
                Continue shopping
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartButton;