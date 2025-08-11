"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem('cookiesAccepted');
    
    if (!hasAccepted) {
      // Show the cookie consent popup after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setIsExiting(true);
    
    // Wait for exit animation to complete before hiding
    setTimeout(() => {
      setIsVisible(false);
      // Store acceptance in localStorage
      localStorage.setItem('cookiesAccepted', 'true');
    }, 500); // Match this with the CSS transition duration
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 py-3 sm:py-4 ${isExiting ? 'animate-slideDown' : 'animate-slideUp'}`}
      aria-live="polite"
      role="dialog"
      aria-labelledby="cookie-consent-title"
    >
      <div className="bg-white max-w-[500px] w-full rounded-xl shadow-lg p-4 sm:p-5 border border-[#FFDCDC]">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <p className="text-sm text-[#2f153c] font-medium">
              We use cookies to improve your experience. By using our site, you agree to our cookie policy.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link 
              href="/privacy-policy" 
              className="text-sm text-[#2f153c]/80 hover:text-[#2f153c] hover:underline transition-all duration-200"
            >
              Learn More
            </Link>
            <button
              onClick={handleAccept}
              className="bg-[#2f153c] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#2f153c]/90 transition-all duration-200 hover:scale-105 w-full sm:w-auto"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;