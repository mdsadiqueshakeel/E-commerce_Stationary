import React from "react";
import Image from "next/image";

const TeamSection = () => {
  // Team members data
  const teamMembers = [
    {
      name: "M. S. Shamshi",
      role: "Proprietor",
      image: "https://placehold.co/300x300/2f153c/FFFFFF?text=M.S.+Shamshi",
    },
    {
      name: "Jane Doe",
      role: "Sales Manager",
      image: "https://placehold.co/300x300/2f153c/FFFFFF?text=Jane+Doe",
    },
    {
      name: "John Smith",
      role: "Customer Service",
      image:"https://placehold.co/300x300/2f153c/FFFFFF?text=John+Smith",
    },
    {
      name: "Emily Chen",
      role: "Product Specialist",
      image:"https://placehold.co/300x300/2f153c/FFFFFF?text=Emily+Chen",
    },
  ];

  return (
    <section className="w-full py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFe4c4] to-[#fff0e6]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2f153c] mb-6 animate-fadeIn">
            Our Team
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto animate-fadeIn animation-delay-200">
            Meet the dedicated professionals behind S S Enterprises. Our team is committed to providing exceptional service and expertise in all your stationery needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={member.name} 
              className={`bg-white rounded-xl shadow-md overflow-hidden animate-fadeIn`}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="relative h-64 w-full">
                <Image 
                  src={member.image} 
                  alt={member.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#2f153c] mb-1">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;