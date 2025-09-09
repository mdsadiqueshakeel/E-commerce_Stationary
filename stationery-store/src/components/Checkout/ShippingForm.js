"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import apiClient from "../../utils/apiClients";
import { API_ROUTES } from "../../utils/apiRoutes";

const ShippingForm = ({ onSubmit }) => {
  const router = useRouter();
  const [userAddresses, setUserAddresses] = useState([]);
   const [selectedAddressId, setSelectedAddressId] = useState("");
   const [formData, setFormData] = useState({});

   useEffect(() => {
     console.log("Selected Address ID:", selectedAddressId);
     console.log("Form Data:", formData);
   }, [selectedAddressId, formData]);

   useEffect(() => {
     const fetchAddresses = async () => {
       try {
         const response = await apiClient.get(API_ROUTES.auth.addresses);
         const addresses = response.addresses || []; // Ensure addresses is an array
         setUserAddresses(addresses);
          console.log("Fetched addresses:", addresses);
          if (addresses.length > 0) {
           // Select the first address by default or the default address if available
           const defaultAddress = addresses.find(addr => addr.isDefault);
           const addressToSet = defaultAddress || addresses[0];
           setSelectedAddressId(addressToSet.id);
           setFormData({
             fullName: addressToSet.fullName || "",
             phoneNumber: addressToSet.phoneNumber || "",
             addressLine1: addressToSet.addressLine1 || "",
             addressLine2: addressToSet.addressLine2 || "",
             city: addressToSet.city || "",
             state: addressToSet.state || "",
             zipCode: addressToSet.postalCode || "",
             country: addressToSet.country || "India",
           });
         }
       } catch (error) {
         console.error("Error fetching addresses:", error);
       }
     };
     fetchAddresses();
   }, []);

   const handleAddressSelect = (e) => {
     const addressId = e.target.value;
     console.log("Selected Address ID in handleAddressSelect:", addressId);
     setSelectedAddressId(addressId);
     const selectedAddress = userAddresses.find(addr => addr.id === addressId);
     console.log("Selected Address in handleAddressSelect:", selectedAddress);
     if (selectedAddress) {
       setFormData({
         fullName: selectedAddress.fullName || "",
         phoneNumber: selectedAddress.phone || "",
         addressLine1: selectedAddress.line1 || "",
         addressLine2: selectedAddress.line2 || "",
         city: selectedAddress.city || "",
         state: selectedAddress.state || "",
         zipCode: selectedAddress.postalCode || "",
         country: selectedAddress.country || "India",
       });
     }
   };

   const handleAddAddressClick = () => {
     router.push("/profile/addresses");
   };



  return (
    <form id="shipping-form" className="bg-gradient-to-br from-[#FFdcdc] to-[#FFf2eb] text-[#2f153c] backdrop-blur-sm rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-[#2f153c] mb-6">Shipping Address</h2>
      {userAddresses.length > 0 && (
        <div className="mb-4 grid grid-cols-1 gap-4">
          {userAddresses.map(address => (
            <label
              key={address.id}
              className={`relative block cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${selectedAddressId === address.id ? 'border-indigo-500 ring-2' : 'border-gray-300'}`}
            >
              <input
                type="radio"
                name="addressSelect"
                value={address.id}
                checked={selectedAddressId === address.id}
                onChange={handleAddressSelect}
                className="sr-only"
              />
              <span className="flex items-center justify-between">
                <span className="flex flex-col text-sm">
                  <span className="font-medium text-gray-900">{address.fullName}</span>
                  <span className="text-gray-500">{formData.addressLine1}</span>
                  <span className="text-gray-500">{formData.zipCode}</span>
                </span>
                {address.isDefault && (
                  <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                    Default
                  </span>
                )}
              </span>
            </label>
          ))}
        </div>
      )}

      {selectedAddressId && userAddresses.length > 0 && (
        <div className="mt-6 p-4 border border-gray-300 rounded-md bg-white shadow-sm">
          <h3 className="text-lg font-semibold text-[#2f153c] mb-2">Selected Address Details:</h3>
          <p className="text-sm text-gray-800"><strong>Full Name:</strong> {formData.fullName}</p>
          <p className="text-sm text-gray-800"><strong>Phone Number:</strong> {formData.phoneNumber}</p>
          <p className="text-sm text-gray-800"><strong>Address Line 1:</strong> {formData.addressLine1}</p>
          {formData.addressLine2 && <p className="text-sm text-gray-800"><strong>Address Line 2:</strong> {formData.addressLine2}</p>}
          <p className="text-sm text-gray-800"><strong>City:</strong> {formData.city}</p>
          <p className="text-sm text-gray-800"><strong>State:</strong> {formData.state}</p>
          <p className="text-sm text-gray-800"><strong>Zip Code:</strong> {formData.zipCode}</p>
          <p className="text-sm text-gray-800"><strong>Country:</strong> {formData.country}</p>
        </div>
      )}

      {userAddresses.length !== 0 && (
      <div className="mt-6">
        <button
          type="button"
          onClick={handleAddAddressClick}
          className="w-full inline-flex items-center justify-center px-4 py-2 bg-[#2f153c] text-white rounded-lg hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-200 font-medium whitespace-nowrap"
        >
          Select Another Address
        </button>
      </div>
      )}


      {userAddresses.length === 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">No addresses found. Please add a new address.</p>
          <button
            type="button"
            onClick={handleAddAddressClick}
            className="mt-2 inline-flex items-center px-4 py-2 bg-[#2f153c] text-white rounded-lg hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-200 font-medium whitespace-nowrap"
          >
            Add New Address
          </button>
        </div>
      )}


    </form>
  );
};

export default ShippingForm;