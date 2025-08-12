import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [redirectPath, setRedirectPath] = useState("/");

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

    localStorage.setItem("auth_token", "dummy_token");
    router.push(redirectPath);
  };

  const handleGoogleLogin = () => {
    // Replace with your backend URL
    window.location.href = `http://localhost:5000/api/auth/google?redirect=${redirectPath}`;
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit}>
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
