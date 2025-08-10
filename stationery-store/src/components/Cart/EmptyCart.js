import React from "react";
import Link from "next/link";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-40 h-40 mb-6 text-[#2f153c]/30">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-[#2f153c] mb-2">Your cart is empty</h2>
      <p className="text-[#2f153c]/70 mb-8 max-w-md">Looks like you haven't added any items to your cart yet. Explore our products and find something you'll love!</p>
      <Link href="/product" className="px-6 py-3 bg-[#2f153c] text-white font-semibold rounded-lg shadow-md hover:bg-[#FFD6BA] hover:text-[#2f153c] hover:scale-105 transition-all duration-300">
        Continue Shopping
      </Link>
    </div>
  );
};

export default EmptyCart;