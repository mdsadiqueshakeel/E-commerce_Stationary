"use client";

import React, { useState } from "react";
import AuthHeader from "./AuthHeader";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthContent = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 w-full bg-gradient-to-br from-[#FFF2EB] to-[#FFCDCD] text-[#2f153c]">
      <AuthHeader />
      
      <div className="max-w-md mx-auto bg-gradient-to-br from-[#FFdcdc] to-[#FFf2eb] backdrop-blur-sm rounded-xl shadow-md overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-[#2f153c]/10">
          <button
            className={`flex-1 py-4 text-center font-medium transition-all duration-200 ${activeTab === "login" ? "text-[#2f153c] border-b-2 border-[#2f153c]" : "text-[#2f153c]/60 hover:text-[#2f153c]/80"}`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 py-4 text-center font-medium transition-all duration-200 ${activeTab === "signup" ? "text-[#2f153c] border-b-2 border-[#2f153c]" : "text-[#2f153c]/60 hover:text-[#2f153c]/80"}`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {/* Login Form */}
          <div className={`transition-all duration-300 ${activeTab === "login" ? "block" : "hidden"}`}>
            <LoginForm />
          </div>

          {/* Signup Form */}
          <div className={`transition-all duration-300 ${activeTab === "signup" ? "block" : "hidden"}`}>
            <SignupForm />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthContent;