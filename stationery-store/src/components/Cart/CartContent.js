"use client";

import React, { useState, useEffect } from "react";
import CartHeader from "./CartHeader";
import CartItems from "./CartItems";
import OrderSummary from "./OrderSummary";
import EmptyCart from "./EmptyCart";

const CartContent = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  
  // Animation class for item exit
  const itemExitClass = "animate-fadeOut";
  
  useEffect(() => {
    // Load cart items from localStorage
    const loadCartItems = () => {
      setIsLoading(true);
      try {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart);
          setCartItems(parsedCart);
        }
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCartItems();
  }, []);
  
  useEffect(() => {
    // Calculate totals whenever cart items change
    const calculateTotals = () => {
      const itemSubtotal = cartItems.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('$', ''));
        return sum + (price * item.quantity);
      }, 0);
      
      const taxAmount = itemSubtotal * 0.08; // 8% tax rate
      const totalAmount = itemSubtotal + taxAmount;
      
      setSubtotal(itemSubtotal);
      setTax(taxAmount);
      setTotal(totalAmount);
    };
    
    calculateTotals();
  }, [cartItems]);
  
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  
  const removeItem = (itemId) => {
    const itemToRemove = document.getElementById(`cart-item-${itemId}`);
    if (itemToRemove) {
      itemToRemove.classList.add(itemExitClass);
      
      // Wait for animation to complete before removing from state
      setTimeout(() => {
        const updatedCart = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }, 300); // Match this with the animation duration
    }
  };

  return (
    <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8   w-full bg-gradient-to-br from-[#FFF2EB] to-[#FFCDCD]">
      <CartHeader />
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2f153c]"></div>
        </div>
      ) : cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <CartItems 
            cartItems={cartItems} 
            updateQuantity={updateQuantity} 
            removeItem={removeItem} 
          />
          <OrderSummary 
            subtotal={subtotal} 
            tax={tax} 
            total={total} 
          />
        </div>
      )}
    </main>
  );
};

export default CartContent;