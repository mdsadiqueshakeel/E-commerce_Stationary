"use client";

import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import CheckoutContent from "./CheckoutContent";

const CheckoutDesktop = () => {
  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden pt-10">
      <Navbar />
      <CheckoutContent />
      <Footer />
    </div>
  );
};

export default CheckoutDesktop;