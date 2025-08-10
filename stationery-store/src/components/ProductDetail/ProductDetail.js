"use client";
import React, { useState, useEffect, useRef } from "react";
// Replacing imported images with placeholder URLs and SVG components

// Sample product data - in a real app, this would come from an API or database
const productData = [
  {
    id: "1",
    name: "Notebook Set",
    category: "Notebooks",
    variant: "Classic",
    price: "$55",
    image: "https://placehold.co/600x400/2f153c/FFFFFF?text=Notebook+Set",
    description: "High-quality notebook set with premium paper. Perfect for journaling, sketching, or taking notes. Includes 3 different sizes.",
    features: ["Acid-free paper", "Hardcover binding", "Elastic closure", "Inner pocket"]
  },
  {
    id: "2",
    name: "Pen Collection",
    category: "Pens",
    variant: "Gel",
    price: "$55",
    image: "https://placehold.co/600x400/2f153c/FFFFFF?text=Pen+Collection",
    description: "Smooth-writing gel pens in various colors. Ideal for everyday writing, art projects, or bullet journaling.",
    features: ["Smudge-resistant", "Quick-drying ink", "Comfortable grip", "0.5mm fine point"]
  },
  {
    id: "3",
    name: "Sticky Notes",
    category: "Sticky Notes",
    variant: "Bright",
    price: "$55",
    image: "https://placehold.co/600x400/2f153c/FFFFFF?text=Sticky+Notes",
    description: "Vibrant sticky notes in assorted colors and sizes. Perfect for reminders, bookmarks, or color-coding your notes.",
    features: ["Strong adhesive", "Recyclable paper", "Multiple sizes", "Bright colors"]
  },
  {
    id: "4",
    name: "Planner Book",
    category: "Planners",
    variant: "Daily",
    price: "$55",
    image: "https://placehold.co/600x400/2f153c/FFFFFF?text=Planner+Book",
    description: "Comprehensive daily planner with sections for goals, tasks, and notes. Stay organized and boost productivity.",
    features: ["12-month calendar", "Goal tracking", "Task prioritization", "Habit tracker"]
  },
  {
    id: "5",
    name: "Art Supplies",
    category: "Art Supplies",
    variant: "Mixed",
    price: "$55",
    image: "https://placehold.co/600x400/2f153c/FFFFFF?text=Art+Supplies",
    description: "Complete art supply kit for beginners and professionals. Includes pencils, markers, and watercolors.",
    features: ["Professional quality", "Vibrant colors", "Storage case included", "Suitable for all skill levels"]
  },
  {
    id: "6",
    name: "Craft Kit",
    category: "Craft Kits",
    variant: "Complete",
    price: "$55",
    image: "https://placehold.co/600x400/2f153c/FFFFFF?text=Craft+Kit",
    description: "All-in-one craft kit with scissors, glue, tape, and more. Everything you need for your DIY projects.",
    features: ["Premium scissors", "Acid-free glue", "Washi tape collection", "Craft storage box"]
  },
  {
    id: "7",
    name: "Greeting Cards",
    category: "Cards",
    variant: "Assorted",
    price: "$55",
    image: "https://placehold.co/600x400/2f153c/FFFFFF?text=Greeting+Cards",
    description: "Beautiful greeting cards for all occasions. Blank inside for your personal message.",
    features: ["High-quality cardstock", "Envelopes included", "Various designs", "Eco-friendly materials"]
  },
  {
    id: "8",
    name: "Premium Bundle",
    category: "Bundles",
    variant: "Variant",
    price: "$55",
    image: "https://placehold.co/600x400/2f153c/FFFFFF?text=Premium+Bundle",
    description: "Our best-selling stationery items bundled together at a special price. The perfect gift for stationery lovers.",
    features: ["Notebook set", "Pen collection", "Planner", "Gift packaging available"]
  },
];

