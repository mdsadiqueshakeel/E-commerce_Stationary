import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ProfileLayout({ children }) {
  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden pt-10">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}