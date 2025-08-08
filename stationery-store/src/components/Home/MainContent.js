import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const MainContentSection = () => {
  return (
    <section className="bg-gradient-to-br from-[#FFF2EB] to-[#FFE8CD] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-20 py-10 lg:py-24">

              {/* --- Right Column: Image --- */}          
          <div className="w-full h-52 sm:h-72 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500 animate-fadeIn animation-delay-800 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFDCDC]/30 to-[#FFD6BA]/30 z-10"></div>
            <img
              className="w-full h-full object-cover"
              alt="Premium notebook with artistic supplies"
              src="https://placehold.co/600x800/FFE8CD/2f153c?text=Premium+Notebook"
            />
          </div>
          {/* --- Left Column: Text Content & Actions --- */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-[#2f153c] leading-tight animate-fadeIn animation-delay-200">
              Your Perfect Stationery Essentials
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#2f153c]/80 max-w-xl animate-fadeIn animation-delay-400">
              Our premium notebooks are designed for artists and writers alike,
              offering a perfect blend of style and functionality. Elevate your
              note-taking experience and let your ideas flow freely.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto animate-fadeIn animation-delay-600">
              <Link
                href="/shop"
                className="w-full sm:w-auto px-8 py-3 bg-[#2f153c] text-white font-semibold rounded-lg shadow-md hover:bg-[#FFD6BA] hover:text-[#2f153c] hover:scale-105 transition-all duration-300 text-center"
              >
                Shop Now
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-[#2f153c] font-semibold hover:bg-[#FFE8CD]/70 hover:scale-105 rounded-lg transition-all duration-300 text-center"
              >
                <span>Learn More</span>
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

        
        </div>
      </div>
    </section>
  );
};

export default MainContentSection;
