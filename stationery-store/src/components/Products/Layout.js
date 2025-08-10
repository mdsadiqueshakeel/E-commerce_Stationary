import React from "react";
import { ChevronRight } from "./ChevronRight";

const LayoutSection = () => {
  const services = [
    {
      id: "25",
      image: "https://placehold.co/800x500/2f153c/FFFFFF?text=Custom+Design",
      title: "Custom Design Solutions for Every Need",
      description:
        "Our custom design services are crafted to elevate your brand.",
    },
    {
      id: "26",
      image: "https://placehold.co/800x500/2f153c/FFFFFF?text=Marketing",
      title: "Marketing Strategies That Drive Results",
      description:
        "We develop targeted marketing strategies to boost your visibility.",
    },
    {
      id: "27",
      image: "https://placehold.co/800x500/2f153c/FFFFFF?text=Consultation",
      title: "Expert Consultation to Guide Your Journey",
      description:
        "Our consultations provide insights to navigate your challenges.",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-[#FFE4C4] to-[#FAEBD7] flex flex-col w-full items-center gap-8 md:gap-12 lg:gap-20 py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="w-full max-w-7xl flex flex-col items-center gap-8 md:gap-12 lg:gap-16">
        <header className="flex flex-col items-center gap-4 max-w-3xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-[#2f153c]">Innovate</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2f153c] leading-tight">
            Explore Our Comprehensive Service Offerings
          </h2>
          <p className="text-base md:text-lg text-[#2f153c]/80">
            We provide a range of services tailored to meet your needs. Our expert team is dedicated to delivering exceptional results that exceed your expectations.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
          {services.map((service) => (
            <article key={service.id} className="flex flex-col items-start gap-4 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-full h-48 md:h-56 rounded-lg overflow-hidden">
                <img className="w-full h-full object-cover" alt={service.title} src={service.image} />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-[#2f153c]">
                {service.title}
              </h3>
              <p className="text-sm md:text-base text-[#2f153c]/80">
                {service.description}
              </p>
            </article>
          ))}
        </div>

        <div className="inline-flex gap-4 sm:gap-6 items-center">
          <button className="px-6 py-3 bg-[#2f153c] text-white font-semibold rounded-lg shadow-md hover:bg-[#FFD6BA] hover:text-[#2f153c] hover:scale-105 transition-all duration-300">
            Learn More
          </button>
          <button className="inline-flex items-center justify-center gap-2 text-[#2f153c] font-semibold hover:bg-[#FFE8CD]/70 px-4 py-3 rounded-lg hover:scale-105 transition-all duration-300">
            <span>Sign Up</span>
            <ChevronRight className="w-1.25rem h-1.25rem" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LayoutSection;
