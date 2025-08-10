"use client";

import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import AboutUsContent from "./AboutUsContent";

const AboutUsDesktop = () => {
  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden pt-10">
      <Navbar />
      <AboutUsContent />
      <Footer />
    </div>
  );
};

export default AboutUsDesktop;