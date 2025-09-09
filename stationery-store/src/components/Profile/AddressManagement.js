"use client";
import React, { useState, useEffect } from "react";
import {
  MapPin,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  LocateFixed,
} from "lucide-react";
import apiClient from "@/utils/apiClients";
import { API_ROUTES } from "@/utils/apiRoutes";

const AddressManagement = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [geolocating, setGeolocating] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [formData, setFormData] = useState({
    label: "",
    fullName: "",
    phone: "",
    street: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    isDefault: false,
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(API_ROUTES.auth.addresses);
      setAddresses(response.addresses);
    } catch (err) {
      console.error("Error fetching addresses:", err);
      setError(err.message || "Failed to fetch addresses");
    } finally {
      setLoading(false);
    }
  };

  const handleAutofillGeolocation = () => {
    setGeolocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

          try {
            const response = await apiClient.get(
              API_ROUTES.auth.autofillAddress,
              {
                params: { latitude, longitude },
              }
            );

            console.log("Autofill response:", response);

            // Fix: Access the address data correctly based on your API response structure
            if (response.address) {
              setFormData((prev) => ({
                ...prev,
                label: response.address.label || "",
                fullName: response.address.fullName || "",
                phone: response.address.phone || "",
                street: response.address.street || "",
                line1: response.address.line1 || "",
                line2: response.address.line2 || "",
                city: response.address.city || "",
                state: response.address.state || "",
                postalCode: response.address.postalCode || "",
                country: response.address.country || "India",
              }));
              setError(null);
            } else {
              console.error("No address data in response:", response);
              setError("No address data received from the server");
            }
          } catch (err) {
            console.error("Error fetching autofill address:", err);
            setError(
              err.response?.data?.error ||
                "Failed to autofill address from geolocation"
            );
          }
          setGeolocating(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setError(
            "Unable to retrieve your location. Please enable location services or enter manually."
          );
          setGeolocating(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setGeolocating(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(`Changing ${name}: ${value}`);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post(API_ROUTES.auth.addresses, formData);
      setShowAddForm(false);
      setFormData({
        label: "",
        fullName: "",
        phone: "",
        street: "",
        line1: "",
        line2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India",
        isDefault: false,
      });
      fetchAddresses();
    } catch (err) {
      console.error("Error adding address:", err);
      setError(err.response?.data?.error || "Failed to add address");
    }
  };

  const handleEditClick = (address) => {
    setCurrentAddress(address);
    setFormData({
      label: address.label || "",
      fullName: address.fullName,
      phone: address.phone,
      street: address.street,
      line1: address.line1,
      line2: address.line2 || "",
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
      isDefault: address.isDefault,
    });
    setShowEditForm(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.patch(
        `${API_ROUTES.auth.addresses}/${currentAddress.id}`,
        formData
      );
      setShowEditForm(false);
      setCurrentAddress(null);
      fetchAddresses();
    } catch (err) {
      console.error("Error updating address:", err);
      setError(err.response?.data?.error || "Failed to update address");
    }
  };

  const handleDelete = async (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await apiClient.delete(`${API_ROUTES.auth.addresses}/${addressId}`);
        fetchAddresses();
      } catch (err) {
        console.error("Error deleting address:", err);
        setError(err.response?.data?.error || "Failed to delete address");
      }
    }
  };

  const handleSetDefault = async (addressId) => {
    try {
      await apiClient.patch(`${API_ROUTES.auth.addresses}/${addressId}`, {
        isDefault: true,
      });
      fetchAddresses();
    } catch (err) {
      console.error("Error setting default address:", err);
      setError(err.response?.data?.error || "Failed to set default address");
    }
  };

  if (loading)
    return <div className="text-center py-8">Loading addresses...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#FFF2EB] to-[#FFCDCD] text-[#2f153c]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Manage Your Addresses
        </h1>

        {!showAddForm && !showEditForm && (
          <div className="mb-8">
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#2f153c] text-white rounded-lg hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-200 font-medium"
            >
              <Plus className="h-5 w-5" /> Add New Address
            </button>
          </div>
        )}

        {(showAddForm || showEditForm) && (
          <div className="bg-gradient-to-br from-[#FFdcdc] to-[#FFf2eb] backdrop-blur-sm rounded-xl shadow-md overflow-hidden p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6">
              {showAddForm ? "Add New Address" : "Edit Address"}
            </h2>
            <form
              key={showAddForm ? "add-form" : "edit-form"}
              onSubmit={showAddForm ? handleAddSubmit : handleEditSubmit}
              className="space-y-6"
            >
              {showAddForm && (
                <button
                  type="button"
                  onClick={handleAutofillGeolocation}
                  disabled={geolocating}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#2f153c]/20 text-[#2f153c] rounded-lg hover:bg-[#FFE8CD]/70 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                >
                  {geolocating ? (
                    "Locating..."
                  ) : (
                    <>
                      <LocateFixed className="h-5 w-5" /> Autofill with Current
                      Location
                    </>
                  )}
                </button>
              )}
              <div>
                <label
                  htmlFor="label"
                  className="block text-sm font-medium text-[#2f153c] mb-1"
                >
                  Label (e.g., Home, Work)
                </label>
                <div className="flex flex-wrap gap-4">
                    {['Home', 'Office', 'Relative', 'Other'].map((option) => (
                      <label key={option} className="inline-flex items-center">
                        <input
                          type="radio"
                          name="label"
                          value={option}
                          checked={formData.label === option}
                          onChange={handleChange}
                          className="form-radio h-4 w-4 text-[#2f153c] transition duration-150 ease-in-out"
                        />
                        <span className="ml-2 text-[#2f153c]">{option}</span>
                      </label>
                    ))}
                  </div>
                  {formData.label === 'Other' && (
                    <input
                      type="text"
                      id="otherLabel"
                      name="label"
                      value={formData.label !== 'Home' && formData.label !== 'Office' && formData.label !== 'Relative' && formData.label !== 'Other' ? formData.label : ''}
                      onChange={handleChange}
                      placeholder="Enter custom label"
                      className="w-full px-4 py-3 mt-2 bg-white/80 border border-[#2f153c]/20 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
                    />
                  )}
              </div>
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-[#2f153c] mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/80 border border-[#2f153c]/20 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-[#2f153c] mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/80 border border-[#2f153c]/20 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor="street"
                  className="block text-sm font-medium text-[#2f153c] mb-1"
                >
                  Street
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/80 border border-[#2f153c]/20 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor="line1"
                  className="block text-sm font-medium text-[#2f153c] mb-1"
                >
                  Address Line 1
                </label>
                <input
                  type="text"
                  id="line1"
                  name="line1"
                  value={formData.line1}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/80 border border-[#2f153c]/20 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor="line2"
                  className="block text-sm font-medium text-[#2f153c] mb-1"
                >
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  id="line2"
                  name="line2"
                  value={formData.line2}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/80 border border-[#2f153c]/20 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-[#2f153c] mb-1"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/80 border border-[#2f153c]/20 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-[#2f153c] mb-1"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/80 border border-[#2f153c]/20 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium text-[#2f153c] mb-1"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/80 border border-[#2f153c]/20 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isDefault"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#2f153c] focus:ring-[#FFD6BA] border-gray-300 rounded"
                />
                <label
                  htmlFor="isDefault"
                  className="ml-2 block text-sm text-[#2f153c]"
                >
                  Set as default address
                </label>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#2f153c] text-white rounded-lg hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-200 font-medium"
                >
                  {showAddForm ? "Add Address" : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setShowEditForm(false);
                    setCurrentAddress(null);
                    setError(null);
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#2f153c]/20 text-[#2f153c] rounded-lg hover:bg-[#FFE8CD]/70 transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.length === 0 ? (
            <p className="md:col-span-2 text-center text-[#2f153c]/70">
              No addresses found. Add a new one!
            </p>
          ) : (
            addresses.map((address) => (
              <div
                key={address.id}
                className="bg-gradient-to-br from-[#FFdcdc] to-[#FFf2eb] backdrop-blur-sm rounded-xl shadow-md overflow-hidden p-6 relative"
              >
                {address.isDefault && (
                  <span className="absolute top-4 right-4 bg-[#2f153c] text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> Default
                  </span>
                )}
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-[#2f153c]/70" />{" "}
                  {address.label || "Address"}
                </h3>
                <p className="text-[#2f153c]/80">{address.fullName}</p>
                <p className="text-[#2f153c]/80">
                  {address.street}, {address.line1}
                </p>
                {address.line2 && (
                  <p className="text-[#2f153c]/80">{address.line2}</p>
                )}
                <p className="text-[#2f153c]/80">
                  {address.city}, {address.state} - {address.postalCode}
                </p>
                <p className="text-[#2f153c]/80">{address.country}</p>
                <p className="text-[#2f153c]/80">Phone: {address.phone}</p>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => handleEditClick(address)}
                    className="inline-flex items-center gap-1 px-3 py-1 border border-[#2f153c]/20 text-[#2f153c] rounded-lg hover:bg-[#FFE8CD]/70 transition-all duration-200 text-sm"
                  >
                    <Edit className="h-4 w-4" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    className="inline-flex items-center gap-1 px-3 py-1 border border-red-500 text-red-500 rounded-lg hover:bg-red-100 transition-all duration-200 text-sm"
                  >
                    <Trash2 className="h-4 w-4" /> Delete
                  </button>
                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-[#2f153c] text-white rounded-lg hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-200 text-sm"
                    >
                      Set as Default
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressManagement;
