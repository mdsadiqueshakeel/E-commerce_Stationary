import React from "react";
import { ChevronRight } from "./ChevronRight";


const HeaderSection = () => {
  const features = [
    {
      id: 1,
      image: "https://placehold.co/800x500/2f153c/FFFFFF?text=Premium+Materials",
      title:
        "Quality materials ensure durability and a premium writing experience.",
      description:
        "Our stationery products combine elegance with functionality for every occasion.",
      buttonText: "Shop",
    },
    {
      id: 2,
      image: "https://placehold.co/800x500/2f153c/FFFFFF?text=Eco-Friendly",
      title:
        "Eco-friendly options available for the environmentally conscious consumer.",
      description: "Choose from a variety of designs that inspire creativity.",
      buttonText: "Explore",
    },
    {
      id: 3,
      image: "https://placehold.co/800x500/2f153c/FFFFFF?text=Customizable",
      title: "Customizable products to make your stationery truly yours.",
      description:
        "Personalize your items for gifts or special occasions effortlessly.",
      buttonText: "Customize",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-[#FFDCDC] to-[#FFD6BA] flex flex-col w-full items-center gap-8 md:gap-12 lg:gap-16 py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="flex-col w-full max-w-7xl gap-8 md:gap-12 lg:gap-16 flex items-center relative">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2f153c] leading-tight text-center max-w-3xl">
          Discover the unique features that make our stationery stand out.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 w-full">
          {features.map((feature) => (
            <article
              key={feature.id}
              className="flex flex-col items-center gap-6 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <img
                className="w-full h-48 object-cover rounded-lg"
                alt={`Feature ${feature.id} illustration`}
                src={feature.image}
              />

              <div className="flex flex-col items-center gap-4 text-center">
                <h3 className="text-lg md:text-xl font-semibold text-[#2f153c] leading-tight">
                  {feature.title}
                </h3>

                <p className="text-sm md:text-base text-[#2f153c]/80 leading-relaxed">
                  {feature.description}
                </p>

                <button
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#2f153c] text-white font-medium rounded-lg hover:bg-[#2f153c]/90 transition-all duration-200 hover:scale-105"
                  aria-label={`${feature.buttonText} - ${feature.title}`}
                >
                  {feature.buttonText}
                  <ChevronRight
                    className="w-4 h-4"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;