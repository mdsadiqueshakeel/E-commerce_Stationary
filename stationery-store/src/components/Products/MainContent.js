"use client";
import React, { useState, useRef, useEffect } from "react";
import CartButton from "../CartButton";
import productsData from "../../utils/products.json";


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

  // Use imported products data from JSON file
  const products = productsData;

  // State declarations after products array
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  // Initialize filteredProducts with products directly
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Filter products based on search query
  useEffect(() => {
    // Only update filteredProducts when searchQuery changes
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query) || 
        (product.description && product.description.toLowerCase().includes(query)) || 
        (product.features && product.features.some(feature => feature.toLowerCase().includes(query)))
      );
      setFilteredProducts(filtered);
    }

      const token = new URLSearchParams(window.location.search).get("token");
    if (token) {
      localStorage.setItem("auth_token", token);
      // Clean up URL so token isn't visible in browser bar
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [searchQuery,""]); // Remove products from dependencies

  // Calculate slides based on screen size
  const productsPerPage = 4;
  const totalSlides = Math.ceil(filteredProducts.length / productsPerPage);
  
  // Show filtered products for horizontal scrolling
  const visibleProducts = filteredProducts;
  
  const scrollContainerRef = useRef(null);

  const handlePrevSlide = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      
      // Update current slide based on scroll position after scrolling
      setTimeout(() => {
        const scrollPosition = scrollContainerRef.current.scrollLeft;
        const cardWidth = scrollContainerRef.current.scrollWidth / filteredProducts.length;
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
        const cardWidth = scrollContainerRef.current.scrollWidth / filteredProducts.length;
        const newSlide = Math.floor(scrollPosition / cardWidth / productsPerPage);
        setCurrentSlide(newSlide);
      }, 300);
    }
  };

  const handleViewAll = () => {};

  return (
    <section className="bg-gradient-to-b from-[#FFdcdc] to-[#FFF0E6] w-full">
      <style dangerouslySetInnerHTML={{ __html: hideScrollbarCSS }} />
      <CartButton />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-4 lg:py-20">
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
        
        {/* Search Bar */}
        <div className="w-full flex justify-center mt-8">
          <div className="w-full md:w-2/3 lg:w-1/2 relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[#2f153c]/20 focus:border-[#2f153c] focus:ring-2 focus:ring-[#FFD6BA] outline-none transition-all duration-200 bg-white/90 backdrop-blur-sm shadow-sm text-[#2f153c] placeholder-[#2f153c]/50"
              aria-label="Search products"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2f153c]/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

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
                className="flex-shrink-0 snap-start w-[17.5rem] sm:w-[20rem] md:w-[21.25rem] bg-white/90 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
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
                      
                      {product.description && (
                        <p className="text-sm text-[#2f153c]/70 line-clamp-3 mb-3">{product.description}</p>
                      )}
                      
                      {product.features && (
                        <div className="mt-2 text-[#2f153c]">
                          <h4 className="text-xs font-semibold mb-1">Features:</h4>
                          <ul className="text-xs space-y-1">
                            {product.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#2f153c] mr-2"></span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
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
                    <button 
                      onClick={() => {
                        // Import dynamically to avoid SSR issues
                        import('../../utils/cartUtils').then(({ addToCart }) => {
                          addToCart(product, 1);
                          // Dispatch custom event to update cart count
                          window.dispatchEvent(new Event('cartUpdated'));
                        });
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2f153c] text-white rounded-lg hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-200 font-medium"
                    >
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
