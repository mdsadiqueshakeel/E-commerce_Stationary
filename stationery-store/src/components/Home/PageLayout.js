import React from "react";
// import { ChevronRight } from "./ChevronRight";
// import { HighQuality } from "./HighQuality";
// import placeholderImage3 from "./placeholder-image-3.png";

const PageLayoutSection = () => {
  const features = [
    {
      title: "Quality Products",
      description:
        "Each item is carefully selected for durability and aesthetic appeal.",
    },
    {
      title: "Affordable Prices",
      description: "Enjoy competitive pricing without compromising on quality.",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-[#FFE4C4] to-[#FAEBD7] flex flex-col w-full items-center gap-8 md:gap-12 lg:gap-20 py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="flex flex-col w-full max-w-7xl items-start gap-8 md:gap-12 lg:gap-20 relative">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-20 w-full">
          <div className="flex flex-col items-start gap-6 md:gap-8 w-full md:w-1/2">
            <div className="flex flex-col items-start gap-6 md:gap-8 w-full">
              <div className="flex flex-col gap-4 w-full">
                <div className="inline-flex items-center">
                  <span className="text-sm font-bold uppercase tracking-wider text-[#2f153c]">
                    Inspiration
                  </span>
                </div>

                <div className="flex flex-col gap-4 md:gap-6 w-full">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2f153c] leading-tight">
                    Discover the Joy of Stationery Shopping
                  </h2>

                  <p className="text-base md:text-lg text-[#2f153c]/80">
                    Our stationery store offers a curated selection of
                    high-quality products. Experience the perfect blend of style
                    and functionality.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-6 w-full mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-3 p-6 bg-[#FFF2EB] rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4 w-full">
                        <div className="flex flex-col gap-2 w-full">
                          <h3 className="text-xl font-semibold text-[#2f153c]">
                            {feature.title}
                          </h3>

                          <p className="text-base text-[#2f153c]/80">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-6 relative flex-[0_0_auto]">
              <button className="inline-flex items-center justify-center gap-2 px-6 py-3 relative flex-[0_0_auto] bg-[#2f153c] text-white font-semibold rounded-lg shadow-md hover:bg-[#FFD6BA] hover:text-[#2f153c] hover:scale-105 transition-all duration-300">
                <span className="relative w-fit whitespace-nowrap">
                  Shop Now
                </span>
              </button>

              <button className="inline-flex items-center justify-center gap-2 relative flex-[0_0_auto] cursor-pointer text-[#2f153c] font-semibold hover:bg-[#FFE8CD]/70 px-4 py-2 rounded-lg hover:scale-105 transition-all duration-300">
                <span className="relative w-fit whitespace-nowrap">
                  Learn More
                </span>
              </button>
            </div>
          </div>

          <img
            className="relative flex-1 grow aspect-[0.94] object-cover rounded-lg shadow-lg"
            alt="Stationery products display showcasing colorful notebooks and office supplies"
            src="https://placehold.co/800x1200/2f153c/FFFFFF?text=Stationery+Display"
          />
        </div>
      </div>
    </section>
  );
};


export default PageLayoutSection;