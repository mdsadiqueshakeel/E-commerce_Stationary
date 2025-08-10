"use client";
import React, { useState, useRef, useEffect } from "react";
import allProducts from "../../utils/products.json";

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
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'notebooks', name: 'Notebooks' },
    { id: 'pens', name: 'Pens' },
    { id: 'pencils', name: 'Pencils' },
    { id: 'markers', name: 'Markers' },
    { id: 'planners', name: 'Planners' },
    { id: 'sticky-notes', name: 'Sticky Notes' },
    { id: 'art-supplies', name: 'Art Supplies' },
    { id: 'craft-kits', name: 'Craft Kits' },
  ];
  
  const products = allProducts.filter(product => product.category !== undefined);

  // Filter products by category (using category field, not variant)
  const filteredProducts = selectedCategory === 'All' ? 
    products : 
    products.filter(product => product.category.toLowerCase() === selectedCategory.toLowerCase());
    
  // Limit the number of products shown initially
  const limitedProducts = showAllProducts ? 
    filteredProducts : 
    filteredProducts.slice(0, isMobile ? 4 : 8);

  const categorySliderRef = useRef(null);

  const scrollCategory = (direction) => {
    if (categorySliderRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      categorySliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const ProductCard = ({ product }) => (
    <article className="flex flex-col items-start gap-3 bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
      <a href={`/product/${product.id}`} className="block w-full">
        <div className="relative w-full overflow-hidden">
          <div className="absolute top-2 right-2 z-10 bg-[#FFD6BA]/80 text-[#2f153c] text-xs font-semibold px-2 py-1 rounded-full backdrop-blur-sm">
            {product.variant}
          </div>
          <img 
            className="w-full h-44 sm:h-56 md:h-64 object-cover transition-transform duration-500 hover:scale-110" 
            alt={product.alt} 
            src={product.image} 
          />
        </div>

        <div className="flex flex-col items-start gap-2 w-full p-4">
          <header className="w-full flex items-start justify-between">
            <div className="flex flex-col">
              <h3 className="text-base sm:text-lg font-semibold text-[#2f153c]">{product.name}</h3>
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
            <span className="text-sm sm:text-base font-bold text-[#2f153c]">{product.price}</span>
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
        >
          Add to cart
        </button>
      </div>
    </article>
  );

  return (
    <section className="bg-gradient-to-b from-[#FFF0E6] to-[#FAEBD7] w-full">
      <style dangerouslySetInnerHTML={{ __html: hideScrollbarCSS }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="flex-1">
            <div className="inline-flex items-center">
              <span className="text-sm font-bold uppercase tracking-wider text-[#2f153c]">Explore</span>
            </div>
            <div className="mt-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2f153c] leading-tight">Featured Products</h2>
              <p className="mt-2 text-base md:text-lg text-[#2f153c]/80">Discover our unique range of stationery products.</p>
            </div>
          </div>
          <div>
            <button 
              onClick={() => setShowAllProducts(!showAllProducts)} 
              className="px-6 py-3 bg-[#2f153c] text-white font-semibold rounded-lg shadow-md hover:bg-[#FFD6BA] hover:text-[#2f153c] hover:scale-105 transition-all duration-300"
            >
              {showAllProducts ? 'Show Less' : 'View All'}
            </button>
          </div>
        </header>

        <div className="relative mt-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#2f153c]">Categories</h3>
            <div className="flex space-x-2">
              <button 
                onClick={() => scrollCategory('left')} 
                className="p-1.5 bg-white/80 rounded-full shadow-sm hover:bg-[#FFD6BA]/70 transition-colors"
                aria-label="Scroll categories left"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#2f153c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18L9 12L15 6"/></svg>
              </button>
              <button 
                onClick={() => scrollCategory('right')} 
                className="p-1.5 bg-white/80 rounded-full shadow-sm hover:bg-[#FFD6BA]/70 transition-colors"
                aria-label="Scroll categories right"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#2f153c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18L15 12L9 6"/></svg>
              </button>
            </div>
          </div>
          
          <div 
            ref={categorySliderRef} 
            className="flex space-x-2 overflow-x-auto hide-scrollbar pb-2"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === category.name
                    ? 'bg-[#2f153c] text-white font-medium shadow-md'
                    : 'bg-white/70 text-[#2f153c] hover:bg-[#FFD6BA]/50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <div id="all-products" className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {limitedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {!showAllProducts && filteredProducts.length > (isMobile ? 4 : 8) && (
          <div className="mt-8 text-center">
            <button 
              onClick={() => setShowAllProducts(true)}
              className="px-6 py-3 bg-[#2f153c] text-white font-semibold rounded-lg shadow-md hover:bg-[#FFD6BA] hover:text-[#2f153c] hover:scale-105 transition-all duration-300"
            >
              View All {filteredProducts.length} Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGallerySection;
