"use client";

import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import ForgotPasswordContent from "./ForgotPasswordContent";

const ForgotPasswordDesktop = () => {
  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden pt-10">
      <Navbar />
      <ForgotPasswordContent />
      <Footer />
    </div>
  );
};

export default ForgotPasswordDesktop;