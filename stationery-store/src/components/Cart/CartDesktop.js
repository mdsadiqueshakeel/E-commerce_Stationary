"use client";

import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import CartContent from "./CartContent";

const CartDesktop = () => {
  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden pt-16">
      <Navbar />
      <CartContent />
      <Footer />
    </div>
  );
};

export default CartDesktop;
