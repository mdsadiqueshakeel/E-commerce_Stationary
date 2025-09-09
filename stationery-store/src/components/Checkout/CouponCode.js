import React, { useState } from "react";

const CouponCode = ({ applyCoupon, setCouponCode }) => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // "success" or "error"

  const handleApplyCoupon = () => {
    if (!code.trim()) {
      setMessage("Please enter a coupon code");
      setStatus("error");
      return;
    }

    const result = applyCoupon(code);
    setMessage(result.message);
    setStatus(result.success ? "success" : "error");
    
    if (result.success) {
      setCouponCode(code);
    }
  };

  return (
    <div className="bg-gradient-to-br text-[#2f153c] from-[#FFdcdc] to-[#FFf2eb] backdrop-blur-sm rounded-xl shadow-md p-6 mb-4">
      <h3 className="text-lg font-bold  mb-4">Apply Coupon</h3>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter coupon code"
          className="flex-grow px-4 py-3 bg-white/80 border border-[#2f153c]/20 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
        />
        <button
          onClick={handleApplyCoupon}
          className="px-5 py-3 bg-[#2f153c] text-white rounded-lg hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-200 font-medium whitespace-nowrap"
        >
          Apply
        </button>
      </div>
      
      {message && (
        <p className={`mt-2 text-sm ${status === "success" ? "text-green-600" : "text-red-500"}`}>
          {message}
        </p>
      )}
      
      <p className="text-xs text-[#2f153c]/60 mt-2">
        Try "DISCOUNT20" for 20% off your order
      </p>
    </div>
  );
};

export default CouponCode;