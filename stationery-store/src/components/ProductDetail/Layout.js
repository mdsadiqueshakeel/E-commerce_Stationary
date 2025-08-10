"use client";
import React from "react";
import featureData from "@/utils/feature.json";
import Link from "next/link";

// Get the 3rd index product (index 2) from the feature.json data
const thirdFeature = featureData[2]; // Professional Chef's Knife (id: 202)

const LayoutSection = ({ children }) => {
  return (
    <section className="bg-gradient-to-b from-[#FAEBD7] to-[#FFE4C4] w-full py-8 sm:py-10 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children || (
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-20">
            <div className="flex flex-col items-start gap-6 md:gap-8 w-full md:w-1/2">
              <div className="flex flex-col items-start gap-4 md:gap-6 w-full">
                <div className="w-16 h-16 md:w-20 md:h-20 text-[#2f153c] flex items-center justify-center rounded-full bg-[#FFD6BA]/80">
                  <span className="text-2xl font-bold">{thirdFeature.price}</span>
                </div>
                <div className="flex flex-col items-start gap-4 md:gap-6 w-full">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2f153c] leading-tight">
                    {thirdFeature.name}
                  </h2>

                  <p className="text-base md:text-lg text-[#2f153c]/80">
                    {thirdFeature.description}
                  </p>
                  
                  {thirdFeature.features && (
                    <ul className="list-disc list-inside text-[#2f153c]/80 text-base md:text-lg">
                      {thirdFeature.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 md:gap-6 mt-2">
                <Link
                  href={`/product/${thirdFeature.id}`}
                  className="px-6 py-3 bg-[#2f153c] text-white font-semibold rounded-lg shadow-md hover:bg-[#FFD6BA] hover:text-[#2f153c] hover:scale-105 transition-all duration-300"
                  aria-label="Shop now"
                >
                  <span className="font-medium">
                    Shop Now
                  </span>
                </Link>

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
                alt={thirdFeature.name}
                src={thirdFeature.image}
                onError={(e) => { e.currentTarget.src = `https://placehold.co/600x400/2f153c/FFFFFF?text=${thirdFeature.name}`; }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LayoutSection;