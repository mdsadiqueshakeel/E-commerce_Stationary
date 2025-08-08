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
    <section className="bg-[#a761aa59] flex flex-col w-full items-center gap-8 md:gap-12 lg:gap-20 py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="flex flex-col w-full max-w-7xl items-start gap-8 md:gap-12 lg:gap-20 relative">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-20 w-full">
          <div className="flex flex-col items-start gap-6 md:gap-8 w-full md:w-1/2">
            <div className="flex flex-col items-start gap-6 md:gap-8 w-full">
              <div className="flex flex-col gap-4 w-full">
                <div className="inline-flex items-center">
                  <span className="text-sm font-bold uppercase tracking-wider text-purple-900">
                    Inspiration
                  </span>
                </div>

                <div className="flex flex-col gap-4 md:gap-6 w-full">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-900 leading-tight">
                    Discover the Joy of Stationery Shopping
                  </h2>

                  <p className="text-base md:text-lg text-purple-800">
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
                      className="flex flex-col gap-3 p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="flex items-start gap-4 w-full">
                        <div className="flex flex-col gap-2 w-full">
                          <h3 className="text-xl font-semibold text-purple-900">
                            {feature.title}
                          </h3>

                          <p className="text-base text-purple-800">
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
              <button className="all-[unset] box-border inline-flex items-center justify-center gap-2 px-6 py-3 relative flex-[0_0_auto] mt-[-1.00px] mb-[-1.00px] ml-[-1.00px] border border-solid border-[color:var(--primitives-color-neutral-darkest)]">
                <span className="relative w-fit font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-[color:var(--primitives-color-neutral-darkest)] text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] whitespace-nowrap [font-style:var(--text-regular-normal-font-style)]">
                  Shop
                </span>
              </button>

              <button className="all-[unset] box-border inline-flex items-center justify-center gap-2 relative flex-[0_0_auto]">
                <span className="relative w-fit font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-[color:var(--primitives-color-neutral-darkest)] text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] whitespace-nowrap [font-style:var(--text-regular-normal-font-style)]">
                  Learn More
                </span>

                {/* <ChevronRight className="!relative !w-6 !h-6" color="#0D0404" /> */}
              </button>
            </div>
          </div>

          <img
            className="relative flex-1 grow aspect-[0.94] object-cover"
            alt="Stationery products display showcasing colorful notebooks and office supplies"
            src="https://placehold.co/800x1200/0D0404/FFFFFF?text=Stationery+Display"
          />
        </div>
      </div>
    </section>
  );
};


export default PageLayoutSection;