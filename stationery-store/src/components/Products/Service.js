import React from "react";

const ServiceOverviewSection = () => {
  return (
    <section className="bg-gradient-to-b from-[#FAEBD7] to-[#FFF0E6] w-full">
      <div className="max-w-3xl md:max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
        <header className="flex flex-col items-center text-center gap-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2f153c] leading-tight">
            Welcome to Our Stationery World: Where Creativity Meets Quality
          </h2>
          <p className="text-base md:text-lg text-[#2f153c]/80 max-w-3xl">
            At our company, we believe in inspiring creativity through high-quality stationery products. Our mission is to provide tools that empower individuals to express themselves and connect with their ideas.
          </p>
        </header>
      </div>
    </section>
  );
};

export default ServiceOverviewSection;
