import React from "react";
import Link from "next/link";

const OrderConfirmationHeader = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-2">
        <Link href="/" className="text-[#2f153c]/70 hover:text-[#2f153c] transition-colors">
          Home
        </Link>
        <span className="text-[#2f153c]/50">/</span>
         <Link href="/product" className="text-[#2f153c]/70 hover:text-[#2f153c] transition-colors">
          Products
        </Link>
        <span className="text-[#2f153c]/50">/</span>
        <span className="text-[#2f153c]">Order Confirmation</span>
      </div>
    </div>
  );
};

export default OrderConfirmationHeader;