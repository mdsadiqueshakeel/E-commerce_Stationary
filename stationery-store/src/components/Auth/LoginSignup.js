"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import Navbar from "../Navbar";
import Footer from "../Footer";

const LoginSignup = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden pt-10">
      <Navbar />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 w-full bg-gradient-to-br from-[#FFF2EB] to-[#FFCDCD] text-[#2f153c]">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold  mb-4">
            Welcome Back!
          </h1>
          <p className="text-[#2f153c]/80 text-lg max-w-2xl mx-auto">
            Your gateway to a seamless shopping experience awaits. Join us
            today!
          </p>
        </div>

        <div className="max-w-md mx-auto bg-gradient-to-br from-[#FFdcdc] to-[#FFf2eb] backdrop-blur-sm rounded-xl shadow-md overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-[#2f153c]/10">
            <button
              className={`flex-1 py-4 text-center font-medium transition-all duration-200 ${
                activeTab === "login"
                  ? "text-[#2f153c] border-b-2 border-[#2f153c]"
                  : "text-[#2f153c]/60 hover:text-[#2f153c]/80"
              }`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              className={`flex-1 py-4 text-center font-medium transition-all duration-200 ${
                activeTab === "signup"
                  ? "text-[#2f153c] border-b-2 border-[#2f153c]"
                  : "text-[#2f153c]/60 hover:text-[#2f153c]/80"
              }`}
              onClick={() => setActiveTab("signup")}
            >
              Sign Up
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {/* Login Form */}
            <div
              className={`transition-all duration-300 ${
                activeTab === "login" ? "block" : "hidden"
              }`}
            >
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#2f153c] mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full px-4 py-3 bg-white/80 border border-[#2f153c]/20 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-[#2f153c]"
                    >
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-[#2f153c]/70 hover:text-[#2f153c] transition-all duration-200"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="w-full px-4 py-3 bg-white/80 border border-[#2f153c]/20 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
                    placeholder="Enter your password"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#2f153c] text-white rounded-lg hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-200 font-medium"
                  >
                    Login
                  </button>
                </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-[#2f153c]/70">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-[#2f153c] hover:text-[#FFD6BA] transition-all duration-200"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
              </form>
              {/* don't have account want to signup then link of signup page */}

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#2f153c]/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gradient-to-r from-[#FFdcdc] to-[#FFf2eb] text-[#2f153c]/70">
                      or
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#2f153c] text-[#2f153c] rounded-lg hover:bg-[#FFE8CD]/70 transition-all duration-200 font-medium">
                    <FcGoogle className="h-5 w-5" />
                    Continue with Google
                  </button>
                </div>
              </div>
            </div>

            {/* Signup Form */}
            <div
              className={`transition-all duration-300 ${
                activeTab === "signup" ? "block" : "hidden"
              }`}
            >
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-[#2f153c] mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    className="w-full px-4 py-3 bg-white/80 border border-[#2f153c]/20 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="signupEmail"
                    className="block text-sm font-medium text-[#2f153c] mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="signupEmail"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full px-4 py-3 bg-white/80 border border-[#2f153c]/20 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="signupPassword"
                    className="block text-sm font-medium text-[#2f153c] mb-1"
                  >
                    Password
                  </label>
                  <input
                    id="signupPassword"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="w-full px-4 py-3 bg-white/80 border border-[#2f153c]/20 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
                    placeholder="Create a password"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-[#2f153c] mb-1"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="w-full px-4 py-3 bg-white/80 border border-[#2f153c]/20 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
                    placeholder="Confirm your password"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#2f153c] text-white rounded-lg hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-200 font-medium"
                  >
                    Create Account
                  </button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#2f153c]/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gradient-to-r from-[#FFdcdc] to-[#FFf2eb] text-[#2f153c]/70">
                      or
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#2f153c] text-[#2f153c] rounded-lg hover:bg-[#FFE8CD]/70 transition-all duration-200 font-medium">
                    <FcGoogle className="h-5 w-5" />
                    Sign up with Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoginSignup;
