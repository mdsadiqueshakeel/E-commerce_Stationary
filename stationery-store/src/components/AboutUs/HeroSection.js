import React from "react";

const HeroSection = () => {
  return (
    <section className="w-full bg-gradient-to-b from-[#FFdcdc] to-[#Fff0e6] py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2f153c] mb-6 animate-fadeIn">
          About Us
        </h1>
        <div className="w-full max-w-4xl h-64 md:h-80 lg:h-96 relative rounded-xl overflow-hidden shadow-lg mb-8 animate-fadeIn animation-delay-200">
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ 
              backgroundImage: "url('https://placehold.co/1200x600/2f153c/FFFFFF?text=Stationery+Store')",
              backgroundSize: "cover"
            }}
            aria-label="Stationery store hero image"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;