"use client";
import React, { useState, useEffect } from "react";
// Replacing imported images with placeholder URLs and SVG components

// Sample product data - in a real app, this would come from an API or database
const productData = [
  {
    id: "1",
    name: "Notebook Set",
    category: "Notebooks",
    variant: "Classic",
    price: "$55",
    image: "https://placehold.co/600x800/2f153c/FFFFFF?text=Notebook+Set",
    description: "High-quality notebook set with premium paper. Perfect for journaling, sketching, or taking notes. Includes 3 different sizes.",
    features: ["Acid-free paper", "Hardcover binding", "Elastic closure", "Inner pocket"]
  },
  {
    id: "2",
    name: "Pen Collection",
    category: "Pens",
    variant: "Gel",
    price: "$55",
    image: "https://placehold.co/600x800/2f153c/FFFFFF?text=Pen+Collection",
    description: "Smooth-writing gel pens in various colors. Ideal for everyday writing, art projects, or bullet journaling.",
    features: ["Smudge-resistant", "Quick-drying ink", "Comfortable grip", "0.5mm fine point"]
  },
  {
    id: "3",
    name: "Sticky Notes",
    category: "Sticky Notes",
    variant: "Bright",
    price: "$55",
    image: "https://placehold.co/600x800/2f153c/FFFFFF?text=Sticky+Notes",
    description: "Vibrant sticky notes in assorted colors and sizes. Perfect for reminders, bookmarks, or color-coding your notes.",
    features: ["Strong adhesive", "Recyclable paper", "Multiple sizes", "Bright colors"]
  },
  {
    id: "4",
    name: "Planner Book",
    category: "Planners",
    variant: "Daily",
    price: "$55",
    image: "https://placehold.co/600x800/2f153c/FFFFFF?text=Planner+Book",
    description: "Comprehensive daily planner with sections for goals, tasks, and notes. Stay organized and boost productivity.",
    features: ["12-month calendar", "Goal tracking", "Task prioritization", "Habit tracker"]
  },
  {
    id: "5",
    name: "Art Supplies",
    category: "Art Supplies",
    variant: "Mixed",
    price: "$55",
    image: "https://placehold.co/600x800/2f153c/FFFFFF?text=Art+Supplies",
    description: "Complete art supply kit for beginners and professionals. Includes pencils, markers, and watercolors.",
    features: ["Professional quality", "Vibrant colors", "Storage case included", "Suitable for all skill levels"]
  },
  {
    id: "6",
    name: "Craft Kit",
    category: "Craft Kits",
    variant: "Complete",
    price: "$55",
    image: "https://placehold.co/600x800/2f153c/FFFFFF?text=Craft+Kit",
    description: "All-in-one craft kit with scissors, glue, tape, and more. Everything you need for your DIY projects.",
    features: ["Premium scissors", "Acid-free glue", "Washi tape collection", "Craft storage box"]
  },
  {
    id: "7",
    name: "Greeting Cards",
    category: "Cards",
    variant: "Assorted",
    price: "$55",
    image: "https://placehold.co/600x800/2f153c/FFFFFF?text=Greeting+Cards",
    description: "Beautiful greeting cards for all occasions. Blank inside for your personal message.",
    features: ["High-quality cardstock", "Envelopes included", "Various designs", "Eco-friendly materials"]
  },
  {
    id: "8",
    name: "Premium Bundle",
    category: "Bundles",
    variant: "Variant",
    price: "$55",
    image: "https://placehold.co/600x800/2f153c/FFFFFF?text=Premium+Bundle",
    description: "Our best-selling stationery items bundled together at a special price. The perfect gift for stationery lovers.",
    features: ["Notebook set", "Pen collection", "Planner", "Gift packaging available"]
  },
];

