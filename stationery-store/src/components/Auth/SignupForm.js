import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import apiClient from "@/utils/apiClients";
import { API_ROUTES } from "@/utils/apiRoutes";

const SignupForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
   const [formData, setFormData] = useState({
      email: "",
      password: "",
      name: "",
      confirmPassword: ""
    });
      const [redirectPath, setRedirectPath] = useState("/");
      const [errorMessage, setErrorMessage] = useState("");
      useEffect(() => {
        const redirect = searchParams.get("redirect");
        if (redirect) {
          setRedirectPath(redirect);
        }
      }, [searchParams]);

    
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt with:", formData);

    localStorage.setItem("auth_token",token);
    router.push(redirectPath);
  };

  const handleSignup = async (e) => {
    e.preventDefault(); // stop default GET request
    setErrorMessage(""); 
    try {
      const response = await apiClient.post(API_ROUTES.auth.signup, formData);
      router.push(redirectPath);
      console.log("Signup successful:", response);
    } catch (error) {
      console.error("Signup failed:", error);
      setErrorMessage(error?.response?.data?.error || "Signup failed");
    }
  };

  const handleGoogleLogin = () => {
    // Replace with your backend URL
    window.location.href = `http://localhost:5000/api/auth/google?redirect=${redirectPath}`;
    const token = new URLSearchParams(window.location.search).get("token");
    if (token) localStorage.setItem("auth_token", token);
  };

  return (
    <>
     {/* Error message */}
      {errorMessage && (
        <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm">
          {errorMessage}
        </div>
      )}
      <form className="space-y-6" onSubmit={handleSignup}>
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-[#2f153c] mb-1">
            Full Name
          </label>
          <input
            id="fullName"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={formData.name}
            onChange={handleChange}
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
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/80 border border-[#2f153c]/20 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
            placeholder="Enter your email"
            style={{ textTransform: "lowercase" }}
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
            value={formData.password}
            onChange={handleChange}
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
            value={formData.confirmPassword}
            onChange={handleChange}
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
            onClick={handleGoogleLogin}
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