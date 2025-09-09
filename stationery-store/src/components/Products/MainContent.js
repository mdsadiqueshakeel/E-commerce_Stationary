"use client";
import React, { useState, useRef, useEffect } from "react";
import CartButton from "../CartButton";
import { API_ROUTES } from "@/utils/apiRoutes";
import apiClient from "@/utils/apiClients";

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

  // State declarations
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastCreatedAt, setLastCreatedAt] = useState(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get(API_ROUTES.users.getAllProducts, {
          params: {
            limit: 8 // Fetch limited products for the carousel
          }
        });
        
        if (response && response.items) {
          setProducts(response.items);
          setFilteredProducts(response.items);
          
          // Store the oldest product's createdAt for pagination
          if (response.items.length > 0) {
            const sortedProducts = [...response.items].sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setLastCreatedAt(sortedProducts[sortedProducts.length - 1].createdAt);
          }
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = products.filter(product => 
        product.title.toLowerCase().includes(query) || 
        (product.description && product.description.toLowerCase().includes(query)) || 
        (product.category && product.category.toLowerCase().includes(query))
      );
      setFilteredProducts(filtered);
    }

    const token = new URLSearchParams(window.location.search).get("token");
    if (token) {
      localStorage.setItem("auth_token", token);
      // Clean up URL so token isn't visible in browser bar
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [searchQuery, products]); // Remove products from dependencies

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
  
  const handleViewAll = () => {
    window.location.href = '/product';
  };

  // Function to format price
  const formatPrice = (price) => {
    return `$${parseFloat(price).toFixed(2)}`;
  };

  // Function to get product image URL
  const getProductImage = (product) => {
    if (product.images && product.images.length > 0) {
      // Check if the image is a string or an object with url property
      if (typeof product.images[0] === 'string') {
        return product.images[0];
      } else if (product.images[0].url) {
        return product.images[0].url;
      }
    }
    return 'https://placehold.co/600x400/2f153c/FFFFFF?text=Product+Image'; // Fallback image
  };

  return (
    <section className="bg-gradient-to-b from-[#FFdcdc] to-[#FFF0E6] w-full">
      <style dangerouslySetInnerHTML={{ __html: hideScrollbarCSS }} />
      <CartButton />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
          <div className="flex-1">
            <div className="inline-flex items-center">
              <div className="h-1 w-8 bg-[#2f153c] mr-3 rounded-full"></div>
              <span className="text-sm font-bold uppercase tracking-wider text-[#2f153c] letter-spacing-wider">
                Explore
              </span>
            </div>
            <div className="mt-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2f153c] leading-tight">
                Featured Products
              </h2>
              <p className="mt-3 text-base md:text-lg text-[#2f153c]/80 max-w-2xl">
                Discover our unique range of premium stationery products crafted for your everyday needs.
              </p>
            </div>
          </div>
          <div className="md:self-end">
            <button
              onClick={handleViewAll}
              className="px-6 py-3 bg-[#2f153c] text-white font-semibold rounded-lg shadow-md hover:bg-[#FFD6BA] hover:text-[#2f153c] hover:scale-105 transition-all duration-300 flex items-center gap-2"
              type="button"
              aria-label="View all products"
            >
              View all
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </header>
        
        {/* Search Bar */}
        <div className="w-full flex justify-center mb-12">
          <div className="w-full md:w-2/3 lg:w-1/2 relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-4 rounded-xl border border-[#2f153c]/20 focus:border-[#2f153c] focus:ring-2 focus:ring-[#FFD6BA] outline-none transition-all duration-200 bg-white/90 backdrop-blur-sm shadow-lg text-[#2f153c] placeholder-[#2f153c]/50 text-base"
              aria-label="Search products"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#2f153c]/70">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="mt-12 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2f153c]"></div>
          </div>
        ) : error ? (
          <div className="mt-12 text-center text-red-600 p-4 bg-red-100 rounded-lg">
            {error}
          </div>
        ) : (
          <div className="mt-8">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-[#2f153c]/70">No products found matching your search.</p>
              </div>
            ) : (
              <div 
                ref={scrollContainerRef}
                className="flex overflow-x-auto hide-scrollbar pb-6 gap-6 sm:gap-8 snap-x snap-mandatory"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                {visibleProducts.map((product) => (
                  <article 
                    key={product.id} 
                    className="flex-shrink-0 snap-start w-[18rem] sm:w-[21rem] md:w-[22rem] bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#2f153c]/5"
                  >
                    <div className="flex flex-col h-full">
                      {/* Image section with link to product detail */}
                      <a href={`/product/${product.id}`} className="block group">
                        <div className="relative w-full h-56 overflow-hidden">
                          {product.category && (
                            <div className="absolute top-3 left-3 z-10 bg-[#FFD6BA]/90 text-[#2f153c] text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
                              {product.category}
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#2f153c]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-5"></div>
                          <img
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            alt={product.title || "Product image"}
                            src={getProductImage(product)}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://placehold.co/600x400/2f153c/FFFFFF?text=Product+Image';
                              console.log('Image failed to load, using placeholder for:', product.title);
                            }}
                            loading="lazy"
                          />
                        </div>
                      
                        {/* Content section */}
                        <div className="p-5 flex flex-col justify-between flex-grow">
                          <div>
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="text-lg font-semibold text-[#2f153c] group-hover:text-[#2f153c]/80 transition-colors duration-200">
                                {product.title}
                              </h3>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-lg font-bold text-[#2f153c]">
                                {formatPrice(product.price)}
                              </span>
                              {product.discountedPrice && (
                                <span className="text-sm line-through text-[#2f153c]/60">
                                  {formatPrice(product.discountedPrice)}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {product.description && (
                            <p className="text-sm text-[#2f153c]/70 line-clamp-2 mt-2 mb-3">{product.description}</p>
                          )}
                        </div>
                      </a>
                      
                      <div className="px-5 pb-5 mt-auto">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg key={star} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-xs font-medium text-[#2f153c]/70 ml-1">5.0</span>
                          </div>
                          <div className={`text-xs px-3 py-1.5 rounded-full font-medium ${product.stockQuantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                          </div>
                        </div>
                        <button 
                          onClick={() => {
                            // Import dynamically to avoid SSR issues
                            import('../../utils/cartUtils').then(({ addToCart }) => {
                              const productToAdd = {
                                ...product,
                                image: getProductImage(product) // Ensure image is a string URL
                              };
                              addToCart(productToAdd, 1);
                              // Dispatch custom event to update cart count
                              window.dispatchEvent(new Event('cartUpdated'));
                            });
                          }}
                          disabled={product.stockQuantity <= 0}
                          className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 ${
                            product.stockQuantity > 0 
                              ? 'bg-[#2f153c] text-white hover:bg-[#FFD6BA] hover:text-[#2f153c]' 
                              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                          } rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md`}
                        >
                          {product.stockQuantity > 0 ? (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                              </svg>
                              Add to cart
                            </>
                          ) : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {filteredProducts.length > 0 && (
              <nav className="mt-10 flex items-center justify-between" aria-label="Product carousel navigation">
                <div className="flex items-center gap-3" role="tablist" aria-label="Carousel slides">
                  {Array.from({ length: totalSlides }, (_, index) => (
                    <button
                      key={index}
                      className={`h-2.5 ${index === currentSlide ? "w-8 bg-[#2f153c]" : "w-2.5 bg-[#2f153c]/30"} rounded-full transition-all duration-300`}
                      onClick={() => setCurrentSlide(index)}
                      role="tab"
                      aria-selected={index === currentSlide}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={handlePrevSlide}
                    className="p-3 bg-white shadow-md rounded-full hover:bg-[#FFD6BA]/70 transition-all duration-300 border border-[#2f153c]/10"
                    type="button"
                    aria-label="Previous slide"
                    disabled={currentSlide === 0}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#2f153c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18L9 12L15 6"/></svg>
                  </button>
                  <button
                    onClick={handleNextSlide}
                    className="p-3 bg-white shadow-md rounded-full hover:bg-[#FFD6BA]/70 transition-all duration-300 border border-[#2f153c]/10"
                    type="button"
                    aria-label="Next slide"
                    disabled={currentSlide === totalSlides - 1}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#2f153c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18L15 12L9 6"/></svg>
                  </button>
                </div>
              </nav>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default MainContentSection;
