import React from 'react';
import Navbar from '../../components/Navbar';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import '../../Styles/globals.css';

export default function AdminLayout({ children }) {
  return (
    // 1. Set the layout to the full screen height and prevent it from overflowing
    <div className="flex flex-col w-full h-screen overflow-hidden bg-[#FAEBD7]">
      <Navbar />

      {/* 2. This container will hold the sidebar and main content side-by-side */}
      <div className="flex flex-1 pt-14 overflow-hidden">
        
        {/* The sidebar will stay fixed because its parent container doesn't scroll */}
        <AdminSidebar />
        
        {/* 3. Make ONLY the main content area scrollable on the vertical axis */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}