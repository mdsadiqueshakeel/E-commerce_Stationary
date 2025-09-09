import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import apiClient from "@/utils/apiClients";
import { API_ROUTES } from "@/utils/apiRoutes";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      [name]: value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Login attempt with:", formData);

  //   localStorage.setItem("auth_token", "dummy_token");
  //   router.push(redirectPath);
  // };

  const handleLogin = async (e) => {
    e.preventDefault(); // stop default GET request
    setErrorMessage(""); // clear old error

    try {
      const response = await apiClient.post(API_ROUTES.auth.login, formData);

      if (response?.token) {
        // Store token in localStorage
        localStorage.setItem("auth_token", response.token);
        
        // Fetch user profile after successful login
        try {
          const profileResponse = await apiClient.get(API_ROUTES.users.getProfile);
          
          if (profileResponse?.user) {
            // Store user profile in localStorage
            localStorage.setItem("user_profile", JSON.stringify(profileResponse.user));
            
            // Store user profile in cookies for server-side access
            document.cookie = `user_profile=${JSON.stringify(profileResponse.user)}; path=/; max-age=86400`;
            
            // Store auth token in cookies for server-side access
            document.cookie = `auth_token=${response.token}; path=/; max-age=86400`;
            
            // Dispatch event to notify other components
            window.dispatchEvent(new Event('userProfileUpdated'));
          }
        } catch (profileError) {
          console.error("Failed to fetch user profile:", profileError);
        }
        
        window.location.href = redirectPath;
      } else {
        setErrorMessage("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage(error?.response?.data?.error || "Invalid credentials");
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

      <form className="space-y-6" onSubmit={handleLogin}>
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
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/80 border border-[#2f153c]/20 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
            placeholder="Enter your email"
 style={{ textTransform: "lowercase" }}
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
            value={formData.password}
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
            Login
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
            Continue with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
