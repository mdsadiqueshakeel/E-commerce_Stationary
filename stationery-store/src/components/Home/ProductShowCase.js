import React from "react";
// import { ChevronRight } from "./ChevronRight";
// import placeholderImage4 from "./placeholder-image-4.png";
// import placeholderImage5 from "./placeholder-image-5.png";
// import placeholderImage6 from "./placeholder-image-6.png";

const ProductShowcaseSection = () => {
  const showcaseItems = [
    {
      id: 1,
      image: "https://placehold.co/800x1200/2f153c/FFFFFF?text=Quality+Materials",
      title: "Quality Materials for Lasting Impressions",
      description:
        "We use only the finest materials to ensure durability and style.",
    },
    {
      id: 2,
      image: "https://placehold.co/800x1200/2f153c/FFFFFF?text=Eco-Friendly+Options",
      title: "Eco-Friendly Options for Conscious Consumers",
      description:
        "Choose from a range of sustainable products that are kind to the planet.",
    },
    {
      id: 3,
      image: "https://placehold.co/800x1200/2f153c/FFFFFF?text=Customizable+Designs",
      title: "Customizable Designs for Personal Touch",
      description: "Personalize your stationery to reflect your unique style.",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-[#FFF2EB] to-[#FFE8CD] flex flex-col w-full items-center gap-8 md:gap-12 lg:gap-20 py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 relative mt-16 sm:mt-0">
      <div className="flex-col w-full max-w-7xl gap-8 md:gap-12 lg:gap-20 flex items-center relative">
        <header className="max-w-[var(--spacing-sizing-max-width-max-width-large)] items-center flex flex-col gap-4 relative w-full flex-[0_0_auto]">
          <div className="inline-flex items-center relative flex-[0_0_auto]">
            <span className="text-sm font-bold uppercase tracking-wider text-[#2f153c]">
              Explore
            </span>
          </div>

          <div className="flex flex-col items-center gap-6 relative self-stretch w-full flex-[0_0_auto]">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2f153c] leading-tight text-center">
              Discover Our Unique Stationery Offerings
            </h2>

            <p className="text-base md:text-lg text-[#2f153c]/80 text-center max-w-3xl mx-auto">
              Our stationery products are designed to inspire creativity and
              organization. Each item combines functionality with aesthetic
              appeal, making your workspace a joy to use.
            </p>
          </div>
        </header>

        <div className="flex flex-col items-start gap-16 relative self-stretch w-full flex-[0_0_auto]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
            {showcaseItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-start gap-4 bg-[#FFDCDC]/80 rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <div className="h-64 sm:h-72 md:h-80 relative w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#FFDCDC]/30 to-[#FFD6BA]/30 z-10"></div>
                  <img
                    className="absolute h-full w-full object-cover transform hover:scale-105 transition-transform duration-500"
                    alt={item.title}
                    src={item.image}
                  />
                </div>

                <div className="flex flex-col items-start gap-2 p-4 sm:p-6 w-full">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#2f153c]">
                    {item.title}
                  </h3>

                  <p className="text-base text-[#2f153c]/80 mt-2">
                    {item.description}
                  </p>
                  
                  <button className="mt-4 px-4 py-2 bg-[#2f153c] text-white rounded-md hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-300 text-sm font-medium hover:scale-105">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="inline-flex items-center gap-6 relative flex-[0_0_auto] opacity-90">
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
    </section>
  );
};


export default ProductShowcaseSection;