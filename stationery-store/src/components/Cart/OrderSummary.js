import React from "react";
import Link from "next/link";

const OrderSummary = ({ subtotal, tax, total }) => {
  return (
    <div className="lg:col-span-1 bg-gradient-to-br from-[#FFdcdc] to-[#FFf2eb] backdrop-blur-sm rounded-xl shadow-md p-6 h-fit sticky top-24">
      <h2 className="text-xl font-bold text-[#2f153c] mb-4">Order Summary</h2>
      
      <div className="flex flex-col text-[#2f153c]/90 gap-3 mb-6">
        <div className="flex justify-between">
          <span className="text-[#2f153c]/70">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex  justify-between">
          <span className="">Tax (8%)</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        <div className="h-px bg-gray-200 my-2"></div>
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${total.toFixed(2)}</span>
        </div>
      </div>
      
      <Link 
        href="/checkout" 
        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#2f153c] text-white rounded-lg hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-200 font-medium"
      >
        Proceed to Checkout
      </Link>
      
      <div className="mt-6">
        <Link 
          href="/product" 
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#2f153c] text-[#2f153c] rounded-lg hover:bg-[#FFE8CD]/70 transition-all duration-200 font-medium"
        >
          Continue Shopping
        </Link>
      </div>
      
      <p className="text-xs text-[#2f153c]/60 text-center mt-4">
        Free shipping on orders over $50
      </p>
    </div>
  );
};

export default OrderSummary;