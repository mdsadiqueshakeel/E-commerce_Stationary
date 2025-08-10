"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import OrderConfirmationHeader from "./OrderConfirmationHeader";
import OrderSummary from "./OrderSummary";

const OrderConfirmationContent = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Sample order data (in a real app, this would come from an API or localStorage)
  useEffect(() => {
    // Simulate loading order data
    setTimeout(() => {
      const sampleOrderItems = [
        {
          id: 1,
          name: "Premium Notebook",
          image: "https://placehold.co/200x200",
          price: "$24.99",
          quantity: 2,
          variant: "Dotted, A5"
        },
        {
          id: 2,
          name: "Fountain Pen Set",
          image: "https://placehold.co/200x200",
          price: "$49.99",
          quantity: 1,
          variant: "Blue, Medium Nib"
        },
        {
          id: 3,
          name: "Washi Tape Collection",
          image: "https://placehold.co/200x200",
          price: "$12.99",
          quantity: 3,
          variant: "Pastel Colors"
        }
      ];

      setOrderItems(sampleOrderItems);
      setIsLoading(false);
    }, 1000);
  }, []);

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

  // Order details
  const orderDetails = {
    orderId: "ORD-12345-ABCDE",
    paymentMethod: "Credit Card",
    estimatedDelivery: "June 15, 2023"
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <OrderConfirmationHeader />
      
      <div className="flex flex-col items-center justify-center mb-8 text-center">
        <div className="mb-4">
          <CheckCircle size={80} className="text-green-500 mx-auto" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#2f153c] mb-2">Thank you for your order!</h1>
        <p className="text-lg text-[#2f153c]/70 max-w-md">
          Your order has been confirmed and will be shipped soon.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Order Summary Card */}
        <div className="lg:col-span-2 lg:col-start-2 order-1 lg:order-2">
          <OrderSummary orderItems={orderItems} orderDetails={orderDetails} isLoading={isLoading} />
        </div>

        {/* Action Buttons */}
        <div className="lg:col-span-1 lg:col-start-1 lg:row-start-1 order-2 lg:order-1 flex flex-col gap-4">
          <div className="bg-gradient-to-br from-[#FFdcdc] to-[#FFf2eb] backdrop-blur-sm rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#2f153c] mb-4">What's Next?</h2>
            <p className="text-[#2f153c]/70 mb-6">
              You will receive an email confirmation with your order details and tracking information once your order ships.
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/product" className="w-full ">
                <button className="w-full bg-[#2f153c] cursor-pointer hover:bg-[#2f153c]/90 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                  Continue Shopping
                </button>
              </Link>
              <Link href="/my-orders" className="w-full">
                <button className="w-full bg-white cursor-pointer hover:bg-gray-100 text-[#2f153c] font-medium py-3 px-6 rounded-lg border border-[#2f153c]/20 transition-colors">
                  View My Orders
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationContent;