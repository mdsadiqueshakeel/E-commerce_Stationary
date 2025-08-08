// src/components/Footer.js
// A fully refactored, responsive, and self-contained footer component.

import React from "react";
import Link from "next/link"; // Using Next.js Link for optimized navigation
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

// --- Data for the footer links ---
// This makes it easy to update links without touching the JSX.

const navigationLinks = [
  { text: "About Us", href: "/about" },
  { text: "Contact Us", href: "/contact" },
  { text: "Support", href: "/support" },
  { text: "Blog", href: "/blog" },
  { text: "FAQs", href: "/faqs" },
];

const socialLinks = [
  { label: "Facebook", href: "#", component: Facebook },
  { label: "Instagram", href: "#", component: Instagram },
  { label: "Twitter", href: "#", component: Twitter },
  { label: "LinkedIn", href: "#", component: Linkedin },
  { label: "YouTube", href: "#", component: Youtube },
];

const legalLinks = [
  { text: "Privacy Policy", href: "/privacy" },
  { text: "Terms of Service", href: "/terms" },
  { text: "Cookies Settings", href: "/cookies" },
];

// --- Reusable SVG Logo ---
// This removes the need for local file imports.
const Logo = () => (
  <svg
    className="h-9 w-auto text-gray-800"
    viewBox="0 0 84 36"
    fill="currentColor"
    aria-label="Company Logo"
  >
    <path d="M22.1,29.5H17.6V13.7h4.5V29.5z M19.8,11.7c-1.4,0-2.6-1.2-2.6-2.6s1.2-2.6,2.6-2.6s2.6,1.2,2.6,2.6S21.2,11.7,19.8,11.7z"></path>
    <path d="M32.1,29.5h-4.5V13.7h4.5V29.5z"></path>
    <path d="M44.3,29.5h-4.5V13.7h4.5V29.5z"></path>
    <path d="M57.5,29.5h-4.5l-4.5-7.8V29.5h-4.5V13.7h4.5l4.5,7.8V13.7h4.5V29.5z"></path>
  </svg>
);

// --- Main Footer Component ---
const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#FFEACC]/90 to-[#FFEACC]/70 text-gray-700 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12 lg:py-16">
        {/* Top section: Logo, Nav, Socials */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 animate-fadeIn">
          <div className="flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
            <Link href="/" aria-label="Home">
              <Logo />
            </Link>
          </div>

          <nav
            className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-3 py-4 md:py-0"
            aria-label="Footer Navigation"
          >
            {navigationLinks.map((link) => (
              <Link
                key={link.text}
                href={link.href}
                className="text-sm font-semibold hover:text-gray-900 hover:underline transition-all duration-200 px-2 py-1 rounded-md hover:bg-amber-200/30"
              >
                {link.text}
              </Link>
            ))}
          </nav>

          <div
            className="flex items-center gap-5"
            aria-label="Social Media Links"
          >
            {socialLinks.map((social) => {
              const Icon = social.component;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${social.label} page`}
                  className="text-gray-500 hover:text-gray-900 hover:scale-110 transition-all duration-300 p-2 rounded-full hover:bg-amber-200/30"
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <hr className="w-full border-t border-gray-300/50 my-6 md:my-8" />

        {/* Bottom section: Copyright and Legal links */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 sm:gap-6 animate-fadeIn animation-delay-200">
          <p className="text-sm text-gray-600 mt-4 sm:mt-0">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-4 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.text}
                href={link.href}
                className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors duration-200 px-2 py-1 rounded-md hover:bg-amber-200/20"
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
