import React from "react";
import { FcGoogle } from "react-icons/fc";

const SignupForm = () => {
  return (
    <>
      <form className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-[#2f153c] mb-1">
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
          <label htmlFor="signupEmail" className="block text-sm font-medium text-[#2f153c] mb-1">
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
          <label htmlFor="signupPassword" className="block text-sm font-medium text-[#2f153c] mb-1">
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
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#2f153c] mb-1">
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
          <button
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#2f153c] text-[#2f153c] rounded-lg hover:bg-[#FFE8CD]/70 transition-all duration-200 font-medium"
          >
            <FcGoogle className="h-5 w-5" />
            Sign up with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default SignupForm;