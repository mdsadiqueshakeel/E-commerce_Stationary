import React from 'react';
import AdminNavbar from '../../components/Admin/AdminNavbar';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import '../../Styles/globals.css';

export default function AdminLayout({ children }) {
  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden bg-[#FAEBD7]">
      <AdminNavbar />
      <div className="flex flex-1 pt-14">
        <AdminSidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}