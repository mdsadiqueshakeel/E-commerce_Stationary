"use client"; // This is the fix for the error. It marks the component for client-side rendering.

import React, { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";

// --- Main Call to Action Component ---
const CallToActionSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setIsSubmitted(true);
      setMessage("Thank you for subscribing!");
      // You can add your actual newsletter signup logic here (e.g., API call)
      console.log("Newsletter signup:", email);
    } else {
      setMessage("Please enter a valid email address.");
    }
  };

  return (
    <section className="bg-gradient-to-br from-[#FFDCDC] to-[#FFE8CD] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
          
          {/* --- Left Column: Content & Form --- */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left animate-fadeIn">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2f153c]">
              Stay Updated with Our Newsletter
            </h2>
            <p className="mt-3 md:mt-4 text-base sm:text-lg text-[#2f153c]/80 max-w-lg">
              Subscribe to receive exclusive offers, product updates, and
              creative inspiration directly to your inbox.
            </p>

            {isSubmitted ? (
              <div className="mt-6 md:mt-8 flex items-center gap-3 bg-[#FFE8CD] text-[#2f153c] p-4 rounded-lg w-full max-w-md animate-fadeIn">
                <CheckCircle className="h-1.25rem w-1.25rem sm:h-1.5rem sm:w-1.5rem flex-shrink-0" />
                <p className="font-semibold">{message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 md:mt-8 w-full max-w-md">
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <label htmlFor="email-input" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2f153c] focus:border-[#2f153c] shadow-sm"
                    aria-describedby="email-terms"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#2f153c] text-white font-semibold rounded-lg shadow-md hover:bg-[#FFD6BA] hover:text-[#2f153c] hover:scale-105 transition-all duration-300 whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </div>
                <p id="email-terms" className="mt-3 text-xs text-[#2f153c]/70">
                  By clicking Subscribe, you agree to our Terms and Conditions.
                </p>
                {message && !isSubmitted && <p className="mt-2 text-sm text-red-600">{message}</p>}
              </form>
            )}
          </div>

          {/* --- Right Column: Image --- */}
          <div className="mt-8 lg:mt-0 lg:block">
            <div className="relative overflow-hidden rounded-lg shadow-xl">
              <img
                src="https://placehold.co/600x400/2f153c/FFFFFF?text=Stationery+Collection"
                alt="Stationery collection"
                className="object-cover w-full h-64 sm:h-80 lg:h-[25rem] transition-transform duration-700 hover:scale-105 animate-fadeIn"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2f153c]/30 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default CallToActionSection;