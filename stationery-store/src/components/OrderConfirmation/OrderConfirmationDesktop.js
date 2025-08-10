"use client";

import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import OrderConfirmationContent from "./OrderConfirmationContent";

const OrderConfirmationDesktop = () => {
  return (
    <div className="flex flex-col bg-gradient-to-b from-[#FFdcdc] to-[#faebd7] to-[#FFdcdc] w-full min-h-screen overflow-x-hidden pt-10">
      <Navbar />
      <OrderConfirmationContent />
      <Footer />
    </div>
  );
};

export default OrderConfirmationDesktop;