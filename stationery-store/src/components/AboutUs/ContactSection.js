import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

const ContactSection = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setStatusMessage("Please fill out all required fields.");
      return;
    }
    if (!formData.email.includes("@")) {
      setStatusMessage("Please enter a valid email address.");
      return;
    }
    
    // Form submission logic would go here (e.g., API call)
    console.log("Form submitted:", formData);
    
    // Show success message
    setIsSubmitted(true);
    setStatusMessage("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <section className="w-full text-[#2f153c] py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFf0E6] to-[#FFdcdc]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2f153c] mb-6 animate-fadeIn">
            Contact Us
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto animate-fadeIn animation-delay-200">
            Have questions or need assistance? We're here to help! Reach out to us using the form below or visit our store.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {/* Contact Form */}
          <div className="animate-fadeIn">
            <div className="bg-gradient-to-b from-[#FFE0E6] to-[#FFdcdc] p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold text-[#2f153c] mb-6">Send Us a Message</h3>
              
              {isSubmitted ? (
                <div className="bg-[#FFE8CD] p-6 rounded-lg flex items-start space-x-3 animate-fadeIn">
                  <CheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-[#2f153c]">Message Sent!</h4>
                    <p className="text-[#2f153c]/80">{statusMessage}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#2f153c]/80 mb-1">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2f153c]/50"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#2f153c]/80 mb-1">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2f153c]/50"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#2f153c]/80 mb-1">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2f153c]/50"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#2f153c]/80 mb-1">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2f153c]/50"
                      required
                    ></textarea>
                  </div>
                  
                  {statusMessage && !isSubmitted && (
                    <p className="text-red-500 text-sm">{statusMessage}</p>
                  )}
                  
                  <button
                    type="submit"
                    className="w-full bg-[#2f153c] text-white py-3 px-6 rounded-md hover:bg-[#2f153c]/90 transition-colors duration-300 font-medium"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
          
          {/* Store Information and Map */}
          <div className="animate-fadeIn animation-delay-300">
            <div className="bg-[#F9F5FF] p-8 rounded-xl shadow-md h-full">
              <h3 className="text-2xl font-semibold text-[#2f153c] mb-6">Visit Our Shop</h3>
              
              {/* Map Image */}
              <div className="relative h-64 w-full mb-6 rounded-lg overflow-hidden shadow-md">
                <a 
                  href="https://maps.app.goo.gl/ewJnK8TYtPuqvhbr5" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Open location in Google Maps"
                >
                  <Image 
                    src="/map-placeholder.jpg" 
                    alt="S S Enterprises location map" 
                    fill
                    unoptimized
                    className="object-cover hover:opacity-90 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-30 transition-all duration-300">
                    <span className="text-white font-medium px-4 py-2 bg-[#2f153c] rounded-md">View on Google Maps</span>
                  </div>
                </a>
              </div>
              
              {/* Business Details */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#2f153c] text-lg">S S Enterprises</h4>
                  <p className="text-gray-700">Supplier/Distributor of batteries, inverters, UPS systems</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-[#2f153c]">Address</h4>
                  <p className="text-gray-700">Faizal Complex, Lower Ground Floor</p>
                  <p className="text-gray-700">Fraser Road (Mazharul Haque Path)</p>
                  <p className="text-gray-700">Near All India Radio & Royal India Restaurant</p>
                  <p className="text-gray-700">New Market, Patna-800001</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-[#2f153c]">Proprietor</h4>
                  <p className="text-gray-700">Mr. M. S. Shahni</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-[#2f153c]">Business Hours</h4>
                  <p className="text-gray-700">Monday - Saturday: 10:00 AM - 7:00 PM</p>
                  <p className="text-gray-700">Sunday: Closed</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-[#2f153c]">Contact</h4>
                  <p className="text-gray-700">Phone: +91 XXXXX XXXXX</p>
                  <p className="text-gray-700">Email: info@ssenterprises.com</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-[#2f153c]">Neighborhood</h4>
                  <p className="text-gray-700">Located in a vibrant commercial area linking Patna Junction to Gandhi Maidan Marg, part of Patna's central business zone alongside Dak Bungalow Crossing, Exhibition Road, and Gandhi Maidan.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;