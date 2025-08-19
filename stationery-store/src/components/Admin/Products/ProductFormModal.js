import React, { useState, useEffect, useRef } from "react";
import { X, Paperclip, Trash2 } from "lucide-react";
import { API_ROUTES } from "@/utils/apiRoutes";
import apiClient from "@/utils/apiClients";
import axios from "axios";

const ProductFormModal = ({
  isOpen,
  onClose,
  mode,
  productId,
  onSubmitSuccess,
}) => {
  const initialFormData = {
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
  };

  const [formData, setFormData] = useState(initialFormData);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]); // Track server images separately
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [modifiedFields, setModifiedFields] = useState({}); // Track which fields have been modified
  const originalData = useRef({}); // Store the original data for comparison

  // Reset form on close
  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormData);
      setImageFiles([]);
      setImagePreviews([]);
      setExistingImages([]);
      setFormErrors({});
      setModifiedFields({});
      originalData.current = {};
    }
  }, [isOpen]);

  // Fetch product for edit mode
  useEffect(() => {
    if (!isOpen || mode !== "edit" || !productId) return;

    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const { itemWithImages } = await apiClient.get(
          API_ROUTES.products.getById(productId)
        );
        
        const formattedData = {
          ...initialFormData,
          ...itemWithImages,
          id: itemWithImages.id,
          discountedPrice: itemWithImages.discountedPrice ?? "",
          isActive: itemWithImages.isActive ?? true,
        };
        
        // Set form data
        setFormData(formattedData);
        
        // Store original data for comparison
        originalData.current = { ...formattedData };
        
        // Reset modified fields
        setModifiedFields({});

        // Handle images
        if (itemWithImages.images?.length > 0) {
          const urls = itemWithImages.images.map(img => img.url);
          setExistingImages(urls);
          setImagePreviews(urls);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
        alert("Could not load product data");
        onClose();
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [isOpen, mode, productId]);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [id]: newValue
    }));
    
    // Track modified fields (only in edit mode)
    if (mode === "edit") {
      // Compare with original value
      const originalValue = originalData.current[id];
      const valueChanged = type === "checkbox" 
        ? originalValue !== checked
        : String(originalValue) !== String(value);
      
      if (valueChanged) {
        setModifiedFields(prev => ({
          ...prev,
          [id]: newValue
        }));
      } else {
        // If value is back to original, remove from modified fields
        setModifiedFields(prev => {
          const updated = { ...prev };
          delete updated[id];
          return updated;
        });
      }
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    
    setImageFiles(prev => [...prev, ...files]);
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    const preview = imagePreviews[index];
    
    if (preview.startsWith('blob:')) {
      // Remove new file
      const blobIndex = imagePreviews.slice(0, index + 1)
        .filter(p => p.startsWith('blob:')).length - 1;
      setImageFiles(prev => prev.filter((_, i) => i !== blobIndex));
    } else {
      // Remove existing image
      setExistingImages(prev => prev.filter(url => url !== preview));
    }
    
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.title) errors.title = "Title is required";
    if (!data.price || isNaN(Number(data.price))) errors.price = "Valid price is required";
    if (!data.stockQuantity || isNaN(Number(data.stockQuantity))) 
      errors.stockQuantity = "Valid stock quantity is required";
    if (!data.status) errors.status = "Status is required";
    if (data.discountedPrice && isNaN(Number(data.discountedPrice))) 
      errors.discountedPrice = "Must be a valid number";
    return errors;
  };

  const prepareFormData = (isCreate) => {
    const form = new FormData();
    
    // For create mode, use all fields
    // For update mode, use only modified fields
    const fieldsToUse = isCreate 
      ? { ...formData } 
      : { id: formData.id, ...modifiedFields };
    
    // Always include ID for updates
    if (!isCreate && !fieldsToUse.id) {
      fieldsToUse.id = formData.id;
    }
    
    // Convert numeric fields if they exist in fieldsToUse
    if (fieldsToUse.price) fieldsToUse.price = Number(fieldsToUse.price);
    if (fieldsToUse.stockQuantity) fieldsToUse.stockQuantity = Number(fieldsToUse.stockQuantity);
    
    // Handle discountedPrice
    if (fieldsToUse.discountedPrice !== undefined) {
      if (fieldsToUse.discountedPrice === "" || fieldsToUse.discountedPrice === null) {
        if (!isCreate) form.append("discountedPrice", "null");
      } else {
        fieldsToUse.discountedPrice = Number(fieldsToUse.discountedPrice);
      }
    }
    
    // Add fields to FormData
    Object.entries(fieldsToUse).forEach(([key, value]) => {
      if (value !== undefined && value !== "" && 
          !(isCreate && key === 'discountedPrice' && value === null)) {
        form.append(key, value);
      }
    });
    
    // Add new image files (if any)
    imageFiles.forEach(file => form.append("images", file));
    
    // For update: ALWAYS include existing image URLs
    // This is critical because the backend requires at least one image
    if (!isCreate) {
      // Always include existing images for updates, even if they weren't modified
      // This ensures the backend always has image data
      const cleanUrls = existingImages.map(url => 
        url.trim().replace(/`/g, '').replace(/^\s+|\s+$/g, '')
      );
      
      // Always append imagesUrls, even if empty array
      // This tells the backend explicitly what images to keep
      form.append("imagesUrls", JSON.stringify(cleanUrls));
      
      // Add a flag to indicate if we're updating images or not
      const isUpdatingImages = imageFiles.length > 0 || 
        JSON.stringify(existingImages) !== JSON.stringify(originalData.current.images?.map(img => img.url) || []);
      form.append("isUpdatingImages", isUpdatingImages.toString());
      
      // Log for debugging
      console.log("Existing images included in update:", cleanUrls);
      console.log("Is updating images:", isUpdatingImages);
    }
    
    return form;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Check for at least one image
    if (imagePreviews.length === 0) {
      alert("At least one product image is required");
      return;
    }
    
    // For edit mode, check if any changes were made
    if (mode === "edit" && 
        Object.keys(modifiedFields).length === 0 && 
        imageFiles.length === 0 && 
        JSON.stringify(existingImages) === JSON.stringify(originalData.current.images?.map(img => img.url) || [])) {
      alert("No changes detected. Please modify at least one field before saving.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const formDataToSend = prepareFormData(mode === "add");
      
      // Log what's being sent (for debugging)
      console.log("Sending data:", mode === "add" ? "All fields" : "Only modified fields");
      if (mode === "edit") {
        console.log("Modified fields:", Object.keys(modifiedFields));
      }
      
      let response;
      if (mode === "add") {
        response = await apiClient.post(
          API_ROUTES.products.create,
          formDataToSend,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        // For edit mode, let's use JSON instead of FormData for non-image updates
        if (imageFiles.length === 0) {
          // Use JSON for simple field updates
          const jsonData = { id: formData.id, ...modifiedFields };
          
          // Always include existing images
          jsonData.existingImages = existingImages.map(url => 
            url.trim().replace(/`/g, '').replace(/^\s+|\s+$/g, '')
          );
          
          response = await apiClient.put(
            API_ROUTES.products.update(formData.id),
            jsonData
          );
        } else {
          // Use FormData for updates with new images
          const axiosInstance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL,
          });
          
          // Add auth token
          const token = localStorage.getItem("auth_token");
          if (token) {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          }
          
          response = await axiosInstance.put(
            API_ROUTES.products.update(formData.id),
            formDataToSend,
            { 
              headers: { 
                'Content-Type': 'multipart/form-data' 
              } 
            }
          );
        }
        
        response = response.data; // Extract data to match apiClient format
      }
      
      console.log("Success:", response);
      onSubmitSuccess();
      onClose();
      
      // Optional: Remove if parent handles refresh
      window.location.reload();
    } catch (error) {
      console.error("Submit error:", error);
      const message = error.response?.data?.error || 
                     error.response?.data?.message || 
                     "An error occurred";
      alert(`Error: ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const renderField = (id, label, type = "text", props = {}) => (
    <div className={props.className}>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label} {props.required && "*"}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          value={formData[id] === null ? "" : formData[id]}
          onChange={handleInputChange}
          className={`w-full px-4 py-2 border rounded-lg ${
            formErrors[id] ? "border-red-500" : ""
          }`}
          {...props}
        />
      ) : type === "select" ? (
        <select
          id={id}
          value={formData[id] === null ? "" : formData[id]}
          onChange={handleInputChange}
          className={`w-full px-4 py-2 border rounded-lg ${
            formErrors[id] ? "border-red-500" : ""
          }`}
          {...props}
        >
          {props.children}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          value={formData[id] === null ? "" : formData[id]}
          onChange={handleInputChange}
          className={`w-full px-4 py-2 border rounded-lg ${
            formErrors[id] ? "border-red-500" : ""
          }`}
          {...props}
        />
      )}
      {formErrors[id] && (
        <p className="text-red-500 text-xs mt-1">{formErrors[id]}</p>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 text-[#2f153c] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold">
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
            {/* Main Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2">Main Information</h3>
              {renderField("title", "Title", "text", { required: true })}
              {renderField("description", "Full Description", "textarea", { 
                rows: 5, 
                required: true 
              })}
              {renderField("shortDesc", "Short Description", "textarea", { rows: 2 })}
            </div>

            {/* Images */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2">Product Images</h3>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Paperclip className="mx-auto h-12 w-12 text-gray-400" />
                <label className="relative cursor-pointer rounded-md font-medium text-[#2f153c] hover:underline">
                  <span>Upload new files</span>
                  <input
                    type="file"
                    multiple
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </label>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
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

            {/* Pricing & Inventory */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2">Pricing & Inventory</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderField("price", "Price", "number", { 
                  required: true, 
                  min: 0, 
                  step: 0.01 
                })}
                {renderField("discountedPrice", "Discounted Price", "number", { 
                  min: 0, 
                  step: 0.01 
                })}
                {renderField("stockQuantity", "Stock Quantity", "number", { 
                  required: true, 
                  min: 0 
                })}
                {renderField("productCode", "Product Code (SKU)", "text")}
              </div>
            </div>

            {/* Organization */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2">Organization</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderField("categoryId", "Category ID", "text", { 
                  placeholder: "e.g., c9a8b7-..." 
                })}
                {renderField("brand", "Brand", "text")}
              </div>
              {renderField("tags", "Tags (comma-separated)", "text", { 
                placeholder: "e.g., notebook, premium, office" 
              })}
            </div>

            {/* Shipping */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2">Shipping</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderField("weight", "Weight (kg)", "number", { 
                  min: 0, 
                  step: 0.01 
                })}
                {renderField("dimensions", "Dimensions (LxWxH cm)", "text", { 
                  placeholder: "e.g., 20x15x5" 
                })}
              </div>
            </div>

            {/* Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2">Settings</h3>
              {renderField("status", "Status", "select", {
                required: true,
                children: (
                  <>
                    <option value="DRAFT">Draft</option>
                    <option value="NORMAL">Normal</option>
                    <option value="FEATURE">Feature</option>
                  </>
                )
              })}
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

            {/* SEO */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2">SEO</h3>
              {renderField("metaTitle", "Meta Title", "text")}
              {renderField("metaDescription", "Meta Description", "textarea", { rows: 2 })}
            </div>

            {/* Submit Buttons */}
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
                disabled={isSubmitting || isLoading}
                className="px-6 py-2 bg-[#2f153c] text-white rounded-lg hover:bg-[#2f153c]/90 disabled:bg-gray-400"
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