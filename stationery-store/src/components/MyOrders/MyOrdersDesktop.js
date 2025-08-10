"use client";

import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import MyOrdersContent from "./MyOrdersContent";

const MyOrdersDesktop = () => {
  return (
    <div className="flex flex-col bg-gradient-to-b from-[#FFdcdc] to-[#faebd7] to-[#FFdcdc] w-full min-h-screen overflow-x-hidden pt-10">
      <Navbar />
      <MyOrdersContent />
      <Footer />
    </div>
  );
};

export default MyOrdersDesktop;