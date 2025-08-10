import React from "react";

const OrderSummary = ({ orderItems, orderDetails, isLoading }) => {
  // Calculate order totals
  const calculateSubtotal = () => {
    return orderItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  const subtotal = isLoading ? 0 : calculateSubtotal();
  const tax = (subtotal * 0.08).toFixed(2); // Assuming 8% tax
  const shipping = 5.99;
  const total = (parseFloat(subtotal) + parseFloat(tax) + shipping).toFixed(2);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-[#FFdcdc] to-[#FFf2eb] backdrop-blur-sm rounded-xl shadow-md p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-6"></div>
        <div className="space-y-4 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-6 bg-gray-200 rounded w-full mt-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#FFdcdc] to-[#FFf2eb] backdrop-blur-sm rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-[#2f153c] mb-6">Order Summary</h2>
      
      {/* Order Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-white/50 rounded-lg">
        <div>
          <p className="text-sm text-[#2f153c]/70">Order ID</p>
          <p className="font-medium text-[#2f153c]">{orderDetails.orderId}</p>
        </div>
        <div>
          <p className="text-sm text-[#2f153c]/70">Payment Method</p>
          <p className="font-medium text-[#2f153c]">{orderDetails.paymentMethod}</p>
        </div>
        <div>
          <p className="text-sm text-[#2f153c]/70">Estimated Delivery</p>
          <p className="font-medium text-[#2f153c]">{orderDetails.estimatedDelivery}</p>
        </div>
      </div>
      
      {/* Order Items */}
      <div className="divide-y divide-gray-200 mb-6">
        {orderItems.map((item) => (
          <div key={item.id} className="py-4 flex items-start gap-4">
            <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-md font-semibold text-[#2f153c]">{item.name}</h3>
              <p className="text-sm text-[#2f153c]/70">{item.variant}</p>
              <div className="flex justify-between mt-1">
                <p className="text-sm text-[#2f153c]/70">Qty: {item.quantity}</p>
                <p className="text-md font-medium text-[#2f153c]">{item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Order Totals */}
      <div className="space-y-2 text-[#2f153c] border-t border-gray-200 pt-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;