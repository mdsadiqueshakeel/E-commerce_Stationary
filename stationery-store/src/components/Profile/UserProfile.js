"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, MapPin, Lock, LogOut } from 'lucide-react';
import { isLoggedIn, getUserProfile, logout } from '../../utils/authUtils';

const UserProfile = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = isLoggedIn();
    setUserLoggedIn(loggedIn);

    if (loggedIn) {
      // Get user profile data
      const profile = getUserProfile() || {
        name: 'John Doe', // Default values if profile not set
        email: 'john.doe@example.com',
        avatar: null
      };
      setUserProfile(profile);
    }

    // Listen for auth state changes
    const handleProfileUpdate = () => {
      setUserProfile(getUserProfile());
    };

    const handleLogout = () => {
      setUserLoggedIn(false);
      setUserProfile(null);
    };

    window.addEventListener('userProfileUpdated', handleProfileUpdate);
    window.addEventListener('userLoggedOut', handleLogout);

    return () => {
      window.removeEventListener('userProfileUpdated', handleProfileUpdate);
      window.removeEventListener('userLoggedOut', handleLogout);
    };
  }, []);

  const handleLogout = () => {
    logout();
    // No need to update state here as the event listener will handle it
  };

  if (!userLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-[60vh] bg-gradient-to-br from-[#FFF2EB] to-[#FFCDCD] text-[#2f153c]">
        <div className="max-w-md w-full bg-gradient-to-br from-[#FFdcdc] to-[#FFf2eb] backdrop-blur-sm rounded-xl shadow-md overflow-hidden p-8 text-center">
          <User className="h-16 w-16 text-[#2f153c]/70 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#2f153c] mb-4">Please log in to view your profile</h2>
          <p className="text-[#2f153c]/80 mb-6">You need to be logged in to access your profile information and manage your account.</p>
          <Link 
            href="/login" 
            className="inline-flex items-center justify-center px-5 py-3 bg-[#2f153c] text-white rounded-lg hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-200 font-medium"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#FFF2EB] to-[#FFCDCD] text-[#2f153c]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">My Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-gradient-to-br from-[#FFdcdc] to-[#FFf2eb] backdrop-blur-sm rounded-xl shadow-md overflow-hidden p-6 text-center">
              <div className="relative w-24 h-24 mx-auto mb-4 rounded-full bg-[#FFE8CD] flex items-center justify-center">
                {userProfile?.avatar ? (
                  <img 
                    src={userProfile.avatar} 
                    alt={userProfile.name} 
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <User className="h-12 w-12 text-[#2f153c]/70" />
                )}
              </div>
              
              <h2 className="text-xl font-bold text-[#2f153c] mb-1">{userProfile?.name}</h2>
              <p className="text-[#2f153c]/70 mb-4">{userProfile?.email}</p>
              
              <button 
                onClick={handleLogout}
                className="w-full mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 border border-[#2f153c]/20 text-[#2f153c] rounded-lg hover:bg-[#FFE8CD]/70 transition-all duration-200"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
          
          {/* Profile Actions */}
          <div className="md:col-span-2">
            <div className="bg-gradient-to-br from-[#FFdcdc] to-[#FFf2eb] backdrop-blur-sm rounded-xl shadow-md overflow-hidden p-6">
              <h3 className="text-xl font-semibold text-[#2f153c] mb-6">Account Management</h3>
              
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 bg-white/80 rounded-lg hover:bg-[#FFE8CD]/50 transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-[#2f153c]/70" />
                    <div>
                      <h4 className="font-medium text-[#2f153c]">Edit Profile</h4>
                      <p className="text-sm text-[#2f153c]/70">Update your personal information</p>
                    </div>
                  </div>
                  <span className="text-[#2f153c]/40">→</span>
                </button>
                
                <button className="w-full flex items-center justify-between p-4 bg-white/80 rounded-lg hover:bg-[#FFE8CD]/50 transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-[#2f153c]/70" />
                    <div>
                      <h4 className="font-medium text-[#2f153c]">Manage Addresses</h4>
                      <p className="text-sm text-[#2f153c]/70">Add or edit your delivery addresses</p>
                    </div>
                  </div>
                  <span className="text-[#2f153c]/40">→</span>
                </button>
                
                <button className="w-full flex items-center justify-between p-4 bg-white/80 rounded-lg hover:bg-[#FFE8CD]/50 transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-[#2f153c]/70" />
                    <div>
                      <h4 className="font-medium text-[#2f153c]">Change Password</h4>
                      <p className="text-sm text-[#2f153c]/70">Update your password</p>
                    </div>
                  </div>
                  <span className="text-[#2f153c]/40">→</span>
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-[#2f153c]/10">
                <Link 
                  href="/my-orders" 
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#2f153c] text-white rounded-lg hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-200 font-medium"
                >
                  View My Orders
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;