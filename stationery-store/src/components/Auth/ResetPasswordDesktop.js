"use client";

import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import ResetPasswordContent from "./ResetPasswordContent";

const ResetPasswordDesktop = () => {
  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden pt-10">
      <Navbar />
      <ResetPasswordContent />
      <Footer />
    </div>
  );
};

export default ResetPasswordDesktop;