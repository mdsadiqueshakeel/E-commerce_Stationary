"use client";
import React, { useState, useRef, useEffect } from "react";
import { API_ROUTES } from "@/utils/apiRoutes";
import apiClient from "@/utils/apiClients";

const ProductGallerySection = () => {
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

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastCreatedAt, setLastCreatedAt] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get(API_ROUTES.users.getAllProducts, {
          params: {
            limit: 12 // Fetch initial set of products
          }
        });
        
        if (response && response.items) {
          setProducts(response.items);
          
          // Store the oldest product's createdAt for pagination
          if (response.items.length > 0) {
            const sortedProducts = [...response.items].sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setLastCreatedAt(sortedProducts[sortedProducts.length - 1].createdAt);
          }
          
          // If fewer products returned than requested, there are no more
          if (response.items.length < 12) {
            setHasMore(false);
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
  
  // Extract unique categories from products
  const categories = [
    { id: 'all', name: 'All' },
    ...Array.from(
      new Set(
        products
          .filter(product => product.category)
          .map(product => product.category)
      )
    ).map(category => ({
      id: category.toLowerCase().replace(/\s+/g, '-'),
      name: category
    }))
  ];
  
  // Filter products by category
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => 
        product.category && product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredProducts(filtered);
      
      // Reset pagination when category changes
      setHasMore(true);
      setShowAllProducts(false);
    }
  }, [selectedCategory, products]);
  
  // Function to fetch products by category
  const fetchProductsByCategory = async (category) => {
    try {
      setIsLoading(true);
      setSelectedCategory(category);
      
      // Only make API call if category is not 'All'
      if (category !== 'All') {
        const response = await apiClient.get(API_ROUTES.users.getAllProducts, {
          params: {
            limit: 12,
            category: category
          }
        });
        
        if (response && response.items) {
          setProducts(response.items);
          setFilteredProducts(response.items);
          
          // Update pagination state
          if (response.items.length > 0) {
            const sortedProducts = [...response.items].sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setLastCreatedAt(sortedProducts[sortedProducts.length - 1].createdAt);
          }
          
          setHasMore(response.items.length >= 12);
        }
      } else {
        // Fetch all products when 'All' is selected
        const response = await apiClient.get(API_ROUTES.users.getAllProducts, {
          params: {
            limit: 12
          }
        });
        
        if (response && response.items) {
          setProducts(response.items);
          setFilteredProducts(response.items);
          
          if (response.items.length > 0) {
            const sortedProducts = [...response.items].sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setLastCreatedAt(sortedProducts[sortedProducts.length - 1].createdAt);
          }
          
          setHasMore(response.items.length >= 12);
        }
      }
    } catch (err) {
      console.error("Error fetching products by category:", err);
      setError("Failed to load products. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load more products
  const loadMoreProducts = async () => {
    if (!lastCreatedAt || isLoadingMore) return;
    
    try {
      setIsLoadingMore(true);
      const response = await apiClient.get(API_ROUTES.users.getAllProducts, {
        params: {
          mode: 'scroll',
          lastCreatedAt,
          limit: 12
        }
      });
      
      if (response && response.items && response.items.length > 0) {
        setProducts(prevProducts => [...prevProducts, ...response.items]);
        
        // Update lastCreatedAt for next pagination
        const sortedNewProducts = [...response.items].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setLastCreatedAt(sortedNewProducts[sortedNewProducts.length - 1].createdAt);
        
        // If fewer products returned than requested, there are no more
        if (response.items.length < 12) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error loading more products:", err);
      setError("Failed to load more products. Please try again.");
    } finally {
      setIsLoadingMore(false);
    }
  };
  
  // Limit the number of products shown initially
  const limitedProducts = showAllProducts ? 
    filteredProducts : 
    filteredProducts.slice(0, isMobile ? 4 : 8);
    
  // Helper function to format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };
  
  // Helper function to get product image
  const getProductImage = (product) => {
    if (product.images && product.images.length > 0) {
      return product.images[0];
    }
    // change this image to text placeholder image
    return 'https://via.placeholder.jp/150'; // Fallback image
  };

  const categorySliderRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  // Calculate max scroll value on mount and when categories change
  useEffect(() => {
    if (categorySliderRef.current) {
      setMaxScroll(categorySliderRef.current.scrollWidth - categorySliderRef.current.clientWidth);
    }
  }, [categories, categorySliderRef]);

  const scrollCategory = (direction) => {
    if (categorySliderRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      categorySliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      // Update scroll position after scrolling
      setTimeout(() => {
        setScrollPosition(categorySliderRef.current.scrollLeft);
      }, 100);
    }
  };

  const ProductCard = ({ product }) => (
    <article className="flex flex-col items-start gap-3 bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
      <a href={`/product/${product.id}`} className="block w-full">
        <div className="relative w-full overflow-hidden">
          {product.variant && (
            <div className="absolute top-2 right-2 z-10 bg-[#FFD6BA]/80 text-[#2f153c] text-xs font-semibold px-2 py-1 rounded-full backdrop-blur-sm">
              {product.variant}
            </div>
          )}
          <img 
            className="w-full h-44 sm:h-56 md:h-64 object-cover transition-transform duration-500 hover:scale-110" 
            alt={product.title || product.name || 'Product image'} 
            src={getProductImage(product)} 
            onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
          />
        </div>

        <div className="flex flex-col items-start gap-2 w-full p-4">
          <header className="w-full flex items-start justify-between">
            <div className="flex flex-col">
              <h3 className="text-base sm:text-lg font-semibold text-[#2f153c]">{product.title || product.name}</h3>
              <div className="flex items-center mt-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-[#2f153c]/60 ml-1">5.0</span>
              </div>
            </div>
            <span className="text-sm sm:text-base font-bold text-[#2f153c]">{formatPrice(product.price)}</span>
          </header>
        </div>
      </a>
      <div className="px-4 pb-4 w-full">
        <button 
          onClick={() => {
            // Import dynamically to avoid SSR issues
            import('../../utils/cartUtils').then(({ addToCart }) => {
              addToCart(product, 1);
              window.dispatchEvent(new Event('cartUpdated'));
            });
          }}
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#2f153c] text-white rounded-lg hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-200 font-medium"
          disabled={isLoading || (product.stockQuantity !== undefined && product.stockQuantity <= 0)}
        >
          {product.stockQuantity !== undefined && product.stockQuantity <= 0 ? 'Out of stock' : 'Add to cart'}
        </button>
      </div>
    </article>
  );

  return (
    <section className="bg-gradient-to-b from-[#FFF0E6] to-[#FAEBD7] w-full">
      <style dangerouslySetInnerHTML={{ __html: hideScrollbarCSS }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 lg:py-16">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
          <div className="flex-1">
            <div className="inline-flex items-center">
              <div className="h-1 w-8 bg-[#2f153c] mr-3 rounded-full"></div>
              <span className="text-sm font-bold uppercase tracking-wider text-[#2f153c] letter-spacing-wider">Explore</span>
            </div>
            <div className="mt-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2f153c] leading-tight">Featured Products</h2>
              <p className="mt-3 text-base md:text-lg text-[#2f153c]/80 max-w-2xl">Discover our unique range of premium stationery products crafted for your everyday needs.</p>
            </div>
          </div>
          <div className="md:self-end">
            <button 
              onClick={() => setShowAllProducts(!showAllProducts)} 
              className="px-6 py-3 bg-[#2f153c] text-white font-semibold rounded-lg shadow-md hover:bg-[#FFD6BA] hover:text-[#2f153c] hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              {showAllProducts ? 'Show Less' : 'View All'}
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-300 ${showAllProducts ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </header>

        <div className="relative mb-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-semibold text-[#2f153c]">Categories</h3>
              <div className="h-1 w-16 bg-[#FFD6BA] rounded-full"></div>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => scrollCategory('left')} 
                className="p-2.5 bg-white rounded-full shadow-md hover:bg-[#FFD6BA]/70 transition-all duration-300 border border-[#2f153c]/10"
                aria-label="Scroll categories left"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#2f153c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18L9 12L15 6"/></svg>
              </button>
              <button 
                onClick={() => scrollCategory('right')} 
                className="p-2.5 bg-white rounded-full shadow-md hover:bg-[#FFD6BA]/70 transition-all duration-300 border border-[#2f153c]/10"
                aria-label="Scroll categories right"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#2f153c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18L15 12L9 6"/></svg>
              </button>
            </div>
          </div>
          
          <div 
            ref={categorySliderRef} 
            className="flex space-x-3 overflow-x-auto hide-scrollbar pb-3"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => fetchProductsByCategory(category.name)}
                className={`px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category.name
                    ? 'bg-[#2f153c] text-white font-medium shadow-lg scale-105'
                    : 'bg-white/90 text-[#2f153c] hover:bg-[#FFD6BA]/70 shadow-md border border-[#2f153c]/10'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <div id="all-products" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
          {limitedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {limitedProducts.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center py-16">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#2f153c]/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-[#2f153c] mb-2">No products found</h3>
            <p className="text-[#2f153c]/70 text-center max-w-md">We couldn't find any products matching your criteria. Try changing your filters or check back later.</p>
          </div>
        )}
        
        {!showAllProducts && filteredProducts.length > (isMobile ? 4 : 8) && (
          <div className="mt-8 text-center">
            <button 
              onClick={() => setShowAllProducts(true)}
              className="px-6 py-3 bg-[#2f153c] text-white font-semibold rounded-lg shadow-md hover:bg-[#FFD6BA] hover:text-[#2f153c] hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <span>View All {filteredProducts.length} Products</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
        
        {/* Load More Button - Only show when all products are displayed and there are more to load */}
        {showAllProducts && hasMore && (
          <div className="mt-8 text-center">
            <button 
              onClick={loadMoreProducts}
              disabled={isLoadingMore}
              className="px-6 py-3 bg-[#2f153c] text-white font-semibold rounded-lg shadow-md hover:bg-[#FFD6BA] hover:text-[#2f153c] hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
            >
              {isLoadingMore ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                <>
                  <span>Load More Products</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGallerySection;
