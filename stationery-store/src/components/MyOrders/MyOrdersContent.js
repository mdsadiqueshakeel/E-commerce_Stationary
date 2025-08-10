"use client";

import React, { useState, useEffect } from "react";
import MyOrdersHeader from "./MyOrdersHeader";
import OrderCard from "./OrderCard";
import EmptyOrdersState from "./EmptyOrdersState";

const MyOrdersContent = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Sample orders data (in a real app, this would come from an API)
  useEffect(() => {
    // Simulate loading orders data
    setTimeout(() => {
      const sampleOrders = [
        {
          orderId: "ORD-12345-ABCDE",
          orderDate: "June 10, 2023",
          status: "Delivered",
          total: 112.97,
          shippingAddress: "123 Main St, Apt 4B, New York, NY 10001",
          items: [
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
            }
          ]
        },
        {
          orderId: "ORD-67890-FGHIJ",
          orderDate: "May 25, 2023",
          status: "Shipped",
          total: 78.95,
          shippingAddress: "456 Oak Ave, Suite 7C, Boston, MA 02108",
          items: [
            {
              id: 3,
              name: "Washi Tape Collection",
              image: "https://placehold.co/200x200",
              price: "$12.99",
              quantity: 3,
              variant: "Pastel Colors"
            },
            {
              id: 4,
              name: "Leather Journal",
              image: "https://placehold.co/200x200",
              price: "$39.98",
              quantity: 1,
              variant: "Brown, Plain Pages"
            }
          ]
        },
        {
          orderId: "ORD-24680-KLMNO",
          orderDate: "April 15, 2023",
          status: "Processing",
          total: 45.50,
          shippingAddress: "789 Pine St, Chicago, IL 60601",
          items: [
            {
              id: 5,
              name: "Colored Pencil Set",
              image: "https://placehold.co/200x200",
              price: "$18.50",
              quantity: 1,
              variant: "24 Colors"
            },
            {
              id: 6,
              name: "Desk Organizer",
              image: "https://placehold.co/200x200",
              price: "$27.00",
              quantity: 1,
              variant: "Bamboo, 5 Compartments"
            }
          ]
        },
        {
          orderId: "ORD-13579-PQRST",
          orderDate: "March 5, 2023",
          status: "Cancelled",
          total: 64.75,
          shippingAddress: "321 Elm St, San Francisco, CA 94107",
          items: [
            {
              id: 7,
              name: "Watercolor Paint Set",
              image: "https://placehold.co/200x200",
              price: "$34.75",
              quantity: 1,
              variant: "Professional, 24 Colors"
            },
            {
              id: 8,
              name: "Sketchbook",
              image: "https://placehold.co/200x200",
              price: "$15.00",
              quantity: 2,
              variant: "Spiral Bound, 100 Pages"
            }
          ]
        }
      ];

      // Uncomment the next line to test empty state
      // sampleOrders = [];

      setOrders(sampleOrders);
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

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <MyOrdersHeader />
        <h1 className="text-3xl font-bold text-[#2f153c] mb-8">My Orders</h1>
        
        {/* Loading skeletons */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gradient-to-br from-[#FFdcdc] to-[#FFf2eb] backdrop-blur-sm rounded-xl shadow-md p-6 mb-6 animate-pulse">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div>
                <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="flex gap-3 mt-2 md:mt-0">
                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-28 mb-4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <MyOrdersHeader />
      <h1 className="text-3xl font-bold text-[#2f153c] mb-8">My Orders</h1>
      
      {orders.length > 0 ? (
        <div>
          {orders.map((order) => (
            <OrderCard key={order.orderId} order={order} />
          ))}
        </div>
      ) : (
        <EmptyOrdersState />
      )}
    </div>
  );
};

export default MyOrdersContent;