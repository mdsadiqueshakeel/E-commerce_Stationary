"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CheckoutHeader from "./CheckoutHeader";
import ShippingForm from "./ShippingForm";
import OrderSummaryCheckout from "./OrderSummaryCheckout";
import CouponCode from "./CouponCode";

const CheckoutContent = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);

  //Check if user is logged in
  useEffect(() => {
    // This is a placeholder. In a real app, you would check if the user is logged in
    // For now, we'll assume the user is not logged in
    const checkLoginStatus = () => {
      // Placeholder for actual authentication check
      const isUserLoggedIn = false; // Replace with actual auth check
      setIsLoggedIn(isUserLoggedIn);

      // If not logged in, redirect to login page with return URL
      if (!isUserLoggedIn) {
        router.push("/checkout");
      }
    };

    checkLoginStatus();
  }, [router]);

  // Check if on mobile device
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load cart items from localStorage
  useEffect(() => {
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

  // Calculate totals whenever cart items or discount changes
  useEffect(() => {
    const calculateTotals = () => {
      const itemSubtotal = cartItems.reduce((sum, item) => {
        const price = parseFloat(item.price);
        return sum + (price * item.quantity);
      }, 0);

      // Calculate shipping (free if subtotal > $50)
      const shippingCost = itemSubtotal > 50 ? 0 : 5.99;
      
      // Apply discount if any
      const discountAmount = discount;
      
      const taxAmount = (itemSubtotal - discountAmount) * 0.08; // 8% tax rate
      
      // Ensure totalAmount is not negative
      const totalAmount = Math.max(0, itemSubtotal - discountAmount + taxAmount + shippingCost);

      setSubtotal(itemSubtotal);
      setShipping(shippingCost);
      setTax(taxAmount);
      setTotal(totalAmount);
    };

    calculateTotals();
  }, [cartItems, discount]);

  // Handle coupon application
  const applyCoupon = (code) => {
    // This is a placeholder. In a real app, you would validate the coupon code with the backend
    if (code === "DISCOUNT20") {
      setDiscount(subtotal * 0.2); // 20% discount
      return { success: true, message: "Coupon applied successfully!" };
    } else {
      return { success: false, message: "Invalid coupon code." };
    }
  };

  // Handle payment method change
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  // Handle order placement
  const handlePlaceOrder = (shippingData) => {
    // Combine shipping data with order details
    const orderData = {
      items: cartItems,
      shipping: shippingData,
      payment: {
        method: paymentMethod,
        total: total
      },
      totals: {
        subtotal,
        tax,
        shipping,
        discount,
        total
      }
    };

    // For COD, directly place order
    if (paymentMethod === "cod") {
      // Call API to place order
      console.log("Placing COD order:", orderData);
      // Redirect to success page or show confirmation
      // router.push("/order-success");
    } else {
      // For Razorpay, initiate payment gateway
      console.log("Initiating Razorpay payment:", orderData);
      // In a real app, you would call your backend to create a Razorpay order
      // and then open the Razorpay payment dialog
    }
  };

  // Toggle mobile order summary
  const toggleOrderSummary = () => {
    setIsOrderSummaryOpen(!isOrderSummaryOpen);
  };

  return (
    <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 w-full bg-gradient-to-br from-[#FFF2EB] to-[#FFCDCD]">
      <CheckoutHeader />
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2f153c]"></div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          {/* Mobile Order Summary Toggle */}
          {isMobile && (
            <button
              onClick={toggleOrderSummary}
              className="w-full mb-4 py-3 bg-[#FFdcdc] text-[#2f153c] font-medium rounded-lg shadow-sm flex justify-between items-center px-4"
            >
              <span>Order Summary ({cartItems.length} items)</span>
              <span className="font-bold">${total.toFixed(2)}</span>
              <span>{isOrderSummaryOpen ? '▲' : '▼'}</span>
            </button>
          )}

          {/* Mobile Order Summary (Collapsible) */}
          {isMobile && isOrderSummaryOpen && (
            <div className="mb-6">
              <CouponCode applyCoupon={applyCoupon} setCouponCode={setCouponCode} />
              <OrderSummaryCheckout
                cartItems={cartItems}
                subtotal={subtotal}
                tax={tax}
                shipping={shipping}
                discount={discount}
                total={total}
                paymentMethod={paymentMethod}
                onPaymentMethodChange={handlePaymentMethodChange}
                isMobile={true}
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Shipping Form */}
            <div className="lg:col-span-2">
              <ShippingForm onSubmit={handlePlaceOrder} />
            </div>

            {/* Desktop Order Summary */}
            {!isMobile && (
              <div className="lg:col-span-1">
                <CouponCode applyCoupon={applyCoupon} setCouponCode={setCouponCode} />
                <OrderSummaryCheckout
                  cartItems={cartItems}
                  subtotal={subtotal}
                  tax={tax}
                  shipping={shipping}
                  discount={discount}
                  total={total}
                  paymentMethod={paymentMethod}
                  onPaymentMethodChange={handlePaymentMethodChange}
                  onPlaceOrder={() => {}}
                />
              </div>
            )}
          </div>

          {/* Mobile Payment Section */}
          {isMobile && (
            <div className="mt-8 bg-gradient-to-br from-[#FFdcdc] to-[#FFf2eb] backdrop-blur-sm rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-[#2f153c] mb-4">Payment Method</h3>
              
              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-3 border border-[#2f153c]/20 rounded-lg cursor-pointer hover:bg-[#FFE8CD]/30 transition-all">
                  <input
                    type="radio"
                    name="payment-method"
                    value="razorpay"
                    checked={paymentMethod === "razorpay"}
                    onChange={() => handlePaymentMethodChange("razorpay")}
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
                    onChange={() => handlePaymentMethodChange("cod")}
                    className="h-4 w-4 text-[#2f153c] focus:ring-[#FFD6BA]"
                  />
                  <span className="text-[#2f153c] font-medium">Cash on Delivery</span>
                </label>
              </div>

              <button
                onClick={() => document.getElementById("shipping-form").dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))}
                className="w-full mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#2f153c] text-white rounded-lg hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-200 font-medium"
              >
                {paymentMethod === "cod" ? "Place Order" : "Proceed to Payment"}
              </button>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default CheckoutContent;