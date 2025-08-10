import React from "react";
import Link from "next/link";

const OrderSummaryCheckout = ({
  cartItems,
  subtotal,
  tax,
  shipping,
  discount,
  total,
  paymentMethod,
  onPaymentMethodChange,
  onPlaceOrder,
  isMobile
}) => {
  return (
    <div className="bg-gradient-to-br from-[#FFdcdc] to-[#FFf2eb] backdrop-blur-sm rounded-xl shadow-md p-6 h-fit sticky top-24">
      <h2 className="text-xl font-bold text-[#2f153c] mb-4">Order Summary</h2>
      
      {/* Cart Items Summary */}
      <div className="mb-6">
        <div className="max-h-60 overflow-y-auto pr-2 mb-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center py-2 border-b border-[#2f153c]/10 last:border-0">
              <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-3 flex-grow">
                <h4 className="text-sm font-medium text-[#2f153c] line-clamp-1">{item.name}</h4>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-[#2f153c]/70">Qty: {item.quantity}</span>
                  <span className="text-sm font-medium text-[#2f153c]">{item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Price Details */}
      <div className="flex flex-col text-[#2f153c]/90 gap-3 mb-6">
        <div className="flex justify-between">
          <span className="text-[#2f153c]/70">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span className="font-medium">-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Tax (8%)</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        <div className="h-px bg-gray-200 my-2"></div>
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${total.toFixed(2)}</span>
        </div>
      </div>
      
      {/* Payment Methods - Only show on desktop */}
      {!isMobile && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-[#2f153c] mb-4">Payment Method</h3>
          
          <div className="space-y-3">
            <label className="flex items-center space-x-3 p-3 border border-[#2f153c]/20 rounded-lg cursor-pointer hover:bg-[#FFE8CD]/30 transition-all">
              <input
                type="radio"
                name="payment-method"
                value="razorpay"
                checked={paymentMethod === "razorpay"}
                onChange={() => onPaymentMethodChange("razorpay")}
                className="h-4 w-4 text-[#2f153c] focus:ring-[#FFD6BA]"
              />
              <span className="text-[#2f153c] font-medium">Razorpay (Credit/Debit Card, UPI, etc.)</span>
            </label>

            <label className="flex items-center space-x-3 p-3 border border-[#2f153c]/20 rounded-lg cursor-pointer hover:bg-[#FFE8CD]/30 transition-all">
              <input
                type="radio"
                name="payment-method"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => onPaymentMethodChange("cod")}
                className="h-4 w-4 text-[#2f153c] focus:ring-[#FFD6BA]"
              />
              <span className="text-[#2f153c] font-medium">Cash on Delivery</span>
            </label>
          </div>
        </div>
      )}
      
      {/* Checkout Button - Only show on desktop */}
      {!isMobile && (
        <button 
          onClick={() => document.getElementById("shipping-form").dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))}
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#2f153c] text-white rounded-lg hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-200 font-medium"
        >
          {paymentMethod === "cod" ? "Place Order" : "Proceed to Payment"}
        </button>
      )}
      
      {/* Back to Cart Link */}
      <div className="mt-6">
        <Link 
          href="/cart" 
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#2f153c] text-[#2f153c] rounded-lg hover:bg-[#FFE8CD]/70 transition-all duration-200 font-medium"
        >
          Back to Cart
        </Link>
      </div>
      
      <p className="text-xs text-[#2f153c]/60 text-center mt-4">
        Free shipping on orders over $50
      </p>
    </div>
  );
};

export default OrderSummaryCheckout;