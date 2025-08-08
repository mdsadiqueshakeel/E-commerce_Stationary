import React from "react";
// import { ChevronRight } from "./ChevronRight";
// import placeholderImage4 from "./placeholder-image-4.png";
// import placeholderImage5 from "./placeholder-image-5.png";
// import placeholderImage6 from "./placeholder-image-6.png";

const ProductShowcaseSection = () => {
  const showcaseItems = [
    {
      id: 1,
      image: "https://placehold.co/800x1200/191570/FFFFFF?text=Quality+Materials",
      title: "Quality Materials for Lasting Impressions",
      description:
        "We use only the finest materials to ensure durability and style.",
    },
    {
      id: 2,
      image: "https://placehold.co/800x1200/191570/FFFFFF?text=Eco-Friendly+Options",
      title: "Eco-Friendly Options for Conscious Consumers",
      description:
        "Choose from a range of sustainable products that are kind to the planet.",
    },
    {
      id: 3,
      image: "https://placehold.co/800x1200/191570/FFFFFF?text=Customizable+Designs",
      title: "Customizable Designs for Personal Touch",
      description: "Personalize your stationery to reflect your unique style.",
    },
  ];

  return (
    <section className="bg-[#f6eece] flex flex-col w-full items-center gap-8 md:gap-12 lg:gap-20 py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="flex-col w-full max-w-7xl gap-8 md:gap-12 lg:gap-20 flex items-center relative">
        <header className="max-w-[var(--spacing-sizing-max-width-max-width-large)] items-center flex flex-col gap-4 relative w-full flex-[0_0_auto]">
          <div className="inline-flex items-center relative flex-[0_0_auto]">
            <span className="relative w-fit mt-[-1.00px] font-heading-tagline font-[number:var(--heading-tagline-font-weight)] text-[#170808] text-[length:var(--heading-tagline-font-size)] text-center tracking-[var(--heading-tagline-letter-spacing)] leading-[var(--heading-tagline-line-height)] whitespace-nowrap [font-style:var(--heading-tagline-font-style)]">
              Explore
            </span>
          </div>

          <div className="flex flex-col items-center gap-6 relative self-stretch w-full flex-[0_0_auto]">
            <h2 className="text-[#170808] text-[length:var(--heading-h2-font-size)] text-center tracking-[var(--heading-h2-letter-spacing)] leading-[var(--heading-h2-line-height)] relative self-stretch mt-[-1.00px] font-heading-h2 font-[number:var(--heading-h2-font-weight)] [font-style:var(--heading-h2-font-style)]">
              Discover Our Unique Stationery Offerings
            </h2>

            <p className="relative self-stretch font-text-medium-normal font-[number:var(--text-medium-normal-font-weight)] text-[#170808] text-[length:var(--text-medium-normal-font-size)] text-center tracking-[var(--text-medium-normal-letter-spacing)] leading-[var(--text-medium-normal-line-height)] [font-style:var(--text-medium-normal-font-style)]">
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
                className="flex flex-col items-start gap-4 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-64 sm:h-72 md:h-80 relative w-full overflow-hidden">
                  <img
                    className="absolute h-full w-full object-cover transform hover:scale-105 transition-transform duration-500"
                    alt={item.title}
                    src={item.image}
                  />
                </div>

                <div className="flex flex-col items-start gap-2 p-4 sm:p-6 w-full">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {item.title}
                  </h3>

                  <p className="text-base text-gray-700 mt-2">
                    {item.description}
                  </p>
                  
                  <button className="mt-4 px-4 py-2 bg-[#191570] text-white rounded-md hover:bg-opacity-90 transition-colors duration-300 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="inline-flex items-center gap-6 relative flex-[0_0_auto] opacity-90">
          <button className="all-[unset] box-border inline-flex items-center justify-center gap-2 px-6 py-3 relative flex-[0_0_auto] mt-[-1.00px] mb-[-1.00px] ml-[-1.00px] border border-solid border-[#9d7f7f] cursor-pointer hover:bg-[#9d7f7f] hover:bg-opacity-10 transition-colors duration-200">
            <span className="relative w-fit font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-[#803a3a] text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] whitespace-nowrap [font-style:var(--text-regular-normal-font-style)]">
              Shop
            </span>
          </button>

          <button className="inline-flex items-center justify-center gap-2 relative flex-[0_0_auto] cursor-pointer hover:opacity-80 transition-opacity duration-200">
            <span className="relative w-fit font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-[#5b3737] text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] whitespace-nowrap [font-style:var(--text-regular-normal-font-style)]">
              Learn More
            </span>

            {/* <ChevronRight className="!relative !w-6 !h-6" color="#5C3737" /> */}
          </button>
        </div>
      </div>
    </section>
  );
};


export default ProductShowcaseSection;