import React from 'react';
import Link from 'next/link';
import "../Styles/globals.css";
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#FFdcdc] to-[#Fff0e6] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-8xl md:text-9xl font-bold text-[#2f153c] mb-6 animate-fadeIn">
          404
        </h1>
        
        <div className="w-full max-w-md h-64 md:h-80 relative rounded-xl overflow-hidden shadow-lg mb-8 animate-fadeIn animation-delay-200">
          <div 
            className="w-full h-full bg-cover bg-center" 
            aria-label="404 error illustration"
          />
        </div>
        
        <p className="text-xl md:text-2xl text-[#2f153c]/80 mb-8 animate-fadeIn animation-delay-300">
          Oops! The page you're looking for doesn't exist.
        </p>
        
        <Link 
          href="/"
          className="bg-[#2f153c] text-white py-3 px-8 rounded-md hover:bg-[#2f153c]/90 transition-colors duration-300 font-medium animate-fadeIn animation-delay-400"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}