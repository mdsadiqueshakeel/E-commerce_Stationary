"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

// --- Data for the slides ---
const slides = [
  {
    id: 1,
    title: "Timeless Notebooks",
    description:
      "Capture your thoughts in our elegantly crafted notebooks, perfect for every occasion.",
    image: "https://placehold.co/800x1200/5e6555/FFFFFF?text=Notebooks",
  },
  {
    id: 2,
    title: "Precision Pens",
    description:
      "Experience the smooth flow of our premium pens, designed for comfort and style.",
    image: "https://placehold.co/800x1200/5e6555/FFFFFF?text=Pens",
  },
  {
    id: 3,
    title: "Artisan Paper",
    description:
      "From sketch to final draft, our high-quality paper is the perfect canvas.",
    image: "https://placehold.co/800x1200/5e6555/FFFFFF?text=Paper",
  },  {
    id: 4,
    title: "Artisan Paper",
    description:
      "From sketch to final draft, our high-quality paper is the perfect canvas.",
    image: "https://placehold.co/800x1200/5e6555/FFFFFF?text=Sketch",
  },
];

// --- Main Header Component ---
const HeaderSection = () => {
  const [current, setCurrent] = useState(0);

  const handleNext = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const handlePrevious = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const slideInterval = setInterval(handleNext, 3000);
    return () => clearInterval(slideInterval);
  }, [handleNext]);

  return (
    // --- HEIGHT CHANGE HERE ---
    // I've changed min-h-screen to a more controlled, responsive height.
    <header className="grid grid-cols-1 lg:grid-cols-2 w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] max-h-[800px] min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
      
      {/* --- Left Column: Content --- */}
      <div className="bg-gradient-to-b from-[#FFDCDC] to-[#FFD6BA] flex flex-col justify-center items-center p-6 sm:p-10 md:p-16 lg:p-24 text-center lg:text-left h-full">
        <div className="max-w-md w-full flex flex-col items-center lg:items-start">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl text-[#2f153c] leading-tight font-solid fontweight-500 animate-fadeIn">
            Discover Your Perfect Stationery Essentials Today
          </h1>
          <p className="mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-[#2f153c]/80 animate-slideUp animation-delay-100">
            Explore our curated collection of high-quality stationery designed
            to inspire creativity and organization. Shop now and elevate your
            workspace with our unique products.
          </p>
          <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto animate-slideUp animation-delay-200">
            <Link
              href="/product"
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[#2f153c] text-white font-semibold rounded-lg shadow-md hover:bg-[#e0b8ac] hover:text-[#2f153c] transition-all hover:scale-105 duration-300"
            >
              Shop Now
            </Link>
            <Link
              href="/about"
              className="px-6 sm:px-8 py-2.5 sm:py-3 text-[#2f153c] font-semibold rounded-lg border-2 border-[#2f153c] hover:bg-[#2f153c] hover:text-white transition-all hover:scale-105 duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* --- Right Column: Image Carousel --- */}
      {/* I removed the redundant height classes here to let the parent grid control it. */}
      <div className="relative flex flex-col bg-gradient-to-b from-[#FFF2EB] to-[#FFE8CD] h-[90vh] max-h-[800px] min-h-[600px]">
        {/* Image */}
        <div className="flex-grow h-full">
          {/* adding a link to attach with image to redirect to the product detail page */}
          <Link href={`/product/${slides[current].id}`}>
            <img
              key={slides[current].id}
              src={slides[current].image}
              alt={slides[current].title}
              className="w-full h-full object-cover animate-fade-in"
              onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x1200/5e6555/FFFFFF?text=Stationery'; }}
            />
          </Link>
        </div>
        {/* Carousel Info & Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#2f153c]/50 to-transparent">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-white">{slides[current].title}</h2>
            <p className="mt-1 text-white/90">
              {slides[current].description}
            </p>
            <div className="flex justify-between items-center mt-6">
              {/* Dots */}
              <div className="flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      current === index ? "bg-[#FFD6BA]" : "bg-[#FFD6BA]/30"
                    }`}
                  />
                ))}
              </div>
              {/* Arrows */}
              <div className="flex gap-3">
                <button
                  onClick={handlePrevious}
                  aria-label="Previous slide"
                  className="p-1.5 sm:p-2 bg-[#FFD6BA]/40 rounded-full hover:bg-[#FFD6BA]/70 focus:bg-[#FFD6BA]/70 transition-colors backdrop-blur-sm hover:scale-110 focus:scale-110 transition-transform duration-300 focus:outline-none text-[#2f153c]"
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next slide"
                  className="p-1.5 sm:p-2 bg-[#FFD6BA]/40 rounded-full hover:bg-[#FFD6BA]/70 focus:bg-[#FFD6BA]/70 transition-colors backdrop-blur-sm hover:scale-110 focus:scale-110 transition-transform duration-300 focus:outline-none text-[#2f153c]"
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;

// You might want to add this simple animation to your globals.css for a nice fade effect
/*
@keyframes fade-in {
  from { opacity: 0.8; }
  to { opacity: 1; }
}
.animate-fade-in {
  animation: fade-in 0.5s ease-in-out;
}
*/
