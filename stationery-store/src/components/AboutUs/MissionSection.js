import React from "react";

const MissionSection = () => {
  return (
    <section className="w-full py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFf0e6] to-[#ffe4c4]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="w-full md:w-1/2 animate-fadeIn">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2f153c] mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              At S S Enterprises, we believe in the power of quality writing instruments and paper products to inspire creativity and productivity. Our mission is to provide exceptional stationery products that combine functionality, aesthetics, and sustainability.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              We carefully curate our collection to offer unique, high-quality items that stand out from mass-produced alternatives. Whether you're a student, professional, or creative enthusiast, we're dedicated to enhancing your writing and organizational experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="bg-[#FFDCDC] p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-[#2f153c] mb-2">Quality</h3>
                <p className="text-gray-700">We source only the finest materials and craftsmanship for our products.</p>
              </div>
              <div className="bg-[#FFDCDC] p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-[#2f153c] mb-2">Innovation</h3>
                <p className="text-gray-700">We constantly seek new designs and solutions for modern stationery needs.</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 animate-fadeIn animation-delay-200">
            <div className="relative h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
              <div 
                className="w-full h-full bg-cover bg-center" 
                style={{ 
                  backgroundImage: "url('https://placehold.co/800x600/2f153c/FFFFFF?text=Our+Mission')",
                  backgroundSize: "cover"
                }}
                aria-label="Our mission image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;