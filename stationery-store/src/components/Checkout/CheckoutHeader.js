import React from "react";
import Link from "next/link";

const CheckoutHeader = () => {
  return (
    <div className="max-w-7xl mx-auto mb-8">
      <h1 className="text-3xl font-bold text-[#2f153c] mb-2">Checkout</h1>
      <div className="flex items-center text-sm text-[#2f153c]/70">
        <Link href="/" className="hover:text-[#2f153c] transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/cart" className="hover:text-[#2f153c] transition-colors">
          Cart
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[#2f153c]">Checkout</span>
      </div>
    </div>
  );
};

export default CheckoutHeader;