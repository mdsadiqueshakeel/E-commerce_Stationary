"use client";
import React from "react";

const LayoutSection = ({ children }) => {
  return (
    <section className="bg-gradient-to-b from-[#FFF2EB] to-[#FFE8CD] w-full py-8 sm:py-10 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children || (
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-20">
            <div className="flex flex-col items-start gap-6 md:gap-8 w-full md:w-1/2">
              <div className="flex flex-col items-start gap-4 md:gap-6 w-full">
                <div className="w-16 h-16 md:w-20 md:h-20 text-[#2f153c] flex items-center justify-center rounded-full bg-[#FFD6BA]/80">
                  <span className="text-2xl font-bold">Sale</span>
                </div>
                <div className="flex flex-col items-start gap-4 md:gap-6 w-full">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2f153c] leading-tight">
                    Exclusive Offers Just for You!
                  </h2>

                  <p className="text-base md:text-lg text-[#2f153c]/80">
                    Take advantage of our limited-time offers on this product.
                    Enjoy discounts and special deals that make your purchase even
                    more rewarding!
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 md:gap-6 mt-2">
                <button
                  className="px-6 py-3 bg-[#2f153c] text-white font-semibold rounded-lg shadow-md hover:bg-[#FFD6BA] hover:text-[#2f153c] hover:scale-105 transition-all duration-300"
                  type="button"
                  aria-label="Shop now"
                >
                  <span className="font-medium">
                    Shop
                  </span>
                </button>

                <button
                  className="flex items-center justify-center gap-2 px-4 py-2 text-[#2f153c] hover:text-[#2f153c]/70 transition-colors duration-200"
                  type="button"
                  aria-label="Learn more about our offers"
                >
                  <span className="font-medium">
                    Learn More
                  </span>

                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/2 mt-8 md:mt-0">
              <img
                className="w-full h-auto rounded-xl shadow-md object-cover aspect-[4/3]"
                alt="Exclusive offers promotional image showing office supplies in a wooden container"
                src="https://placehold.co/600x400/2f153c/FFFFFF?text=Exclusive+Offers"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LayoutSection;