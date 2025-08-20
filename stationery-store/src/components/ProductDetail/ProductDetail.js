"use client";
import React, { useState, useEffect, useRef } from "react";
import CartButton from "../CartButton";
import { API_ROUTES } from "@/utils/apiRoutes";
import apiClient from "@/utils/apiClients";

// Replacing imported images with placeholder URLs and SVG components

const ProductDetailsSection = ({ productId }) => {
  const [selectedVariant, setSelectedVariant] = useState("Option one");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Details");
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      if (!productId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await apiClient.get(API_ROUTES.users.getProductById(productId));
        if (response && response.itemWithImages) {
          setProduct(response.itemWithImages);
          console.log("ProductDetail.js - Fetched product:", response.itemWithImages);
        } else {
          setError("Product data structure is not as expected");
          console.error("ProductDetail.js - Unexpected product data structure:", response);
        }
      } catch (err) {
        setError("Failed to fetch product details");
        console.error("ProductDetail.js - Error fetching product:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  // Reference for the image slider
  const sliderRef = useRef(null);

  // If product is not found or loading, show loading state
  if (isLoading) {
    return (
      <section className="flex flex-col items-center gap-4 py-8 px-4 sm:px-6 lg:px-8 relative self-stretch w-full bg-gradient-to-b from-[#FFDCDC] to-[#FFF0E6]">
        <div className="flex flex-col items-center justify-center w-full py-20">
          <div className="w-12 h-12 border-4 border-t-transparent border-[#2f153c] rounded-full animate-spin"></div>
          <p className="mt-4 text-[#2f153c]">Loading product details...</p>
        </div>
      </section>
    );
  }

  // If there's an error, show error state
  if (error) {
    return (
      <section className="flex flex-col items-center gap-4 py-8 px-4 sm:px-6 lg:px-8 relative self-stretch w-full bg-gradient-to-b from-[#FFDCDC] to-[#FFF0E6]">
        <div className="flex flex-col items-center justify-center w-full py-20">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={() => window.location.href = '/products'}
            className="mt-4 px-4 py-2 bg-[#2f153c] text-white rounded-lg"
          >
            Back to Products
          </button>
        </div>
      </section>
    );
  }

  // If product is not found, use default values
  const breadcrumbItems = [
    { id: 1, label: "Shop all", isActive: false },
    { id: 2, label: product?.categoryId || "Category", isActive: false },
    { id: 3, label: product?.title || "Product name", isActive: true },
  ];

  // Use product images from API or placeholders if not available
  const productImages = product?.images?.length 
    ? product.images.map((img, index) => ({
        src: img.url,
        alt: img.altText || `${product.title} image ${index + 1}`
      }))
    : [
        { src: "https://placehold.co/600x400/2f153c/FFFFFF?text=Product+Image+1", alt: "Product image 1" },
        { src: "https://placehold.co/600x400/2f153c/FFFFFF?text=Product+Image+2", alt: "Product image 2" },
        { src: "https://placehold.co/600x400/2f153c/FFFFFF?text=Product+Image+3", alt: "Product image 3" },
        { src: "https://placehold.co/600x400/2f153c/FFFFFF?text=Product+Image+4", alt: "Product image 4" },
        { src: "https://placehold.co/600x400/2f153c/FFFFFF?text=Product+Image+5", alt: "Product image 5" },
      ];
  
  // Function to scroll the slider
  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Star ratings component will be rendered directly with SVG

  // Create variant options based on product data
  const variantOptions = [
    { label: product?.productCode || "Default", available: product?.stockQuantity > 0 },
  ];

  // Parse tags if available
  const productTags = product?.tags ? product.tags.split(',').map(tag => tag.trim()) : [];

  const tabOptions = ["Details", "Shipping", "Returns"];

  const handleVariantSelect = (variant) => {
    if (variantOptions.find((option) => option.label === variant)?.available) {
      setSelectedVariant(variant);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <section className="flex flex-col items-center gap-4 py-8 px-4 sm:px-6 lg:px-8 relative self-stretch w-full bg-gradient-to-b from-[#FFDCDC] to-[#FFF0E6]">
      <CartButton />
      {/* Two-column layout: Column 1 for images, Column 2 for text and buttons */}
      <div className="flex flex-col md:flex-row items-start gap-6 relative self-stretch w-full max-w-6xl mx-auto">
        {/* Column 1: Images */}
        <div className="flex flex-col w-full md:w-1/2 items-start gap-3 relative">
          {/* Main image */}
          <div className="w-full ">
            <img
              className="w-full h-25rem h-[25rem] max-h-[25rem] object-contain rounded-lg shadow-md"
              alt={productImages[selectedImageIndex].alt}
              src={productImages[selectedImageIndex].src}
            />
          </div>
          
          {/* Mobile horizontal image slider */}
          <div className="relative w-full md:hidden">
            <div 
              ref={sliderRef}
              className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-2 pb-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {productImages.map((image, index) => (
                <div 
                  key={index} 
                  className="flex-none w-[15.625rem] snap-start cursor-pointer"
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    className={`w-full h-[9.375rem] object-cover rounded-lg shadow-sm ${selectedImageIndex === index ? 'ring-2 ring-[#2f153c]' : ''}`}
                    alt={image.alt}
                    src={image.src}
                  />
                </div>
              ))}
            </div>
            
            {/* Slider navigation buttons */}
            <button 
              onClick={() => scrollSlider('left')} 
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md z-10"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-1.5rem w-1.5rem text-[#2f153c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => scrollSlider('right')} 
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md z-10"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-1.5rem w-1.5rem text-[#2f153c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Desktop thumbnail images */}
          <div className="hidden md:flex w-full gap-3">
            {productImages.map((image, index) => (
              <div 
                key={index} 
                className="w-1/4 cursor-pointer" 
                onClick={() => setSelectedImageIndex(index)}
              >
                <img
                  className={`w-full h-[6.25rem] object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ${selectedImageIndex === index ? 'ring-2 ring-[#2f153c]' : ''}`}
                  alt={image.alt}
                  src={image.src}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Text and buttons */}
        <div className="flex flex-col w-full md:w-1/2 items-start gap-4 relative">
          <nav
            className="flex w-full items-center gap-2 relative overflow-x-auto py-2 mb-1"
            aria-label="Breadcrumb"
          >
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <div
                  className={`relative whitespace-nowrap ${item.isActive ? "font-semibold text-[#2f153c]" : "font-normal text-[#2f153c]/80"}`}
                >
                  {item.label}
                </div>
                {index < breadcrumbItems.length - 1 && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="relative w-4 h-4 text-[#2f153c]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </React.Fragment>
            ))}
          </nav>

            {/* Product details, ratings, price, description, features, tabs, variants, quantity, and buttons */}
            <div className="flex flex-col items-start gap-4 relative self-stretch w-full">
              {/* Product name and price */}
              <div className="flex flex-col items-start gap-3 w-full">
                <h1 className="text-2xl md:text-3xl font-bold text-[#2f153c] leading-tight">
                  {product?.title || "Product name"}
                </h1>
                
                <div className="flex flex-wrap items-center justify-between w-full gap-2">
                  <div className="text-xl md:text-2xl font-bold text-[#2f153c]">
                    {product ? (
                      <>
                        {product.discountedPrice ? (
                          <>
                            <span>${product.discountedPrice.toFixed(2)}</span>
                            <span className="ml-2 text-lg line-through text-gray-500">${product.price.toFixed(2)}</span>
                          </>
                        ) : (
                          <span>${product.price.toFixed(2)}</span>
                        )}
                      </>
                    ) : "$0.00"}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <div
                      className="inline-flex items-center"
                      role="img"
                      aria-label="Product rating"
                    >
                      {[1, 2, 3, 4, 5].map((star, index) => (
                        <svg
                          key={index}
                          className={`w-4 h-4 ${index < (product?.rating || 0) ? "text-yellow-400" : "text-[#FFD6BA]"} fill-current`}
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm text-[#2f153c]/80 whitespace-nowrap">
                      {product?.rating || 0} ({product?.reviewCount || 0} reviews)
                    </p>
                  </div>
                </div>
              </div>

              {/* Product description and features */}
              <div className="flex flex-col items-start gap-3 w-full">
                <p className="text-sm md:text-base text-[#2f153c]/80 leading-relaxed">
                  {product?.description || "No description available"}
                </p>

                {product?.shortDesc && (
                  <ul className="flex flex-col items-start gap-1 w-full">
                    <li className="flex items-center gap-2 w-full">
                      <svg className="w-4 h-4 text-[#2f153c] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="flex-1 text-sm md:text-base text-[#2f153c]/80 leading-relaxed">
                        {product.shortDesc}
                      </p>
                    </li>
                  </ul>
                )}
              </div>

              {/* Tabs section */}
              <div className="flex flex-col items-start gap-3 w-full">
                <div
                  className="flex items-start gap-4 pt-1 w-full overflow-x-auto scrollbar-hide"
                  role="tablist"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {tabOptions.map((tab) => (
                    <div
                      key={tab}
                      className="inline-flex flex-col items-start gap-1 flex-shrink-0"
                    >
                      <button
                        className="text-sm md:text-base font-medium text-[#2f153c] hover:text-[#FFD6BA] transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2f153c]"
                        onClick={() => setActiveTab(tab)}
                        role="tab"
                        aria-selected={activeTab === tab}
                      >
                        {tab}
                      </button>
                      {activeTab === tab && (
                        <div className="w-full h-px bg-[#2f153c]" />
                      )}
                    </div>
                  ))}
                </div>

                <div
                  role="tabpanel"
                  aria-labelledby={`${activeTab.toLowerCase()}-tab`}
                  className="w-full"
                >
                  {activeTab === "Details" ? (
                    <div className="text-sm md:text-base text-[#2f153c]/80 leading-relaxed">
                      <p>{product?.description || "No details available"}</p>
                      {product?.dimensions && (
                        <p className="mt-2"><strong>Dimensions:</strong> {product.dimensions}</p>
                      )}
                      {product?.weight && (
                        <p><strong>Weight:</strong> {product.weight}g</p>
                      )}
                      {productTags.length > 0 && (
                        <div className="mt-2">
                          <strong>Tags:</strong>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {productTags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-[#FFD6BA]/30 text-[#2f153c] text-xs rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : activeTab === "Shipping" ? (
                    <p className="text-sm md:text-base text-[#2f153c]/80 leading-relaxed">
                      Free shipping on orders over $50. Standard delivery in 3-5 business days.
                    </p>
                  ) : (
                    <p className="text-sm md:text-base text-[#2f153c]/80 leading-relaxed">
                      Returns accepted within 30 days of delivery. Item must be unused and in original packaging.
                    </p>
                  )}
                </div>
              </div>

              {/* Variant selection */}
              <fieldset className="flex flex-col w-full items-start gap-2">
                <legend className="text-sm md:text-base font-medium text-[#2f153c]">
                  Variant
                </legend>

                <div className="flex flex-wrap items-start gap-2 w-full">
                  {variantOptions.map((option, index) => (
                    <button
                      key={option.label}
                      className={`inline-flex items-center justify-center px-3 py-1.5 border border-solid border-[#2f153c] rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2f153c] ${
                        selectedVariant === option.label
                          ? "bg-[#2f153c] text-white"
                          : option.available 
                            ? "hover:bg-[#FFD6BA] hover:text-[#2f153c]"
                            : "opacity-25 cursor-not-allowed"
                      }`}
                      onClick={() => option.available && handleVariantSelect(option.label)}
                      disabled={!option.available}
                    >
                      <span
                        className={`text-sm md:text-base font-medium whitespace-nowrap ${
                          selectedVariant === option.label
                            ? "text-white"
                            : "text-[#2f153c]"
                        }`}
                      >
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* Quantity selection */}
              <div className="flex items-center gap-4 w-full">
                <label
                  htmlFor="quantity-input"
                  className="text-sm md:text-base font-medium text-[#2f153c]"
                >
                  Quantity
                </label>

                <div className="flex items-center">
                  <button 
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1 || !product?.stockQuantity}
                    className="px-2 py-1 border border-solid border-[#2f153c] border-r-0 rounded-l-lg text-[#2f153c] disabled:opacity-50"
                  >
                    -
                  </button>
                  <input
                    id="quantity-input"
                    type="number"
                    min="1"
                    max={product?.stockQuantity || 1}
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(Number.parseInt(e.target.value) || 1)
                    }
                    className="flex w-[3.125rem] items-center text-center p-1 border-y border-solid border-[#2f153c] text-sm md:text-base text-[#2f153c] focus:outline-none"
                    disabled={!product?.stockQuantity}
                  />
                  <button 
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={!product?.stockQuantity || (product && quantity >= product.stockQuantity)}
                    className="px-2 py-1 border border-solid border-[#2f153c] border-l-0 rounded-r-lg text-[#2f153c] disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-[#2f153c]/70">
                  {product?.stockQuantity > 0 
                    ? `${product.stockQuantity} in stock` 
                    : "Out of stock"}
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col items-start gap-3 w-full mt-2">
                <div className="flex flex-col sm:flex-row w-full items-center gap-3">
                  <button 
                    onClick={() => {
                      // Import dynamically to avoid SSR issues
                      import('../../utils/cartUtils').then(({ addToCart }) => {
                        if (product && product.stockQuantity > 0) {
                          addToCart(product, quantity, selectedVariant);
                          window.dispatchEvent(new Event('cartUpdated'));
                          // Show a toast or notification
                        }
                      });
                    }}
                    disabled={!product?.stockQuantity}
                    className={`flex items-center justify-center px-4 py-2 w-full border border-solid border-[#2f153c] rounded-lg shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2f153c] ${product?.stockQuantity > 0 ? 'bg-[#2f153c] text-white cursor-pointer hover:bg-[#2f153c]/90' : 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300'}`}
                  >
                    <span className="text-sm md:text-base font-medium whitespace-nowrap">
                      {product?.stockQuantity > 0 ? 'Add To Cart' : 'Out of Stock'}
                    </span>
                  </button>

                  <button 
                    onClick={() => {
                      // Import dynamically to avoid SSR issues
                      import('../../utils/cartUtils').then(({ addToCart }) => {
                        if (product && product.stockQuantity > 0) {
                          addToCart(product, quantity, selectedVariant);
                          // Navigate to cart page
                          window.location.href = '/cart';
                        }
                      });
                    }}
                    disabled={!product?.stockQuantity}
                    className={`flex items-center justify-center px-4 py-2 w-full border border-solid rounded-lg shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2f153c] ${product?.stockQuantity > 0 ? 'border-[#2f153c] text-[#2f153c] cursor-pointer hover:bg-[#FFD6BA] hover:text-[#2f153c]' : 'border-gray-300 text-gray-500 cursor-not-allowed'}`}
                  >
                    <span className="text-sm md:text-base font-medium whitespace-nowrap">
                      {product?.stockQuantity > 0 ? 'Buy Now' : 'Out of Stock'}
                    </span>
                  </button>
                </div>

                <p className="w-full text-xs text-[#2f153c]/70 text-center">
                  Free shipping over $50
                </p>
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}
    </section>
  );
};


export default ProductDetailsSection;