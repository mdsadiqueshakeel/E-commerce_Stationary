"use client"; // 👈 FIX: This directive marks the component as a Client Component.

import React, { useState } from "react";
import { KeyboardArrowUp } from "./KeyboardArrowUp";

const faqData = [
  { question: "What is your return policy?", answer: "We offer a 30-day return policy on all our stationery products. If you are not satisfied, simply return the item in its original condition. Please contact our customer service for assistance with the return process." },
  { question: "Do you offer discounts?", answer: "Yes, we offer seasonal discounts and promotions. Sign up for our newsletter to stay updated on the latest offers. You can also find exclusive deals on our website." },
  { question: "How long is shipping?", answer: "Shipping typically takes 3-5 business days depending on your location. We strive to process orders as quickly as possible. You will receive a tracking number once your order has shipped." },
  { question: "Can I track my order?", answer: "Absolutely! Once your order is shipped, you will receive an email with a tracking link. You can use this link to monitor the status of your delivery." },
  { question: "What payment methods are accepted?", answer: "We accept major credit cards, PayPal, and other secure payment options. Your payment information is processed securely to ensure your safety. For any issues, please reach out to our support team." },
];

const FaqSection = () => {
  const [openItems, setOpenItems] = useState(new Set([0]));

  const toggleItem = (index) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  };

  return (
    <section className="bg-gradient-to-b from-[#FFF0E6] to-[#FFDCDC] w-full">
      <div className="max-w-3xl md:max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
        <header className="flex flex-col gap-3 text-center items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2f153c]">FAQs</h2>
          <p className="text-base md:text-lg text-[#2f153c]/80 max-w-2xl">Find answers to your most common questions about our stationery products.</p>
        </header>

        <div className="mt-8 divide-y divide-[#2f153c]/20 border-t border-b border-[#2f153c]/20" role="list">
          {faqData.map((faq, index) => (
            <div key={index} className="" role="listitem">
              <button
                className="w-full flex items-center justify-between gap-4 py-4 text-left"
                onClick={() => toggleItem(index)}
                aria-expanded={openItems.has(index)}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-base md:text-lg font-semibold text-[#2f153c]">{faq.question}</h3>
                <KeyboardArrowUp className={`${openItems.has(index) ? "rotate-180" : ""} transition-transform duration-200 w-6 h-6`} />
              </button>
              {openItems.has(index) && (
                <div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} className="pb-4">
                  <p className="text-sm md:text-base text-[#2f153c]/80">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <h3 className="text-xl md:text-2xl font-semibold text-[#2f153c]">Still have questions?</h3>
          <p className="text-base text-[#2f153c]/80">We&apos;re here to help!</p>
          <a href="#contact" className="px-6 py-3 bg-[#2f153c] text-white font-semibold rounded-lg shadow-md hover:bg-[#FFD6BA] hover:text-[#2f153c] hover:scale-105 transition-all duration-300">Contact</a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;