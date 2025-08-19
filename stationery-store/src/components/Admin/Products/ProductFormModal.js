"use client";

import React, { useState, useEffect } from "react";
import { X, Paperclip, Trash2 } from "lucide-react";
import { API_ROUTES } from "@/utils/apiRoutes";
import apiClient from "@/utils/apiClients";

const ProductFormModal = ({
  isOpen,
  onClose,
  mode,
  productId,
  onSubmitSuccess,
}) => {
  const getInitialFormData = () => ({
    title: "",
    description: "",
    shortDesc: "",
    price: "",
    discountedPrice: "",
    productCode: "",
    stockQuantity: "",
    categoryId: "",
    brand: "",
    tags: "",
    status: "DRAFT",
    isActive: true,
    weight: "",
    dimensions: "",
    metaTitle: "",
    metaDescription: "",
  });

  const [formData, setFormData] = useState(getInitialFormData());
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Reset form when modal is closed
  useEffect(() => {
    if (!isOpen) {
      // Reset all form state when modal is closed
      setFormData(getInitialFormData());
      setImageFiles([]);
      setImagePreviews([]);
      setExistingImageUrls([]);
      setFormErrors({});
    }
  }, [isOpen]);

  // Fetch product details when modal opens in edit mode
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!isOpen) return; // Don't fetch if modal is closed
      
      if (mode === "edit" && productId) {
        setIsLoading(true);
        try {
          const response = await apiClient.get(
            API_ROUTES.products.getById(productId)
          );
          const productData = response.itemWithImages;
          console.log("Fetched product data:", productData);

          setFormData({
            id: productData.id || "",
            title: productData.title || "",
            description: productData.description || "",
            shortDesc: productData.shortDesc || "",
            price: productData.price || "",
            discountedPrice: productData.discountedPrice ?? "",
            productCode: productData.productCode || "",
            stockQuantity: productData.stockQuantity || "",
            categoryId: productData.categoryId || "",
            brand: productData.brand || "",
            tags: productData.tags || "",
            status: productData.status || "DRAFT",
            isActive:
              productData.isActive !== undefined ? productData.isActive : true,
            weight: productData.weight || "",
            dimensions: productData.dimensions || "",
            metaTitle: productData.metaTitle || "",
            metaDescription: productData.metaDescription || "",
          });

          if (productData.images && productData.images.length > 0) {
            const imageUrls = productData.images.map((img) => img.url);
            setImagePreviews(imageUrls);
            setExistingImageUrls(imageUrls); // Track existing images separately
            console.log("Loaded existing images:", imageUrls);
          } else {
            setImagePreviews([]);
            setExistingImageUrls([]);
          }
        } catch (error) {
          console.error("Failed to fetch product details:", error);
          alert("Could not load product data. Please close and try again.");
          onClose();
        } finally {
          setIsLoading(false);
        }
      } else if (mode === "add") {
        // For add mode, ensure we start with clean state
        setFormData(getInitialFormData());
        setImageFiles([]);
        setImagePreviews([]);
        setExistingImageUrls([]);
        setFormErrors({});
      }
    };

    if (isOpen) {
      fetchProductDetails();
    }
  }, [isOpen, mode, productId]);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;

    let finalValue;
    if (type === "checkbox") {
      finalValue = checked;
    } else if (type === "number") {
      finalValue = value === "" ? "" : parseFloat(value);
    } else {
      finalValue = value;
    }

    setFormData((prev) => ({ ...prev, [id]: finalValue }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  // Track which images are existing (from server) vs new (from file upload)
  const [existingImageUrls, setExistingImageUrls] = useState([]);

  const removeImage = (index) => {
    const previewUrl = imagePreviews[index];
    
    // If it's a blob URL, it's a new file upload
    if (previewUrl.startsWith('blob:')) {
      // Find the index in imageFiles that corresponds to this preview
      const fileIndex = imageFiles.findIndex(file => 
        URL.createObjectURL(file).includes(previewUrl.split('/').pop())
      );
      
      if (fileIndex !== -1) {
        // Remove from imageFiles if found
        setImageFiles(prev => prev.filter((_, i) => i !== fileIndex));
      }
    } else {
      // It's an existing image from the server
      setExistingImageUrls(prev => prev.filter(url => url !== previewUrl));
    }
    
    // Remove from previews in any case
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Validate form data
  const validateForm = (data) => {
    const errors = {};
    
    // Required fields
    if (!data.title) errors.title = "Title is required";
    if (!data.price) errors.price = "Price is required";
    if (!data.stockQuantity) errors.stockQuantity = "Stock quantity is required";
    if (!data.status) errors.status = "Status is required";
    
    // Numeric validation
    if (data.price && isNaN(parseFloat(data.price))) {
      errors.price = "Price must be a number";
    }
    
    if (data.discountedPrice && isNaN(parseFloat(data.discountedPrice))) {
      errors.discountedPrice = "Discounted price must be a number";
    }
    
    if (data.stockQuantity && isNaN(parseInt(data.stockQuantity))) {
      errors.stockQuantity = "Stock quantity must be a number";
    }
    
    return errors;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form data
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }
    
    try {
      let response;
      
      if (mode === "add") {
        // For create, we need all fields and FormData for file uploads
        const submissionData = new FormData();
        
        // Create a clean copy with proper type conversions for create
        const cleanedFormData = {
          ...formData,
          price: Number(formData.price),
          stockQuantity: Number(formData.stockQuantity),
          discountedPrice: formData.discountedPrice === "" || formData.discountedPrice === null 
            ? null 
            : Number(formData.discountedPrice)
        };
        
        // Add all form fields
        for (const key in cleanedFormData) {
          if (cleanedFormData[key] !== undefined) {
            if (key === 'discountedPrice' && cleanedFormData[key] === null) {
              // Skip null discountedPrice for create
              continue;
            }
            submissionData.append(key, cleanedFormData[key]);
          }
        }
        
        // Add image files
        imageFiles.forEach((file) => {
          submissionData.append("images", file);
        });
        
        console.log("Creating new product...");
        response = await apiClient.post(
          API_ROUTES.products.create, 
          submissionData, 
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Create response:", response);
      } else {
        // For update, only send changed fields
        // First, handle the existing images
        const remainingExistingUrls = imagePreviews
          .filter(url => !url.startsWith('blob:') && existingImageUrls.includes(url));
        
        console.log("Remaining existing images:", remainingExistingUrls);
        
        // If we have new image files, we need to use FormData
        if (imageFiles.length > 0) {
          const submissionData = new FormData();
          
          // Only include the ID and changed fields
          submissionData.append("id", formData.id);
          
          // Handle numeric fields specially
          if (formData.price) submissionData.append("price", Number(formData.price));
          if (formData.stockQuantity) submissionData.append("stockQuantity", Number(formData.stockQuantity));
          
          // Handle discountedPrice specially
          if (formData.discountedPrice === "" || formData.discountedPrice === null) {
            submissionData.append("discountedPrice", "null");
          } else if (formData.discountedPrice) {
            submissionData.append("discountedPrice", Number(formData.discountedPrice));
          }
          
          // Add other changed fields
          for (const key in formData) {
            // Skip fields we've already handled
            if (key === 'id' || key === 'price' || key === 'stockQuantity' || key === 'discountedPrice') {
              continue;
            }
            
            // Only include fields that have values
            if (formData[key] !== undefined && formData[key] !== "") {
              submissionData.append(key, formData[key]);
            }
          }
          
          // Add new image files
          imageFiles.forEach((file) => {
            submissionData.append("images", file);
          });
          
          // Add existing image URLs
          submissionData.append("imagesUrls", JSON.stringify(remainingExistingUrls));
          
          console.log("Updating product with new images...");
          const updateUrl = API_ROUTES.products.update(formData.id);
          console.log("Update URL:", updateUrl);
          
          response = await apiClient.put(
            updateUrl,
            submissionData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
          console.log("Update response:", response);
        } else {
          // If no new images, use direct JSON approach which preserves types better
          // Only include the changed fields
          const updateData = {
            id: formData.id
          };
          
          // Handle numeric fields specially
          if (formData.price) updateData.price = Number(formData.price);
          if (formData.stockQuantity) updateData.stockQuantity = Number(formData.stockQuantity);
          
          // Handle discountedPrice specially
          if (formData.discountedPrice === "" || formData.discountedPrice === null) {
            updateData.discountedPrice = null;
          } else if (formData.discountedPrice) {
            updateData.discountedPrice = Number(formData.discountedPrice);
          }
          
          // Add other changed fields
          for (const key in formData) {
            // Skip fields we've already handled
            if (key === 'id' || key === 'price' || key === 'stockQuantity' || key === 'discountedPrice') {
              continue;
            }
            
            // Only include fields that have values
            if (formData[key] !== undefined && formData[key] !== "") {
              updateData[key] = formData[key];
            }
          }
          
          // Include remaining images
          updateData.imagesUrls = remainingExistingUrls;
          
          console.log("Updating product with JSON data:", updateData);
          const updateUrl = API_ROUTES.products.update(formData.id);
          console.log("Update URL:", updateUrl);
          
          response = await apiClient.put(
            updateUrl,
            updateData
          );
          console.log("Update response:", response);
        }
      }
      
      console.log("API Response:", response);
      
      // First call onSubmitSuccess to refresh data in parent component
      // This will trigger a refresh of the product table
      onSubmitSuccess();
      
      // Reset form state to ensure clean state
      setFormData(getInitialFormData());
      setImageFiles([]);
      setImagePreviews([]);
      setExistingImageUrls([]);
      setFormErrors({});
      
      // Then close the modal
      onClose();
      
      // Force a refresh of the page to ensure all data is updated
      window.location.reload();
    } catch (error) {
      console.error("Error submitting product:", error);
      
      // Show more detailed error information if available
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(`Error: ${error.response.data.error || error.response.data.message || "An error occurred while saving the product."}`);
      } else {
        alert("An error occurred while saving the product. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 text-[#2f153c] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold ">
            {mode === "add" ? "Add New Product" : "Edit Product"}
          </h2>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {isLoading ? (
          <div className="p-10 text-center">Loading product details...</div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* --- Main Information --- */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2">
                Main Information
              </h3>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-1"
                >
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-2 border rounded-lg ${formErrors.title ? 'border-red-500' : ''}`}
                />
                {formErrors.title && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-1"
                >
                  Full Description *
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="5"
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="shortDesc"
                  className="block text-sm font-medium mb-1"
                >
                  Short Description
                </label>
                <textarea
                  id="shortDesc"
                  value={formData.shortDesc}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-4 py-2 border rounded-lg"
                ></textarea>
              </div>
            </div>

            {/* --- Images --- */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2">
                Product Images
              </h3>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Paperclip className="mx-auto h-12 w-12 text-gray-400" />
                <label
                  htmlFor="images"
                  className="relative cursor-pointer rounded-md font-medium text-[#2f153c] hover:underline"
                >
                  <span>Upload new files</span>
                  <input
                    id="images"
                    name="images"
                    type="file"
                    multiple
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </label>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`preview ${index}`}
                        className="h-24 w-24 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* --- Pricing & Inventory --- */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2">
                Pricing & Inventory
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium mb-1"
                  >
                    Price *
                  </label>
                  <input
                    type="number"
                    id="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    required
                    className={`w-full px-4 py-2 border rounded-lg ${formErrors.price ? 'border-red-500' : ''}`}
                  />
                  {formErrors.price && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.price}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="discountedPrice"
                    className="block text-sm font-medium mb-1"
                  >
                    Discounted Price ($)
                  </label>
                  <input
                    type="number"
                    id="discountedPrice"
                    value={formData.discountedPrice}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label
                    htmlFor="stockQuantity"
                    className="block text-sm font-medium mb-1"
                  >
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    id="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleInputChange}
                    min="0"
                    required
                    className={`w-full px-4 py-2 border rounded-lg ${formErrors.stockQuantity ? 'border-red-500' : ''}`}
                  />
                  {formErrors.stockQuantity && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.stockQuantity}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="productCode"
                    className="block text-sm font-medium mb-1"
                  >
                    Product Code (SKU)
                  </label>
                  <input
                    type="text"
                    id="productCode"
                    value={formData.productCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* --- Organization --- */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2">
                Organization
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="categoryId"
                    className="block text-sm font-medium mb-1"
                  >
                    Category ID
                  </label>
                  <input
                    type="text"
                    id="categoryId"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="e.g., c9a8b7-..."
                  />
                </div>
                <div>
                  <label
                    htmlFor="brand"
                    className="block text-sm font-medium mb-1"
                  >
                    Brand
                  </label>
                  <input
                    type="text"
                    id="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium mb-1"
                >
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="e.g., notebook, premium, office"
                />
              </div>
            </div>

            {/* --- Shipping --- */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2">Shipping</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="weight"
                    className="block text-sm font-medium mb-1"
                  >
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    id="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label
                    htmlFor="dimensions"
                    className="block text-sm font-medium mb-1"
                  >
                    Dimensions (LxWxH cm)
                  </label>
                  <input
                    type="text"
                    id="dimensions"
                    value={formData.dimensions}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="e.g., 20x15x5"
                  />
                </div>
              </div>
            </div>

            {/* --- Settings --- */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2">Settings</h3>
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium mb-1"
                >
                  Status *
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-2 border rounded-lg ${formErrors.status ? 'border-red-500' : ''}`}
                >
                  <option value="DRAFT">Draft</option>
                  <option value="NORMAL">Normal</option>
                  <option value="FEATURE">Feature</option>
                </select>
                {formErrors.status && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.status}</p>
                )}
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm">
                  Product is Active
                </label>
              </div>
            </div>

            {/* --- SEO --- */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2">SEO</h3>
              <div>
                <label
                  htmlFor="metaTitle"
                  className="block text-sm font-medium mb-1"
                >
                  Meta Title
                </label>
                <input
                  type="text"
                  id="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label
                  htmlFor="metaDescription"
                  className="block text-sm font-medium mb-1"
                >
                  Meta Description
                </label>
                <textarea
                  id="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-4 py-2 border rounded-lg"
                ></textarea>
              </div>
            </div>

            {/* --- Submission --- */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#2f153c] text-white rounded-lg hover:bg-[#2f153c]/90 disabled:bg-gray-400"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting
                  ? "Saving..."
                  : mode === "add"
                  ? "Add Product"
                  : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductFormModal;
