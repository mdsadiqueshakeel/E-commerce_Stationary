import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

const OrderCard = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Status badge colors
  const statusColors = {
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-yellow-100 text-yellow-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800"
  };

  return (
    <div className="bg-gradient-to-br from-[#FFdcdc] to-[#FFf2eb] backdrop-blur-sm rounded-xl shadow-md p-6 mb-6 transition-all">
      {/* Order Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-[#2f153c]">
            Order #{order.orderId}
          </h3>
          <p className="text-sm text-[#2f153c]/70">{order.orderDate}</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mt-2 md:mt-0">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status.toLowerCase()]}`}>
            {order.status}
          </span>
          <span className="font-semibold text-[#2f153c]">${order.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center text-sm text-[#2f153c]/70 hover:text-[#2f153c] transition-colors mb-4"
      >
        {isExpanded ? (
          <>
            <span>Hide Details</span>
            <ChevronUp size={16} className="ml-1" />
          </>
        ) : (
          <>
            <span>View Details</span>
            <ChevronDown size={16} className="ml-1" />
          </>
        )}
      </button>

      {/* Order Details (Expandable) */}
      {isExpanded && (
        <div className="mt-4 space-y-4">
          {/* Order Items */}
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 bg-white/50 p-3 rounded-lg">
                <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-medium text-[#2f153c]">{item.name}</h4>
                  <p className="text-xs text-[#2f153c]/70">{item.variant}</p>
                </div>
                <div className="text-sm text-[#2f153c]">
                  Qty: {item.quantity}
                </div>
              </div>
            ))}
          </div>

          {/* Shipping Address */}
          <div className="bg-white/50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-[#2f153c] mb-2">Shipping Address</h4>
            <p className="text-sm text-[#2f153c]/70">{order.shippingAddress}</p>
          </div>

          {/* Track Order Button */}
          <div className="pt-2">
            <Link href={`/track-order/${order.orderId}`} className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-[#2f153c] hover:bg-[#2f153c]/90 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                Track Order
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;