const ProductDetailsSection = ({ productId }) => {
  const [selectedVariant, setSelectedVariant] = useState("Option one");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Details");
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    // Find the product with the matching ID
    if (productId) {
      const foundProduct = productData.find(p => p.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [productId]);

  // If product is not found, use default values
  const breadcrumbItems = [
    { id: 1, label: "Shop all", isActive: false },
    { id: 2, label: product ? product.category : "Category", isActive: false },
    { id: 3, label: product ? product.name : "Product name", isActive: true },
  ];

  // Use placeholder images if product image is not available
  const productImages = [
    { src: product?.image || "https://placehold.co/600x400/2f153c/FFFFFF?text=Product+Image+1", alt: `${product?.name || 'Product'} image 1` },
    { src: "https://placehold.co/600x400/2f153c/FFFFFF?text=Product+Image+2", alt: `${product?.name || 'Product'} image 2` },
    { src: "https://placehold.co/600x400/2f153c/FFFFFF?text=Product+Image+3", alt: `${product?.name || 'Product'} image 3` },
    { src: "https://placehold.co/600x400/2f153c/FFFFFF?text=Product+Image+4", alt: `${product?.name || 'Product'} image 4` },
    { src: "https://placehold.co/600x400/2f153c/FFFFFF?text=Product+Image+5", alt: `${product?.name || 'Product'} image 5` },
  ];
  
  // Reference for the image slider
  const sliderRef = useRef(null);
  
  // Function to scroll the slider
  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Star ratings component will be rendered directly with SVG

  const variantOptions = [
    { label: product?.variant || "Option one", available: true },
    { label: "Option Two", available: true },
    { label: "Option Three", available: false },
  ];

  // Use product features if available, otherwise use default
  const productFeatures = product?.features || [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  ];

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
    <section className="flex flex-col items-center gap-4 py-8 px-4 sm:px-6 lg:px-8 relative self-stretch w-full bg-gradient-to-b from-[#FFF2EB] to-[#FFE8CD]">
      {/* Two-column layout: Column 1 for images, Column 2 for text and buttons */}
      <div className="flex flex-col md:flex-row items-start gap-6 relative self-stretch w-full max-w-6xl mx-auto">
        {/* Column 1: Images */}
        <div className="flex flex-col w-full md:w-1/2 items-start gap-3 relative">
          {/* Main image */}
          <div className="w-full">
            <img
              className="w-full h-25rem max-h-[25rem] object-contain rounded-lg shadow-md"
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
                  {product ? product.name : "Product name"}
                </h1>
                
                <div className="flex flex-wrap items-center justify-between w-full gap-2">
                  <div className="text-xl md:text-2xl font-bold text-[#2f153c]">
                    {product ? product.price : "$55"}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <div
                      className="inline-flex items-center"
                      role="img"
                      aria-label="4.5 out of 5 stars"
                    >
                      {[1, 2, 3, 4, 5].map((star, index) => (
                        <svg
                          key={index}
                          className="w-4 h-4 text-[#FFD6BA] fill-current"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm text-[#2f153c]/80 whitespace-nowrap">
                      (3.5 stars) • 10 reviews
                    </p>
                  </div>
                </div>
              </div>

              {/* Product description and features */}
              <div className="flex flex-col items-start gap-3 w-full">
                <p className="text-sm md:text-base text-[#2f153c]/80 leading-relaxed">
                  {product ? product.description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique."}
                </p>

                <ul className="flex flex-col items-start gap-1 w-full">
                  {productFeatures.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 w-full"
                    >
                      <svg className="w-4 h-4 text-[#2f153c] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="flex-1 text-sm md:text-base text-[#2f153c]/80 leading-relaxed">
                        {feature}
                      </p>
                    </li>
                  ))}
                </ul>
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
                  <p className="text-sm md:text-base text-[#2f153c]/80 leading-relaxed">
                    {activeTab === "Details" ? "Product details and specifications." : 
                     activeTab === "Shipping" ? "Free shipping on orders over $50. Standard delivery in 3-5 business days." : 
                     "Returns accepted within 30 days of delivery. Item must be unused and in original packaging."}
                  </p>
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
                    disabled={quantity <= 1}
                    className="px-2 py-1 border border-solid border-[#2f153c] border-r-0 rounded-l-lg text-[#2f153c] disabled:opacity-50"
                  >
                    -
                  </button>
                  <input
                    id="quantity-input"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(Number.parseInt(e.target.value) || 1)
                    }
                    className="flex w-[3.125rem] items-center text-center p-1 border-y border-solid border-[#2f153c] text-sm md:text-base text-[#2f153c] focus:outline-none"
                  />
                  <button 
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="px-2 py-1 border border-solid border-[#2f153c] border-l-0 rounded-r-lg text-[#2f153c]"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col items-start gap-3 w-full mt-2">
                <div className="flex flex-col sm:flex-row w-full items-center gap-3">
                  <button 
                    onClick={() => {
                      // Import dynamically to avoid SSR issues
                      import('../../utils/cartUtils').then(({ addToCart }) => {
                        if (product) {
                          addToCart(product, quantity, selectedVariant);
                          // Show a toast or notification
                          alert(`${product.name} added to cart!`);
                        }
                      });
                    }}
                    className="flex items-center justify-center px-4 py-2 w-full bg-[#2f153c] border border-solid border-[#2f153c] rounded-lg shadow-sm text-white cursor-pointer hover:bg-[#2f153c]/90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2f153c]"
                  >
                    <span className="text-sm md:text-base font-medium text-white whitespace-nowrap">
                      Add To Cart
                    </span>
                  </button>

                  <button 
                    onClick={() => {
                      // Import dynamically to avoid SSR issues
                      import('../../utils/cartUtils').then(({ addToCart }) => {
                        if (product) {
                          addToCart(product, quantity, selectedVariant);
                          // Navigate to cart page
                          window.location.href = '/cart';
                        }
                      });
                    }}
                    className="flex items-center justify-center px-4 py-2 w-full border border-solid border-[#2f153c] rounded-lg shadow-sm cursor-pointer hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2f153c]"
                  >
                    <span className="text-sm md:text-base font-medium text-[#2f153c] whitespace-nowrap">
                      Buy Now
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