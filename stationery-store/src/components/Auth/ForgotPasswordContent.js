"use client";

import React, { useState } from "react";
import Link from "next/link";
import ForgotPasswordHeader from "./ForgotPasswordHeader";
import { API_ROUTES } from "@/utils/apiRoutes";
import apiClient from "@/utils/apiClients";


const ForgotPasswordContent = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send a password reset email here
    setIsSubmitted(true);
  };


  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post(API_ROUTES.auth.forget, formData);
      if (response?.status === 200) {
        setIsSubmitted(true);
      }
      setMessage("Reset link sent successfully. Please check your email.");
    } catch (error) {
      console.error("Error sending reset link:", error);
      setErrorMessage("Failed to send reset link. Please try again.",error);
    }
  };

  return (
    <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 w-full  text-[#2f153c] bg-gradient-to-br from-[#FFF2EB] to-[#FFCDCD]">
      <ForgotPasswordHeader />

      {/* if else Error message */}
      {errorMessage && (
        <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm">
          {errorMessage}
        </div>
      )}
      {message && (
        <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700 text-sm">
          {message}
        </div>
      )}
      <div className="max-w-md mx-auto bg-gradient-to-br from-[#FFdcdc] to-[#FFf2eb] backdrop-blur-sm rounded-xl shadow-md overflow-hidden">
        <div className="p-6 sm:p-8">
          {!isSubmitted ? (
            <form className="space-y-6" onSubmit={handleForgetPassword}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#2f153c] mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange }
                  className="w-full px-4 py-3 bg-white/80 border border-[#2f153c]/20 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
                  placeholder="Enter your email"
                   style={{ textTransform: "lowercase" }}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#2f153c] text-white rounded-lg hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-200 font-medium"
                >
                  Send Reset Link
                </button>
              </div>

              <div className="text-center">
                <Link
                  href="/login"
                  className="text-sm text-[#2f153c]/70 hover:text-[#2f153c] transition-all duration-200"
                >
                  Back to Login
                </Link>
              </div>
            </form>
          ) : (
            <div className="text-center py-6">
              <div className="mb-6 text-[#2f153c] bg-[#FFE8CD]/70 p-4 rounded-lg">
                <p className="font-medium">Reset Link Sent!</p>
                <p className="mt-2 text-sm">We've sent a password reset link to {email}. Please check your inbox and follow the instructions.</p>
              </div>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#2f153c] text-white rounded-lg hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-200 font-medium"
              >
                Return to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ForgotPasswordContent;