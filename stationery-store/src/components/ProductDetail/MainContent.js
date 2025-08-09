"use client";
import React from "react";

const MainContentSection = () => {
  const features = [
    {
      id: 1,
      title: "Discover specifications that enhance your stationery experience.",
      description:
        "Our products are designed with quality and functionality in mind.",
      buttonText: "View",
    },
    {
      id: 2,
      title: "Uncover the details that make our stationery stand out.",
      description: "Each item is crafted to meet your unique needs.",
      buttonText: "Check",
    },
    {
      id: 3,
      title: "Learn about the innovative features of our latest products.",
      description:
        "Stay informed with specifications that ensure quality and performance.",
      buttonText: "Explore",
    },
  ];

  return (
    <section className="flex flex-col items-center gap-12 sm:gap-16 md:gap-20 py-10 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 relative self-stretch w-full flex-[0_0_auto] bg-gradient-to-b from-[#FFF2EB] to-[#FFE8CD]">
      <div className="flex-col max-w-7xl gap-12 sm:gap-16 md:gap-20 flex items-center relative w-full flex-[0_0_auto]">
        <h2 className="w-full max-w-3xl text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#2f153c] leading-tight relative">
          Explore the essential features of our premium stationery products
          below.
        </h2>

        <div className="flex flex-col items-start gap-10 sm:gap-12 md:gap-16 relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-12 relative self-stretch w-full flex-[0_0_auto]">
            {features.map((feature) => {
              return (
                <article
                  key={feature.id}
                  className="flex flex-col items-center gap-6 sm:gap-8 relative w-full md:flex-1 md:grow p-6 bg-white/80 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-[#FFD6BA]/30"
                >
                  <div className="flex flex-col items-center gap-4 sm:gap-6 relative self-stretch w-full flex-[0_0_auto]">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FFD6BA] flex items-center justify-center text-[#2f153c] shadow-sm">
                      <span className="text-lg sm:text-xl font-bold">{feature.id}</span>
                    </div>
                    <div className="gap-4 sm:gap-6 self-stretch w-full flex-[0_0_auto] flex flex-col items-start relative">
                      <h3 className="self-stretch text-lg sm:text-xl md:text-2xl font-semibold text-center text-[#2f153c] relative">
                        {feature.title}
                      </h3>

                      <p className="relative self-stretch text-sm sm:text-base text-[#2f153c]/80 text-center">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2 relative self-stretch w-full flex-[0_0_auto]">
                    <div className="inline-flex items-center justify-center gap-2 relative flex-[0_0_auto]">
                      <button
                        type="button"
                        className="px-4 py-2 bg-[#2f153c] text-white font-semibold rounded-lg shadow-md hover:bg-[#FFD6BA] hover:text-[#2f153c] hover:scale-105 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2f153c]"
                        aria-label={`${feature.buttonText} feature details`}
                      >
                        {feature.buttonText}
                      </button>

                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainContentSection;