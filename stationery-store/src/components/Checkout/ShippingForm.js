"use client";

import React, { useState } from "react";

const ShippingForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    saveAddress: false,
    deliveryInstructions: ""
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  // Mark field as touched when it loses focus
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });
    validateField(name, formData[name]);
  };

  // Validate a single field
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (!value.trim()) error = "Full name is required";
        break;
      case "phoneNumber":
        if (!value.trim()) {
          error = "Phone number is required";
        } else if (!/^\d{10}$/.test(value.replace(/[\s-]/g, ""))) {
          error = "Please enter a valid 10-digit phone number";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "addressLine1":
        if (!value.trim()) error = "Address is required";
        break;
      case "city":
        if (!value.trim()) error = "City is required";
        break;
      case "state":
        if (!value.trim()) error = "State/Province is required";
        break;
      case "zipCode":
        if (!value.trim()) {
          error = "ZIP/Postal code is required";
        } else if (!/^\d{6}$/.test(value.replace(/\s/g, ""))) {
          error = "Please enter a valid 6-digit postal code";
        }
        break;
      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    return error === "";
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate each required field
    ["fullName", "phoneNumber", "email", "addressLine1", "city", "state", "zipCode"].forEach(field => {
      const fieldIsValid = validateField(field, formData[field]);
      if (!fieldIsValid) {
        isValid = false;
      }
    });

    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    // Validate all fields
    const isValid = validateForm();

    if (isValid) {
      onSubmit(formData);
    } else {
      // Scroll to the first error
      const firstError = document.querySelector(".error-message");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <form id="shipping-form" onSubmit={handleSubmit} className="bg-gradient-to-br from-[#FFdcdc] to-[#FFf2eb] text-[#2f153c] backdrop-blur-sm rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-[#2f153c] mb-6">Shipping Address</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="md:col-span-2">
          <label htmlFor="fullName" className="block text-sm font-medium text-[#2f153c] mb-1">
            Full Name *
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 bg-white/80 border ${errors.fullName && touched.fullName ? "border-red-500" : "border-[#2f153c]/20"} rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200`}
            placeholder="Enter your full name"
          />
          {errors.fullName && touched.fullName && (
            <p className="mt-1 text-sm text-red-500 error-message">{errors.fullName}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-[#2f153c] mb-1">
            Phone Number *
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 bg-white/80 border ${errors.phoneNumber && touched.phoneNumber ? "border-red-500" : "border-[#2f153c]/20"} rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200`}
            placeholder="Enter your phone number"
          />
          {errors.phoneNumber && touched.phoneNumber && (
            <p className="mt-1 text-sm text-red-500 error-message">{errors.phoneNumber}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#2f153c] mb-1">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 bg-white/80 border ${errors.email && touched.email ? "border-red-500" : "border-[#2f153c]/20"} rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200`}
            placeholder="Enter your email address"
          />
          {errors.email && touched.email && (
            <p className="mt-1 text-sm text-red-500 error-message">{errors.email}</p>
          )}
        </div>

        {/* Address Line 1 */}
        <div className="md:col-span-2">
          <label htmlFor="addressLine1" className="block text-sm font-medium text-[#2f153c] mb-1">
            Address Line 1 *
          </label>
          <input
            id="addressLine1"
            name="addressLine1"
            type="text"
            value={formData.addressLine1}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 bg-white/80 border ${errors.addressLine1 && touched.addressLine1 ? "border-red-500" : "border-[#2f153c]/20"} rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200`}
            placeholder="Street address, P.O. box, company name, etc."
          />
          {errors.addressLine1 && touched.addressLine1 && (
            <p className="mt-1 text-sm text-red-500 error-message">{errors.addressLine1}</p>
          )}
        </div>

        {/* Address Line 2 */}
        <div className="md:col-span-2">
          <label htmlFor="addressLine2" className="block text-sm font-medium text-[#2f153c] mb-1">
            Address Line 2 (Optional)
          </label>
          <input
            id="addressLine2"
            name="addressLine2"
            type="text"
            value={formData.addressLine2}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/80 border border-[#2f153c]/20 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
            placeholder="Apartment, suite, unit, building, floor, etc."
          />
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-[#2f153c] mb-1">
            City *
          </label>
          <input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 bg-white/80 border ${errors.city && touched.city ? "border-red-500" : "border-[#2f153c]/20"} rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200`}
            placeholder="Enter your city"
          />
          {errors.city && touched.city && (
            <p className="mt-1 text-sm text-red-500 error-message">{errors.city}</p>
          )}
        </div>

        {/* State/Province */}
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-[#2f153c] mb-1">
            State/Province *
          </label>
          <input
            id="state"
            name="state"
            type="text"
            value={formData.state}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 bg-white/80 border ${errors.state && touched.state ? "border-red-500" : "border-[#2f153c]/20"} rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200`}
            placeholder="Enter your state or province"
          />
          {errors.state && touched.state && (
            <p className="mt-1 text-sm text-red-500 error-message">{errors.state}</p>
          )}
        </div>

        {/* ZIP/Postal Code */}
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-[#2f153c] mb-1">
            ZIP/Postal Code *
          </label>
          <input
            id="zipCode"
            name="zipCode"
            type="text"
            value={formData.zipCode}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 bg-white/80 border ${errors.zipCode && touched.zipCode ? "border-red-500" : "border-[#2f153c]/20"} rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200`}
            placeholder="Enter your ZIP/postal code"
          />
          {errors.zipCode && touched.zipCode && (
            <p className="mt-1 text-sm text-red-500 error-message">{errors.zipCode}</p>
          )}
        </div>

        {/* Country */}
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-[#2f153c] mb-1">
            Country *
          </label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/80 border border-[#2f153c]/20 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
          >
            <option value="India">India</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Australia">Australia</option>
            <option value="Singapore">Singapore</option>
            <option value="UAE">UAE</option>
          </select>
        </div>

        {/* Delivery Instructions */}
        <div className="md:col-span-2">
          <label htmlFor="deliveryInstructions" className="block text-sm font-medium text-[#2f153c] mb-1">
            Delivery Instructions (Optional)
          </label>
          <textarea
            id="deliveryInstructions"
            name="deliveryInstructions"
            rows="3"
            value={formData.deliveryInstructions}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/80 border border-[#2f153c]/20 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
            placeholder="Add any special instructions for delivery"
          ></textarea>
        </div>

        {/* Save Address Checkbox */}
        <div className="md:col-span-2">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              name="saveAddress"
              checked={formData.saveAddress}
              onChange={handleChange}
              className="h-4 w-4 text-[#2f153c] focus:ring-[#FFD6BA] rounded"
            />
            <span className="text-sm text-[#2f153c]">
              Save this address for future orders
            </span>
          </label>
        </div>
      </div>
    </form>
  );
};

export default ShippingForm;