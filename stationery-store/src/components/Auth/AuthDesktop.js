"use client";

import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import AuthContent from "./AuthContent";

const AuthDesktop = () => {
  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden pt-10">
      <Navbar />
      <AuthContent />
      <Footer />
    </div>
  );
};

export default AuthDesktop;