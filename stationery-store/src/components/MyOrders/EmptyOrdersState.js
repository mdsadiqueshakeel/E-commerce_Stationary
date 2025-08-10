import React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

const EmptyOrdersState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-[#FFdcdc]/30 p-6 rounded-full mb-6">
        <ShoppingBag size={64} className="text-[#2f153c]/70" />
      </div>
      <h2 className="text-2xl font-bold text-[#2f153c] mb-2">No Orders Yet</h2>
      <p className="text-[#2f153c]/70 max-w-md mb-8">
        You haven't placed any orders yet. Start shopping and your orders will appear here.
      </p>
      <Link href="/">
        <button className="bg-[#2f153c] hover:bg-[#2f153c]/90 text-white font-medium py-3 px-6 rounded-lg transition-colors">
          Start Shopping
        </button>
      </Link>
    </div>
  );
};

export default EmptyOrdersState;