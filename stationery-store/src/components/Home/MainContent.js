import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const MainContentSection = () => {
  return (
    <section className="bg-gradient-to-br from-[#B9BF8F] to-[#d1d6b0] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-20 py-16 lg:py-24">
          
          {/* --- Left Column: Text Content & Actions --- */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="text-sm font-bold uppercase tracking-wider text-[#191570]/80 animate-fadeIn">
              Discover
            </span>
            <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1570] leading-tight animate-fadeIn animation-delay-200">
              Your Perfect Stationery Essentials
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#191570]/90 max-w-xl animate-fadeIn animation-delay-400">
              Our premium notebooks are designed for artists and writers alike,
              offering a perfect blend of style and functionality. Elevate your
              note-taking experience and let your ideas flow freely.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto animate-fadeIn animation-delay-600">
              <Link
                href="/shop"
                className="w-full sm:w-auto px-8 py-3 bg-[#1A1570] text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 hover:scale-105 transition-all duration-300 text-center"
              >
                Shop Now
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-[#1A1570] font-semibold hover:text-opacity-80 hover:translate-x-1 transition-all duration-300 text-center"
              >
                <span>Learn More</span>
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* --- Right Column: Image --- */}
          <div className="w-full h-64 sm:h-80 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500 animate-fadeIn animation-delay-800">
            <img
              className="w-full h-full object-cover"
              alt="Premium notebook with artistic supplies"
              src="https://placehold.co/600x800/e0b8ac/1A1570?text=Premium+Notebook"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default MainContentSection;
