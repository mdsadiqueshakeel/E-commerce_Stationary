"use client";
import React, { useState, useRef } from "react";

const MainContentSection = () => {
  // CSS for hiding scrollbar
  const hideScrollbarCSS = `
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `;

  const [currentSlide, setCurrentSlide] = useState(0);

  const products = [
    {
      id: 1,
      name: "Notebook Set",
      variant: "Classic",
      price: "$55",
      image: "https://placehold.co/600x800/2f153c/FFFFFF?text=Notebook+Set",
      description: "High-quality notebook set with premium paper. Perfect for journaling, sketching, or taking notes. Includes 3 different sizes.",
      features: ["Acid-free paper", "Hardcover binding", "Elastic closure", "Inner pocket"]
    },
    {
      id: 2,
      name: "Pen Collection",
      variant: "Gel",
      price: "$55",
      image: "https://placehold.co/600x800/2f153c/FFFFFF?text=Pen+Collection",
      description: "Smooth-writing gel pens in various colors. Ideal for everyday writing, art projects, or bullet journaling.",
      features: ["Smudge-resistant", "Quick-drying ink", "Comfortable grip", "0.5mm fine point"]
    },
    {
      id: 3,
      name: "Sticky Notes",
      variant: "Bright",
      price: "$55",
      image: "https://placehold.co/600x800/2f153c/FFFFFF?text=Sticky+Notes",
      description: "Vibrant sticky notes in assorted colors and sizes. Perfect for reminders, bookmarks, or color-coding your notes.",
      features: ["Strong adhesive", "Recyclable paper", "Multiple sizes", "Bright colors"]
    },
    {
      id: 4,
      name: "Planner Book",
      variant: "Daily",
      price: "$55",
      image: "https://placehold.co/600x800/2f153c/FFFFFF?text=Planner+Book",
      description: "Comprehensive daily planner with sections for goals, tasks, and notes. Stay organized and boost productivity.",
      features: ["12-month calendar", "Goal tracking", "Task prioritization", "Habit tracker"]
    },
    {
      id: 5,
      name: "Art Supplies",
      variant: "Mixed",
      price: "$55",
      image: "https://placehold.co/600x800/2f153c/FFFFFF?text=Art+Supplies",
      description: "Complete art supply kit for beginners and professionals. Includes pencils, markers, and watercolors.",
      features: ["Professional quality", "Vibrant colors", "Storage case included", "Suitable for all skill levels"]
    },
    {
      id: 6,
      name: "Craft Kit",
      variant: "Complete",
      price: "$55",
      image: "https://placehold.co/600x800/2f153c/FFFFFF?text=Craft+Kit",
      description: "All-in-one craft kit with scissors, glue, tape, and more. Everything you need for your DIY projects.",
      features: ["Premium scissors", "Acid-free glue", "Washi tape collection", "Craft storage box"]
    },
    {
      id: 7,
      name: "Greeting Cards",
      variant: "Assorted",
      price: "$55",
      image: "https://placehold.co/600x800/2f153c/FFFFFF?text=Greeting+Cards",
      description: "Beautiful greeting cards for all occasions. Blank inside for your personal message.",
      features: ["High-quality cardstock", "Envelopes included", "Various designs", "Eco-friendly materials"]
    },
    {
      id: 8,
      name: "Premium Bundle",
      variant: "Variant",
      price: "$55",
      image: "https://placehold.co/600x800/2f153c/FFFFFF?text=Premium+Bundle",
      description: "Our best-selling stationery items bundled together at a special price. The perfect gift for stationery lovers.",
      features: ["Notebook set", "Pen collection", "Planner", "Gift packaging available"]
    },
  ];

  // Calculate slides based on screen size
  const productsPerPage = 4;
  const totalSlides = Math.ceil(products.length / productsPerPage);
  
  // Show all products for horizontal scrolling
  const visibleProducts = products;
  
  const scrollContainerRef = useRef(null);

  const handlePrevSlide = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      
      // Update current slide based on scroll position after scrolling
      setTimeout(() => {
        const scrollPosition = scrollContainerRef.current.scrollLeft;
        const cardWidth = scrollContainerRef.current.scrollWidth / products.length;
        const newSlide = Math.floor(scrollPosition / cardWidth / productsPerPage);
        setCurrentSlide(newSlide);
      }, 300);
    }
  };

  const handleNextSlide = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      // Update current slide based on scroll position after scrolling
      setTimeout(() => {
        const scrollPosition = scrollContainerRef.current.scrollLeft;
        const cardWidth = scrollContainerRef.current.scrollWidth / products.length;
        const newSlide = Math.floor(scrollPosition / cardWidth / productsPerPage);
        setCurrentSlide(newSlide);
      }, 300);
    }
  };

  const handleViewAll = () => {};

  return (
    <section className="bg-gradient-to-b from-[#FFE8CD] to-[#FFDCDC] w-full">
      <style dangerouslySetInnerHTML={{ __html: hideScrollbarCSS }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-20">
        <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="flex-1">
            <div className="inline-flex items-center">
              <span className="text-sm font-bold uppercase tracking-wider text-[#2f153c]">
                Explore
              </span>
            </div>
            <div className="mt-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2f153c] leading-tight">
                Products
              </h2>
              <p className="mt-2 text-base md:text-lg text-[#2f153c]/80">
                Discover our unique range of stationery products.
              </p>
            </div>
          </div>
          <div>
            <button
              onClick={handleViewAll}
              className="px-6 py-3 bg-[#2f153c] text-white font-semibold rounded-lg shadow-md hover:bg-[#FFD6BA] hover:text-[#2f153c] hover:scale-105 transition-all duration-300"
              type="button"
              aria-label="View all products"
            >
              View all
            </button>
          </div>
        </header>

        <div className="mt-8">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto hide-scrollbar pb-4 gap-4 sm:gap-6 snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {visibleProducts.map((product) => (
              <article 
                key={product.id} 
                className="flex-shrink-0 snap-start w-[280px] sm:w-[320px] md:w-[340px] bg-white/90 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="flex flex-col h-full">
                  {/* Image section with link to product detail */}
                  <a href={`/product/${product.id}`} className="block">
                    <div className="relative w-full h-48 overflow-hidden">
                      <div className="absolute top-2 right-2 z-10 bg-[#FFD6BA]/80 text-[#2f153c] text-xs font-semibold px-2 py-1 rounded-full backdrop-blur-sm">
                        {product.variant}
                      </div>
                      <img
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        alt={`${product.name} - ${product.variant}`}
                        src={product.image}
                      />
                    </div>
                  
                    {/* Content section */}
                    <div className="p-4 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-[#2f153c]">
                            {product.name}
                          </h3>
                        </div>
                        <div className="text-base font-bold text-[#2f153c]">
                          {product.price}
                        </div>
                      </div>
                      
                      <p className="text-sm text-[#2f153c]/70 line-clamp-3 mb-3">{product.description}</p>
                      
                      <div className="mt-2">
                        <h4 className="text-xs font-semibold text-[#2f153c] mb-1">Features:</h4>
                        <ul className="text-xs space-y-1">
                          {product.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#2f153c] mr-2"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </a>
                  
                  <div className="p-4 pt-0 mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-[#2f153c]/60 ml-1">5.0</span>
                      </div>
                      <div className="text-xs px-2 py-1 bg-[#FFD6BA]/50 rounded-full text-[#2f153c]">
                        In Stock
                      </div>
                    </div>
                    <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2f153c] text-white rounded-lg hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-200 font-medium">
                      Add to cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <nav className="mt-8 flex items-center justify-between" aria-label="Product carousel navigation">
            <div className="flex items-center gap-2" role="tablist" aria-label="Carousel slides">
              {Array.from({ length: totalSlides }, (_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full transition-opacity ${
                    index === currentSlide ? "bg-[#2f153c]" : "bg-[#2f153c]/30"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                  role="tab"
                  aria-selected={index === currentSlide}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevSlide}
                className="p-2 bg-[#2f153c]/10 rounded-full hover:bg-[#2f153c]/20 transition-colors"
                type="button"
                aria-label="Previous slide"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#2f153c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18L9 12L15 6"/></svg>
              </button>
              <button
                onClick={handleNextSlide}
                className="p-2 bg-[#2f153c]/10 rounded-full hover:bg-[#2f153c]/20 transition-colors"
                type="button"
                aria-label="Next slide"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#2f153c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18L15 12L9 6"/></svg>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default MainContentSection;
