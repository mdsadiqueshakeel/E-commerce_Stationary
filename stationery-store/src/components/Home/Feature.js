import React from "react";
// import placeholderImage7 from "./placeholder-image-7.png";

const FeaturesSection = () => {
  const statsData = [
    {
      value: "90%",
      description: "Customer satisfaction rate based on reviews.",
    },
    {
      value: "5,000",
      description: "Products available for all your stationery needs.",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-[#FFE8CD] to-[#FFDCDC] flex flex-col w-full items-center gap-8 md:gap-12 lg:gap-20 py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="flex flex-col w-full max-w-7xl items-start gap-8 md:gap-12 lg:gap-20 relative">
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12 lg:gap-20 w-full">
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2f153c] leading-tight">
              Discover Our Impressive Stats That Showcase Our Store&#39;s
              Success!
            </h2>
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-8">
            <p className="text-base md:text-lg text-[#2f153c]/80">
              With over 1,000 unique products, we cater to every stationery
              need. Join our community of 10,000+ satisfied customers who love
              our quality and service.
            </p>

            <div className="flex flex-col gap-6 w-full mt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                {statsData.map((stat, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 p-6 bg-[#FFF2EB] rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-[#2f153c]">
                      {stat.value}
                    </div>

                    <p className="text-base text-[#2f153c]/80">
                      {stat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <img
          className="self-stretch w-full aspect-[1.73] relative object-cover"
          alt="Stationery store interior showcasing products and workspace"
          src="https://placehold.co/1600x925/d0e6a1/4a5568?text=Store+Interior"
        />
      </div>
    </section>
  );
};

export default FeaturesSection;