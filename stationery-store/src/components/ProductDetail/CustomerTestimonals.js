"use client";
import React from "react";

const CustomerTestimonials = () => {
  const testimonials = [
    {
      id: "8",
      name: 'Sarah Johnson',
      role: 'Student',
      content: 'These products have completely transformed my study sessions. The quality is exceptional and they last much longer than other brands I have tried.',
      rating: 5,
      avatar: 'https://placehold.co/100x100/2f153c/FFFFFF?text=SJ',
    },
    {
      id: "9",
      name: 'Michael Chen',
      role: 'Graphic Designer',
      content: 'As a designer, Im very particular about my tools. These products exceed my expectations in terms of quality and performance.',
      rating: 4,
      avatar: 'https://placehold.co/100x100/2f153c/FFFFFF?text=MC',
    },
    {
      id: "10",
      name: 'Emily Rodriguez',
      role: 'Office Manager',
      content: 'Our office switched to these products last year and we have seen a noticeable improvement in productivity. The quality is consistent and reliable.',
      rating: 5,
      avatar: 'https://placehold.co/100x100/2f153c/FFFFFF?text=ER',
    },
  ];

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFF0E6] to-[#FFDCDC]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2f153c] mb-4">What Our Customers Say</h2>
          <p className="text-base sm:text-lg text-[#2f153c]/80 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what customers think about our products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white/80 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-[#FFD6BA]/30"
            >
              <div className="flex items-center mb-4">
                <img
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full mr-4 border-2 border-[#FFD6BA]"
                  src={testimonial.avatar}
                  alt={`${testimonial.name}'s avatar`}
                />
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-[#2f153c]">{testimonial.name}</h3>
                  <p className="text-sm sm:text-base text-[#2f153c]/70">{testimonial.role}</p>
                </div>
              </div>
              <div className="mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#2f153c]">
                    {i < testimonial.rating ? '★' : '☆'}
                  </span>
                ))}
              </div>
              <p className="text-sm sm:text-base text-[#2f153c]/80 italic">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;