const ProductDetailsSection = ({ productId }) => {
  const [selectedVariant, setSelectedVariant] = useState("Option one");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Details");
  const [product, setProduct] = useState(null);

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
    { label: "Shop all", isActive: false },
    { label: product ? product.category : "Category", isActive: false },
    { label: product ? product.name : "Product name", isActive: true },
  ];

  // Use placeholder images if product image is not available
  const productImages = [
    { src: product?.image || "https://placehold.co/600x800/2f153c/FFFFFF?text=Product+Image+1", alt: `${product?.name || 'Product'} image 1` },
    { src: "https://placehold.co/600x800/2f153c/FFFFFF?text=Product+Image+2", alt: `${product?.name || 'Product'} image 2` },
    { src: "https://placehold.co/600x800/2f153c/FFFFFF?text=Product+Image+3", alt: `${product?.name || 'Product'} image 3` },
  ];

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
    <section className="flex flex-col items-center gap-6 py-12 px-4 sm:px-6 lg:px-8 relative self-stretch w-full flex-[0_0_auto] bg-gradient-to-b from-[#FFF2EB] to-[#FFE8CD]">
      {/* Two-column layout: Column 1 for images, Column 2 for text and buttons */}
      <div className="flex flex-col md:flex-row items-start gap-8 relative self-stretch w-full max-w-7xl">
        {/* Column 1: Images (50% for 1st image, 25% each for 2nd and 3rd) */}
        <div className="flex flex-col w-full md:w-1/2 items-start gap-4 relative">
          {/* Main image (50% of column width) */}
          <div className="w-full">
            <img
              className="w-full h-auto object-cover rounded-lg shadow-md"
              alt="Main product image"
              src={product?.image || "https://placehold.co/600x800/2f153c/FFFFFF?text=Main+Product+Image"}
            />
          </div>
          
          {/* Secondary images (25% each) with show all button on 3rd image */}
          <div className="flex w-full gap-4">
            {/* 2nd image (25%) */}
            <div className="w-1/2">
              <img
                className="w-full h-auto object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                alt={productImages[1]?.alt || "Product image 2"}
                src={productImages[1]?.src || "https://placehold.co/600x800/2f153c/FFFFFF?text=Product+Image+2"}
              />
            </div>
            
            {/* 3rd image (25%) with show all button overlay */}
            <div className="w-1/2 relative">
              <img
                className="w-full h-auto object-cover rounded-lg shadow-md"
                alt="Product image 3"
                src="https://placehold.co/600x800/2f153c/FFFFFF?text=Product+Image+3"
              />
              
              {/* Show all button overlay on 3rd image */}
              <div className="absolute inset-0 bg-[#2f153c]/50 rounded-lg flex items-center justify-center">
                <button
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-solid border-[#2f153c] rounded-lg shadow-md cursor-pointer hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2f153c]"
                  aria-label="Show all product photos"
                >
                  <span className="relative w-fit text-sm font-medium text-[#2f153c] whitespace-nowrap">
                    Show all photos
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Text and buttons */}
        <div className="flex flex-col w-full md:w-1/2 items-start gap-6 relative">
          <div className="flex flex-col items-start gap-6 relative self-stretch w-full">
            <nav
              className="flex w-full items-center gap-2 relative overflow-x-auto py-2"
              aria-label="Breadcrumb"
            >
              {breadcrumbItems.map((item, index) => (
                <React.Fragment key={item.label}>
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

           
          </div>

            {/* Product details, ratings, price, description, features, tabs, variants, quantity, and buttons */}
            <div className="flex flex-col items-start gap-6 relative self-stretch w-full">
              {/* Product name and price */}
              <div className="flex flex-col items-start gap-4 w-full">
                <h1 className="text-3xl md:text-4xl font-bold text-[#2f153c] leading-tight">
                  {product ? product.name : "Product name"}
                </h1>
                
                <div className="flex items-center justify-between w-full">
                  <div className="text-2xl md:text-3xl font-bold text-[#2f153c]">
                    {product ? product.price : "$55"}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div
                      className="inline-flex items-center gap-1"
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
              <div className="flex flex-col items-start gap-4 w-full">
                <p className="text-base text-[#2f153c]/80 leading-relaxed">
                  {product ? product.description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."}
                </p>

                <ul className="flex flex-col items-start gap-2 w-full">
                  {productFeatures.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-4 w-full"
                    >
                      <p className="flex-1 text-base text-[#2f153c]/80 leading-relaxed">
                        {feature}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tabs section */}
              <div className="flex flex-col items-start gap-6 w-full">
                <div
                  className="flex items-start gap-6 pt-2 w-full"
                  role="tablist"
                >
                  {tabOptions.map((tab) => (
                    <div
                      key={tab}
                      className="inline-flex flex-col items-start gap-2"
                    >
                      <button
                        className="text-base font-medium text-[#2f153c] hover:text-[#FFD6BA] transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2f153c]"
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
                >
                  <p className="text-base text-[#2f153c]/80 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse varius enim in eros elementum tristique. Duis
                    cursus, mi quis viverra ornare, eros dolor interdum nulla,
                    ut commodo diam libero vitae erat. Aenean faucibus nibh et
                    justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae
                    risus tristique posuere.
                  </p>
                </div>
              </div>

              {/* Variant selection */}
              <fieldset className="flex flex-col w-full items-start gap-2">
                <legend className="text-base font-medium text-[#2f153c]">
                  Variant
                </legend>

                <div className="flex flex-col items-start gap-4 w-full">
                  <div className="inline-flex items-start gap-4">
                    {variantOptions.slice(0, 2).map((option) => (
                      <button
                        key={option.label}
                        className={`inline-flex items-center justify-center gap-2 px-4 py-2 border border-solid border-[#2f153c] rounded-lg cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2f153c] ${
                          selectedVariant === option.label
                            ? "bg-[#2f153c] text-white"
                            : "hover:bg-[#FFD6BA] hover:text-[#2f153c]"
                        }`}
                        onClick={() => handleVariantSelect(option.label)}
                        disabled={!option.available}
                      >
                        <span
                          className={`text-base font-medium whitespace-nowrap ${
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

                  <button
                    className="opacity-25 inline-flex items-center justify-center gap-2 px-4 py-2 border border-solid border-[#2f153c] rounded-lg cursor-not-allowed"
                    disabled
                  >
                    <span className="text-base font-medium text-[#2f153c] whitespace-nowrap">
                      Option Three
                    </span>
                  </button>
                </div>
              </fieldset>

              {/* Quantity selection */}
              <div className="flex flex-col w-full items-start gap-2">
                <label
                  htmlFor="quantity-input"
                  className="text-base font-medium text-[#2f153c]"
                >
                  Quantity
                </label>

                <input
                  id="quantity-input"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    handleQuantityChange(Number.parseInt(e.target.value) || 1)
                  }
                  className="flex w-[66px] items-center gap-2 p-3 border border-solid border-[#2f153c] rounded-lg text-base text-[#2f153c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2f153c]"
                />
              </div>

              {/* Action buttons */}
              <div className="flex flex-col items-start gap-4 w-full">
                <div className="flex flex-col w-full items-start gap-4 pt-2">
                  <button className="flex items-center justify-center gap-2 px-6 py-3 w-full bg-[#2f153c] border border-solid border-[#2f153c] rounded-lg shadow-md text-white cursor-pointer hover:bg-[#2f153c]/90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2f153c]">
                    <span className="text-base font-medium text-white whitespace-nowrap">
                      Add To Cart
                    </span>
                  </button>

                  <button className="flex items-center justify-center gap-2 px-6 py-3 w-full border border-solid border-[#2f153c] rounded-lg shadow-md cursor-pointer hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2f153c]">
                    <span className="text-base font-medium text-[#2f153c] whitespace-nowrap">
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