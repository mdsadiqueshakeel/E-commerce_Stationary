"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import ForgotPasswordHeader from "./ForgotPasswordHeader";
import { API_ROUTES } from "@/utils/apiRoutes";
import apiClient from "@/utils/apiClients";

const ResetPasswordContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenFromUrl = searchParams.get("token");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    newPassword: "",
    token: "",
  });

  // Set token when it's available
  useEffect(() => {
    console.log("Token from URL:", tokenFromUrl);
    if (tokenFromUrl) {
      setFormData((prev) => ({ ...prev, token: tokenFromUrl }));
    }
  }, [tokenFromUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleResetPassword = async (e) => {
  e.preventDefault();

  console.log("🔹 Reset button clicked!");
  console.log("Payload being sent:", {
    newPassword: formData.newPassword,
    token: tokenFromUrl
  });

  const payload = {
    newPassword: formData.newPassword,
    token: tokenFromUrl,
  };

try {
  const response = await apiClient.post(API_ROUTES.auth.reset, formData);

  if (response?.message?.toLowerCase().includes("success")) {
    setIsSubmitted(true);
    setMessage("Password reset successfully! Redirecting...");

    setTimeout(() => {
      router.push("/login");
    }, 2500);
  } else {
    setErrorMessage(response?.message || "Password reset failed.");
  }
} catch (error) {
  console.error("Password reset error:", error);
  setErrorMessage(
    error?.response?.data?.message || "Something went wrong. Try again."
  );
}

};


  return (
    <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 w-full text-[#2f153c] bg-gradient-to-br from-[#FFF2EB] to-[#FFCDCD]">
      <ForgotPasswordHeader />

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
            <form className="space-y-6" onSubmit={handleResetPassword}>
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-[#2f153c] mb-1"
                >
                  Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/80 border border-[#2f153c]/20 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#2f153c] text-white rounded-lg hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-200 font-medium"
                >
                  Reset Password
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-6">
              <div className="mb-6 text-[#2f153c] bg-[#FFE8CD]/70 p-4 rounded-lg">
                <p className="font-medium">{message}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ResetPasswordContent;
